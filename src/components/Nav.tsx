import { NavLink, useLocation } from "react-router-dom";
import LogOutForm from "./LogOutForm";
import { UserType, SetUserType } from "../types/UserType";
import LogoSvg from "../assets/logo.svg?react";
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
          {user ? (
            <AuthenticatedLinks user={user} setUser={setUser} />
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
    <NavLink className="nav__link" to="/">
      <LogoSvg />
    </NavLink>
  );
}

function AuthenticatedLinks({ user, setUser }: NavProps) {
  return (
    <>
      {user?.role === "admin" && <Link to="new-article" title="Add Article" />}
      <Link to={"account"} title={"Account"} />
      <LogOutForm setUser={setUser} />
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
