import { Link } from "react-router-dom";
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
    <Link to="/">
      <div className="nav__logo">Logo Here</div>
    </Link>
  );
}

function AuthenticatedLinks({ setUser }: SetUserType) {
  return (
    <>
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
  return (
    <li className="nav__link">
      <Link to={`/${to}`}>{title}</Link>
    </li>
  );
}
