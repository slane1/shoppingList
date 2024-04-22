import { useContext, useState, useEffect } from "react";
import { DataContext } from "../contexts/DataContext";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ShoppingList() {
    const { backendUrl } = useContext(DataContext);
    const location = useLocation();
    const slist = location.state ? location.state.data : null;
    useEffect(() => {
        if (!slist) {
            axios.get(`${backendUrl}/shopping-list/${location.pathname.split("/")[2]}`)
            .then((response) => {
                console.log(response.data);
                location.state = { data: response.data };
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, []);

    if (!slist) {
        return <h1>Error loading Shopping List</h1>;
    } else {
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
}