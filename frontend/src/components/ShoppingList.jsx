import { Link } from "react-router-dom";

export default function ShoppingList({data, onGot, onDelete}) {
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
            <h1>{data.title}</h1>
            <ul>
                {data.items.map((item) => (
                    <li key={item._id}>
                        <div>
                        <p>{item.name}</p>
                        <p>{item.quantity}</p>
                        {item.done ? <p>Got</p> : <p>Not Got</p>}
                        <button onClick={() => onGot(item._id)}>Got</button>
                        <button onClick={() => onDelete(item._id)}>X</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
}