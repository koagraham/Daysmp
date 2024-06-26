import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const loggedIn = useSelector((state) => state.loggedIn);

    return (
        <div className="bg-black p-5 flex justify-between sticky top-0 z-50">
            <nav className="flex justify-between items-center w-5/12">
                <NavLink to="/" className="text-white font-bold hover:text-yellow-500 hover:underline">Home</NavLink>
                <NavLink to="/server" className="text-white ml-4 font-bold hover:text-yellow-500 hover:underline">Server</NavLink>
                <NavLink to="/forum" className="text-white ml-4 font-bold hover:text-yellow-500 hover:underline">Forum</NavLink>
                <NavLink to="/rules" className="text-white ml-4 font-bold hover:text-yellow-500 hover:underline">Rules</NavLink>
                <NavLink to="/help" className="text-white ml-4 font-bold hover:text-yellow-500 hover:underline">Help</NavLink>
            </nav>
            <div className="flex items-center">
                <NavLink to="/login" className="text-white font-bold ml-auto hover:text-yellow-500 hover:underline">
                    {loggedIn ? "Logout" : "Login"}
                </NavLink>
            </div>
        </div>
    );
}