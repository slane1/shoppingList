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

    useEffect(() => {
        console.log(loggedIn);
        if (loggedIn) {
            console.log("running useEffect in DataContextProvider");
            fetchShoppingList();
        }
    }, [loggedIn]);

    async function fetchShoppingList() {
        try {
            const response = await axios.get(`${backendUrl}/shopping-list`, { withCredentials: true });
            setShoppingLists(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching shopping list:', error);
        }
    }

    async function markItemDone(id, number) {
        try {
            await axios.put(`${backendUrl}/item/${number}`);
            fetchShoppingList();
        } catch (error) {
            console.error('Error marking item done:', error);
        }
    }
    async function deleteItem(id, number) {
        try {
            await axios.delete(`${backendUrl}/item/${number}`);
            fetchShoppingList();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

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
            markItemDone, 
            deleteItem, 
            displayList, 
            setDisplayList, 
            loading,
            backendUrl,
            fetchShoppingList
        }}>
            {children}
        </DataContext.Provider>
    )
}