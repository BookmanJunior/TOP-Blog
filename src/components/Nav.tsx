import { Link, useLocation } from "react-router-dom";
import LogOutForm from "./LogOutForm";
import { UserType, SetUserType } from "../types/UserType";
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
    <Link to="/">
      <div className="nav__logo">Logo Here</div>
    </Link>
  );
}

function AuthenticatedLinks({ user, setUser }: NavProps) {
  return (
    <>
      {user?.role === "admin" && (
        <NavLink to="new-article" title="Add Article" />
      )}
      <NavLink to={"account"} title={"Account"} />
      <LogOutForm setUser={setUser} />
    </>
  );
}

function UnAuthenticatedLinks() {
  return (
    <>
      <NavLink to={"login"} title={"Login"} />
      <NavLink to={"sign-up"} title={"Sign Up"} />
    </>
  );
}

type NavLinkProps = {
  to: string;
  title: string;
};

function NavLink({ to, title }: NavLinkProps) {
  const location = useLocation();
  return (
    <li className="nav__link">
      <Link to={`/${to}`} state={{ redirectTo: location.pathname }}>
        {title}
      </Link>
    </li>
  );
}
