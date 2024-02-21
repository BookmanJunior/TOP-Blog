import { Link } from "react-router-dom";

type NavProps = {
  user: object | null;
};

export default function Nav({ user }: NavProps) {
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="nav__logo">Logo Here</div>
        <ul className="nav__links">
          {user ? <AuthenticatedLinks /> : <UnAuthenticatedLinks />}
        </ul>
      </div>
    </nav>
  );
}

function AuthenticatedLinks() {
  return (
    <>
      <NavLink to={"account"} title={"Account"} />
      <NavLink to={"log-out"} title={"Log Out"} />
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
