import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
    const { loggedIn } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="border-b border-t border-black mb-5">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Home</span>
                </Link>
                <div className="flex gap-5">
                    {loggedIn ? (
                        <div className="flex gap-5">
                            <Link to="/dashboard" className="text-white">
                                <button className="w-auto text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                                Dashboard
                                </button>
                            </Link>
                            <Link to="/logout" className="text-white">
                                <button className="w-auto text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                                Logout
                                </button>
                            </Link>
                        </div>
                    ) :
                    <div className="flex gap-5">
                    <Link to="/login" className="text-white" >
                        <button className="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Login
                        </button>
                    </Link>
                    <Link to="/register" className="text-white">
                        <button className="w-auto text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-lime-700 dark:focus:ring-teal-800">
                        Register
                        </button>
                    </Link>
                    </div>
                    }
                </div>
        </div>
    </nav>
    );
}