import React, { useState, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';

export default function AddItem(props) {
    console.log("Running AddItem with id:", props.id);
    const { backendUrl, refreshDisplayList } = useContext(DataContext);
    const { loggedIn } = useContext(AuthContext);
    const [item, setItem] = useState({
        name: "",
        quantity: 0,
        done: false
    });
    function handleChange(event) {
        setItem({
            ...item,
            [event.target.name]: event.target.value
        });
    }

    async function handleAdd(event) {
        event.preventDefault();
        try {
            await axios.post(`${backendUrl}/item`, { ...item, shoppingListId: props.id }, { withCredentials: true });
            setItem({
                name: "",
                quantity: 0,
                done: false
            });
            await refreshDisplayList(props.id);
        }
        catch (error) {
            console.error('Error adding item:', error);
        }
    }

    return (
        <div>
            <form onSubmit={handleAdd}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={handleChange}/>
                <label htmlFor="quantity">Quantity</label>
                <input type="number" name="quantity" id="quantity" onChange={handleChange}/>
                <button type="submit">Add</button>
            </form>
        </div>
    )

}