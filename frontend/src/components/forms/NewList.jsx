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
        <div className='flex flex-col items-center mt-10'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className='space-y-6'>
                    <h2 className="text-2xl font-medium text-gray-900 dark:text-white">Create new List</h2>
                    <div>
                        <label htmlFor="title" className="block mb-2 text-base text-left font-medium text-gray-900 dark:text-white items-start">Title:</label>
                        <input type="text" id="title" name="title" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' value={newList.title} onChange={handleChange} />
                    </div>
                        <button type='submit' onClick={handleSubmit} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add List</button>
                </form>
            </div>
        </div>
    )
}