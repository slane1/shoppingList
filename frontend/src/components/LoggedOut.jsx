import { Link } from "react-router-dom";

export default function LoggedOut() {
    return (
        <div>
            <h1>Access Denied</h1>
            <p>You must be logged in to view this page.</p>
            <div>
                <Link to="/login">Login</Link>
                <span> or </span>
                <Link to="/register">Register</Link>
            </div>
            
        </div>
    );
}