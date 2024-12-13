import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="py-4">
      <div className="container d-flex justify-content-around">
        <NavLink to="/" className="nav-link text-decoration-none mx-2">
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link text-decoration-none mx-2">
          About
        </NavLink>
        <NavLink to="/posts" className="nav-link text-decoration-none mx-2">
          Lista Post
        </NavLink>
        <NavLink to="/new" className="nav-link text-decoration-none mx-2">
          Nuovo Post
        </NavLink>
      </div>
    </header>
  );
}
