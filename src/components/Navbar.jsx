import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
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
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
            </ul>
        </nav>
    )
}