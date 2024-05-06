import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
export const DataContext = createContext();

export default function DataContextProvider({children}) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log(backendUrl);
    const { loggedIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [displayList, setDisplayList] = useState({});
    const [shoppingLists, setShoppingLists] = useState([]);

    // Check if user is logged in and fetch shopping lists if they are
    useEffect(() => {
        console.log(loggedIn);
        if (loggedIn) {
            console.log("running useEffect in DataContextProvider");
            fetchShoppingList();
        }
    }, [loggedIn]);

    // Fetch shopping lists
    async function fetchShoppingList() {
        try {
            const response = await axios.get(`${backendUrl}/shopping-list`, { withCredentials: true });
            setShoppingLists(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching shopping list:', error);
        }
    }
    // refresh display list
    async function refreshDisplayList() {
        try {
            await axios.get(`${backendUrl}/shopping-list/${displayList._id}`, { withCredentials: true })
            .then((response) => {
                setDisplayList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        } catch (error) {
            console.error('Error refreshing display list:', error);
        }
    }

    // Item functions, mark item done, delete item
    async function handleGot(number, listId) {
        try {
            await axios.put(`${backendUrl}/item/got/${number}`, number, { withCredentials: true }
            );
            await fetchShoppingList();
            await refreshDisplayList(listId);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    }

    async function handleDelete(number, listId) {
        console.log("Running handleDelete with number:", number);
        try {
            await axios.delete(`${backendUrl}/item/${number}`, { withCredentials: true });
            await fetchShoppingList();
            await refreshDisplayList(listId);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    // Shopping list functions
    async function deleteList(id) {
        try {
            await axios.delete(`${backendUrl}/shopping-list/${id}`, { withCredentials: true });
            fetchShoppingList();
        } catch (error) {
            console.error('Error deleting shopping list:', error);
        }
    }

    return (
        <DataContext.Provider 
        value={{ 
            shoppingLists, 
            deleteList, 
            displayList, 
            setDisplayList, 
            loading,
            backendUrl,
            fetchShoppingList,
            handleGot,
            handleDelete,
            refreshDisplayList
        }}>
            {children}
        </DataContext.Provider>
    )
}