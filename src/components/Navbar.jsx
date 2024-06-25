import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Navbar() {
    const loggedIn = useSelector((state) => state.loggedIn)

    return (
        <nav className="flex justify-between">
            <ul>
            <li className="text-orange">
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
            <NavLink to="/login">{loggedIn ? "Logout" : "Login"}</NavLink>
        </nav>
    )
}