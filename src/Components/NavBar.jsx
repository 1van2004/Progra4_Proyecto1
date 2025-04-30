import { Link } from "@tanstack/react-router"

const NavBar = () => {
    return(
        <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow">
            <Link to="/" className="text-lg front-medium hover:text-gray-300">Home</Link>
            <Link to="/works" className="text-lg front-medium hover:text-gray-300">Works</Link>
        </nav>
    )
}

export default NavBar;