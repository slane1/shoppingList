import { useContext } from "react";
import { DataContext }  from "../../contexts/DataContext";
import { AuthContext } from "../../contexts/AuthContext";
import LoggedOut from "../LoggedOut";
import NewList from "../forms/NewList";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const { shoppingLists, deleteList } = useContext(DataContext);
    const { loggedIn } = useContext(AuthContext);

    return (
    <>
        {!loggedIn ? <LoggedOut /> : 
        <div>
            <div>
                <h1>Dashboard</h1>
                <p>Welcome to the Dashboard</p>
            </div>
            <div>
                <h2>Your Shopping Lists</h2>
                <ul>
                    {shoppingLists.map((data) => (
                        <li key={data.id}>
                        <Link
                        to={{pathname: `/shopping-list/${data.id}`,}}
                        state={{ data: data}}
                        >
                        {data.title}
                        </Link>
                        <button onClick={() => deleteList(data.id)}>Delete</button>
                    </li>
                ))}
                </ul>
            </div>
            <div>
                <NewList />
            </div>
        </div>
        }
    </>
    );
}