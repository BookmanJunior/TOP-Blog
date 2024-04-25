import { NavLink, useLocation } from "react-router-dom";
import LogOutForm from "./LogOutForm";
import { UserType, SetUserType } from "../types/UserType";
import LogoSvg from "../assets/logo.svg?react";
import ThemeSwitcher from "./ThemeSwitcher";
import "../styles/Nav.scss";

type NavProps = {
  user: UserType | null;
} & SetUserType;

export default function Nav({ user, setUser }: NavProps) {
  return (
    <nav>
      <div className="nav-wrapper">
        <Logo />
        <ul className="nav__links">
          <li className="theme-switcher">
            <ThemeSwitcher />
          </li>
          {user ? (
            <AuthenticatedLinks setUser={setUser} />
          ) : (
            <UnAuthenticatedLinks />
          )}
        </ul>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <NavLink className="nav__link" to="/" aria-label="Logo">
      <LogoSvg />
    </NavLink>
  );
}

function AuthenticatedLinks({ setUser }: SetUserType) {
  return (
    <>
      <Link to={"me"} title={"Account"} />
      <li>
        <LogOutForm setUser={setUser} />
      </li>
    </>
  );
}

function UnAuthenticatedLinks() {
  const location = useLocation();
  return (
    <>
      <Link
        to={"login"}
        title={"Login"}
        state={{
          redirectTo:
            location.pathname === "/sign-up" ? "/" : location.pathname,
        }}
      />
      <Link to={"sign-up"} title={"Sign Up"} />
    </>
  );
}

type LinkProps = {
  to: string;
  title: string;
  state?: object;
};

function Link({ to, title, ...props }: LinkProps) {
  return (
    <li className="nav__link">
      <NavLink to={`/${to}`} {...props}>
        {title}
      </NavLink>
    </li>
  );
}
