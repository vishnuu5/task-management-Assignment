
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth()

    return (
        <nav className="bg-indigo-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold">
                        Task Manager
                    </Link>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <span className="hidden md:inline">Welcome, {user?.name || "User"}</span>
                                <button
                                    onClick={logout}
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-gray-200 transition-colors">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
