import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <div></div>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
            </div>
            <h1>Header</h1>
        </header>
    )
}