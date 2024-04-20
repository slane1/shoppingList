import React, { createContext, useState } from 'react';
import axios from 'axios';

export default function DataContext({children}) {
    const [loading, setLoading] = useState(true);
    const [shoppingLists, setShoppingLists] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    async function fetchShoppingList() {
        try {
            const response = await axios.get(`${backendUrl}/shopping-lists`);
            setShoppingLists(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching shopping list:', error);
        }
    }

    return (
        <DataContext.Provider 
        value={{ shoppingLists, setShoppingLists, loading, setLoading }}>
            {children}
        </DataContext.Provider>
    )
}