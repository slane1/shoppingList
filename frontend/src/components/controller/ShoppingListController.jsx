import { useContext, useEffect } from "react";
import { DataContext } from "../../contexts/DataContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ShoppingList from "../ShoppingList";

export default function ShoppingListController() {
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

    return (
        <div>
            <ShoppingList slist={slist} />
        </div>
    )
}