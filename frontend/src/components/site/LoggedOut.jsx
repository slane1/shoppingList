import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function LoggedOut() {
    return (
    <>
        <Header />
        <div className="flex flex-col items-center">
            <h1 className="mb-8">Access Denied</h1>
            <p>You must be logged in to view this page.</p>
            <div className="mt-5">
                <Link to="/login">Login</Link>
                <span> or </span>
                <Link to="/register">Register</Link>
            </div>
        </div>
        <Footer />
    </>
    );
}