import { useState, useEffect } from "react";
import { UserType } from "../types/UserType";

export default function AutoLoginFetch() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function autoLogin() {
      try {
        const res = await fetch("http://localhost:3000/auto-login", {
          method: "POST",
          mode: "cors",
          credentials: "include",
        });

        if (res.ok) {
          const resData: UserType = await res.json();
          setUser(resData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    autoLogin();
  }, []);

  return { user, setUser, loading };
}
