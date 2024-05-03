import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
    const { loggedIn } = useContext(AuthContext);
    return (
        <header>
            <div></div>
            <div>
                {!loggedIn ? (
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                ) : (
                    <ul>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                )}
            </div>
            <h1>Header</h1>
        </header>
    )
}