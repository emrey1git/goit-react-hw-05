import { NavLink, Outlet } from 'react-router-dom';

const Navigation = () => (
  <>
    <nav className="nav-main">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/movies">Movies</NavLink>
    </nav>
    <Outlet />
  </>
);

export default Navigation;
