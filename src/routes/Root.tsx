import Nav from "../components/Nav";
import { Outlet, useOutletContext } from "react-router-dom";
import { UserType, SetUserType } from "../types/UserType";
import AutoLoginFetch from "../components/AutoLoginFetch";

type RootContext = {
  user: UserType | null;
  loading: boolean;
} & SetUserType;

export default function Root() {
  const { user, setUser, loading } = AutoLoginFetch();

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
