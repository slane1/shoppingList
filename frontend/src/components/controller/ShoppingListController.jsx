import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ShoppingList from "../ShoppingList";
import AddItem from "../AddItem";
import LoggedOut from "../LoggedOut";

export default function ShoppingListController(props) {
    const { loggedIn } = useContext(AuthContext);
    const { backendUrl, displayList, setDisplayList } = useContext(DataContext);
    const location = useLocation();
    console.log("Running ShoppingListController with location:", location);
    console.log("Running ShoppingListController with displayList:", displayList);
    console.log("Running ShoppingListController with displaylistID:", displayList._id);
    console.log("Running ShoppingListController with props:", location.state.data);

    useEffect(() => {
        if (!props.data !== location.pathname.split("/")[2]) {
            axios.get(`${backendUrl}/shopping-list/${location.pathname.split("/")[2]}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setDisplayList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            setDisplayList(location.state.data);
        }
    }, []);

    // functions
    async function addItem(item) {
        try {
            await axios.post(`${backendUrl}/item`, item , { withCredentials: true });
            await fetchShoppingList();
        } catch (error) {
            console.error('Error adding item:', error);
        }
    }

    // handlers
    async function handleGot(number) {
        try {
            await axios.put(`${backendUrl}/item/${number}`, { withCredentials: true });
            await fetchShoppingList();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    }

    async function handleDelete(number) {
        console.log("Running handleDelete with number:", number);
        try {
            await axios.delete(`${backendUrl}/item/${number}`, { withCredentials: true });
            await fetchShoppingList();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }


    return (
        <div>
            {!loggedIn ? <LoggedOut /> :
            <div>
                <ShoppingList data={displayList} onGot={handleGot} onDelete={handleDelete}/> 
                <AddItem id={displayList._id} />           
            </div>
            }
        </div>
    )
}