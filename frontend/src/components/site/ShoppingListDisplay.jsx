import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import ShoppingList from "../ShoppingList";
import AddItem from "../forms/AddItem";
import LoggedOut from "./LoggedOut";

export default function ShoppingListDisplay(props) {
    const { loggedIn } = useContext(AuthContext);
    const { backendUrl, displayList, setDisplayList, fetchShoppingList } = useContext(DataContext);
    const location = useLocation();

    useEffect(() => {
        if (!props.data !== location.pathname.split("/")[2]) {
            axios.get(`${backendUrl}/shopping-list/${location.pathname.split("/")[2]}`, { withCredentials: true })
            .then((response) => {
                setDisplayList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            setDisplayList(location.state.data);
        }
    }, []);


    return (
        <div>
            {!loggedIn ? <LoggedOut /> :
            <div>
                <Header />
                <ShoppingList data={displayList} listId={displayList._id}/> 
                <AddItem id={displayList._id} />  
                <Footer />         
            </div>
            }
        </div>
    )
}