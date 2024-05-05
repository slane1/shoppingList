import React, { useState, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';

export default function AddItem(id) {
    const { backendUrl } = useContext(DataContext);
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
        console.log("adding item", item);
    }

    return (
        <div>
            <form action="">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={handleChange}/>
                <label htmlFor="quantity">Quantity</label>
                <input type="number" name="quantity" id="quantity" onChange={handleChange}/>
                <button type="submit" onClick={handleAdd}>Add</button>
            </form>
        </div>
    )

}