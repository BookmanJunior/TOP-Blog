import Nav from "../components/Nav";
import { Outlet, useOutletContext } from "react-router-dom";
import { UserType, SetUserType } from "../types/UserType";
import { useState, useEffect } from "react";
import { URL } from "../helpers/getServerURL";

type RootContext = {
  user: UserType | null;
  loading: boolean;
} & SetUserType;

export default function Root() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function autoLogin() {
      try {
        const res = await fetch(`${URL}/auto-login`, {
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
      } finally {
        setLoading(false);
      }
    }
    autoLogin();
  }, []);

  return (
    <>
      <Nav user={user} setUser={setUser} />
      <Outlet context={{ user, setUser, loading }} />
    </>
  );
}

export function UseUser() {
  return useOutletContext<RootContext>();
}
