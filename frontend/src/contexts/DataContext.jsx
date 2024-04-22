import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const DataContext = createContext();

export default function DataContextProvider({children}) {
    const [loading, setLoading] = useState(true);
    const [shoppingLists, setShoppingLists] = useState(
    [{
        id: 1,
        title: 'My Shopping List',
        items: [
            {
                number: 1,
                name: 'Apples',
                quantity: 5,
                done: false
            },
            {
                number: 2,
                name: 'Bananas',
                quantity: 3,
                done: true
            }]
    }]
    );
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