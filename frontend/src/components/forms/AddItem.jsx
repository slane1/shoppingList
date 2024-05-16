import React, { useState, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';
import add from '../../assets/plus-solid.svg';

export default function AddItem(props) {
    console.log("Running AddItem with id:", props.id);
    const { backendUrl, refreshDisplayList } = useContext(DataContext);
    const { loggedIn } = useContext(AuthContext);
    const [item, setItem] = useState({
        name: "",
        quantity: 1,
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
            if (item.name) {
            await axios.post(`${backendUrl}/item`, { ...item, shoppingListId: props.id }, { withCredentials: true });
            setItem({
                name: "",
                quantity: 1,
                done: false
            });
            await refreshDisplayList(props.id);
        }
        }
        catch (error) {
            console.error('Error adding item:', error);
        }
    }

    return (
        <div className='flex flex-col items-center mt-16'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form onSubmit={handleAdd} className='space-y-6'>
                    <h2 className="text-2xl font-medium text-gray-900 dark:text-white">New Item</h2>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-base text-left font-medium text-gray-900 dark:text-white items-start">Name</label>
                            <input type="text" name="name" id="name" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block mb-2 text-base text-left font-medium text-gray-900 dark:text-white items-start">Quantity</label>
                            <input type="number" name="quantity" id="quantity" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' value={item.quantity} onChange={handleChange}/>
                        </div>
                    <div>
                        <button type="submit" className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Item</button>
                    </div>
                </form>
            </div>
        </div>
    )

}