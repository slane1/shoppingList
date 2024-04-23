import { useContext, useEffect } from "react";
import { DataContext } from "../../contexts/DataContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ShoppingList from "../ShoppingList";
import LoggedOut from "../LoggedOut";

export default function ShoppingListController() {
    const { loggedIn } = useContext(AuthContext);
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

    function handleGot(event) {
        event.preventDefault();
        console.log("Got");
    }
    function handleDelete(event) {
        event.preventDefault();
        console.log("Delete");
    }

    return (
        <div>
            {!loggedIn ? <LoggedOut /> : 
            <ShoppingList slist={slist} handleGot={handleGot} handleDelete={handleDelete} />
            }
        </div>
    )
}