import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ShoppingList from "../ShoppingList";
import AddItem from "../AddItem";
import LoggedOut from "../LoggedOut";

export default function ShoppingListController() {
    const { loggedIn } = useContext(AuthContext);
    const { backendUrl, displayList, setDisplayList } = useContext(DataContext);
    const location = useLocation();

    useEffect(() => {
        if (!displayList.id !== location.pathname.split("/")[2]) {
            axios.get(`${backendUrl}/shopping-list/${location.pathname.split("/")[2]}`)
            .then((response) => {
                console.log(response.data);
                location.state = { data: response.data };
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, [displayList]);

    const handleGot = (number) => {
        console.log("Got item", number);
    }

    const handleDelete = (number) => {
        console.log("Delete item", number);
    }


    return (
        <div>
            {!loggedIn ? <LoggedOut /> :
            <div>
                <ShoppingList data={displayList} onGot={handleGot} onDelete={handleDelete}/> 
                <AddItem id={displayList.id}/>           
            </div>
            }
        </div>
    )
}