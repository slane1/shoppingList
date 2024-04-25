import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';

export default function NewList() {
    const { backendUrl } = useContext(DataContext);
    const navigate = useNavigate();
    const [newList, setNewList] = useState({
        title: "",
        items: []
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
            await axios.post(`${backendUrl}/shopping-lists`, newList);
            setNewList({
                title: "",
                items: []
            });
            fetchShoppingList();
            navigate('/');
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