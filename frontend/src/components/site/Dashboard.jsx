import { useContext } from "react";
import { DataContext }  from "../../contexts/DataContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const { shoppingLists } = useContext(DataContext);

    return (
        <div>
            <div>
                <h1>Dashboard</h1>
                <p>Welcome to the Dashboard</p>
            </div>
            <div>
                <h2>Your Shopping Lists</h2>
                <ul>
                    {shoppingLists.map((shoppingList) => (
                        <li key={shoppingList.id}>
                            <p>{shoppingList.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <button>Create a new Shopping List</button>
            </div>
        </div>
    );
}