import React from "react";
import { useLocation } from "react-router-dom";

export default function ShoppingList() {
    const location = useLocation();
    const slist = location.state ? location.state.data : null;

    if (!slist) {
        return <div>No data found</div>;
    }

    return (
        <div>
            <h1>{slist.title}</h1>
            <ul>
                {slist.items.map((item) => (
                    <li key={item.number}>
                        {item.name} - {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
}