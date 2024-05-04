import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';

export default function NewList() {
    const { backendUrl, fetchShoppingList } = useContext(DataContext);
    const navigate = useNavigate();
    const [newList, setNewList] = useState({
        title: "",
    });

    function handleChange(event) {
        setNewList({
            ...newList,
            [event.target.name]: event.target.value
        });
    }
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            console.log("newList:", newList);
            await axios.post(`${backendUrl}/shopping-list`, newList, { withCredentials: true });
            setNewList({
                title: "",
            });
            fetchShoppingList();
        } catch (error) {
            console.error('Error creating new list:', error);
        }
    }




    return (
        <div>
            <div>
                <form action="">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={newList.title} onChange={handleChange} />
                    <button type='submit' onClick={handleSubmit}>Add</button>
                </form>
            </div>
        </div>
    )
}