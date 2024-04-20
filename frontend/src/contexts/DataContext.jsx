import React, { createContext, useState } from 'react';
import axios from 'axios';

export default function DataContext({children}) {
    const [loading, setLoading] = useState(true);
    const [shoppingLists, setShoppingLists] = useState([]);

    async function fetchShoppingList() {
        try {
            const response = await axios.get('http://localhost:3000/api/shopping-list');
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