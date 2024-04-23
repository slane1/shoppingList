import { Link } from "react-router-dom";

export default function ShoppingList({slist, handleGot, handleDelete}) {
    if (!slist) {
        return (
            <>
            <h1>Error loading Shopping List</h1>
            <Link to="/">Back to Homepage</Link>
            </>
        );
    } else {
    return (
        <div>
            <h1>{slist.title}</h1>
            <ul>
                {slist.items.map((item) => (
                    <li key={item.number}>
                        <div>
                        <p>{item.name}</p>
                        <p>{item.quantity}</p>
                        <button onClick={handleGot}>Got</button>
                        <button onClick={handleDelete}>X</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
}