import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { DataContext } from "../contexts/DataContext";
import { Link } from "react-router-dom";
import deletesvg from "../assets/trash-solid.svg";  
import gotsvg from "../assets/check-solid.svg";

export default function ShoppingList({data, listId}) {
    const { loggedIn } = useContext(AuthContext);
    const { handleGot, handleDelete } = useContext(DataContext);

    console.log("Logging data items", data.items);
    if (!data.items) {
        return (
            <>
            <h1>Error loading Shopping List</h1>
            <Link to="/">Back to Homepage</Link>
            </>
        );
    } else {
    return (
        <div>
            <h1>{data.name}</h1>
            <ul>
                {data.items.map((item) => (
                    <li key={item._id} >
                        <div>
                        {item.done ? <p>{item.name}</p> : <p>{item.name}</p>}
                        <p>{item.quantity}</p>
                        <button  onClick={() => handleGot(item._id, listId)}>
                            <img src={gotsvg} alt="Got" />
                        </button>
                        <button onClick={() => handleDelete(item._id, listId)}>
                            <img src={deletesvg} alt="Delete" />
                        </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
}