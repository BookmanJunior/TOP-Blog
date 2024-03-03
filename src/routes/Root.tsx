import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Outlet, useOutletContext } from "react-router-dom";
import { UserType, SetUserType } from "../types/UserType";

type RootContext = {
  user: UserType | null;
} & SetUserType;

export default function Root() {
  const [user, setUser] = useState<UserType | null>(null);

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
        console.log(error);
      }
    }
    autoLogin();
  }, []);

  return (
    <>
      <Nav user={user} setUser={setUser} />
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export function UseUser() {
  return useOutletContext<RootContext>();
}
