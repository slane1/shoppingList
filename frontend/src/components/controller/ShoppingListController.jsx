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
    const { backendUrl } = useContext(DataContext);
    const location = useLocation();
    const [thisList, setThisList] = useState({
        id: 1,
        title: 'My Shopping List',
        items: [
            {
                number: 1,
                name: 'Apples',
                quantity: 5,
                done: false
            },
            {
                number: 2,
                name: 'Bananas',
                quantity: 3,
                done: true
            }]
    });

    useEffect(() => {
        if (!thisList) {
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
                <ShoppingList data={thisList} onGot={handleGot} onDelete={handleDelete}/> 
                <AddItem id={thisList.id}/>           
            </div>
            }
        </div>
    )
}