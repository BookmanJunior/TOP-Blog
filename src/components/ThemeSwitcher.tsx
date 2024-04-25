import SunSvg from "../assets/sun.svg?react";
import MoonSvg from "../assets/moon.svg?react";
import { useState, useEffect } from "react";

function getTheme() {
  const theme = localStorage.getItem("blog-theme");
  return theme ? JSON.parse(theme) : "";
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(getTheme);
  const [themeFlag, setThemeFlag] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.className = theme;
  }, [theme]);

  useEffect(() => {
    if (themeFlag) {
      localStorage.setItem("blog-theme", JSON.stringify(theme));
    }

    return () => {
      setThemeFlag(false);
    };
  }, [theme, themeFlag]);

  return (
    <button
      onClick={() => {
        const currTheme = theme === "" ? "dark" : "";
        setTheme(currTheme);
        setThemeFlag(true);
      }}
    >
      {theme === "" ? <MoonSvg /> : <SunSvg />}
    </button>
  );
}
