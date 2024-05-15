import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';
import add from '../../assets/plus-solid.svg';

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
            <div className='flex flex-col items-center'>
                <form className='flex flex-col mt-10 mb-5 items-center'>
                    <div className='flex flex-row items-center gap-5'>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={newList.title} onChange={handleChange} />
                        <button type='submit' onClick={handleSubmit} className='flex items-center justify-center hover:text-black hover:bg-gray-700 focus:ring-gray-600'><img src={add} alt="" className='text-blue-500'/></button>
                    </div>
                </form>
            </div>
        </div>
    )
}