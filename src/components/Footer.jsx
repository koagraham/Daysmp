import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
        <nav className="bg-black p-5 pl-10">
            <NavLink to="/help" className="text-white font-bold hover:text-yellow-500 hover:underline">Help</NavLink>
        </nav>
    )
}