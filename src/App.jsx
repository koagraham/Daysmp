import { Outlet, NavLink } from 'react-router-dom';

export default function App() {
    return (
      <>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/server">Server</NavLink>
            </li>
            <li>
              <NavLink to="/forum">Forum</NavLink>
            </li>
            <li>
              <NavLink to="/rules">Rules</NavLink>
            </li>
            <li>
              <NavLink to="/help">Help</NavLink>
            </li>
          </ul>
        </nav>

        <hr />

        <main>
          <Outlet />
        </main>
      </>
    );
  }