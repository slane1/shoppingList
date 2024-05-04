import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const DataContext = createContext();

export default function DataContextProvider({children}) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(true);
    const [displayList, setDisplayList] = useState({
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
    });
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
    },
    {
        id: 2,
        title: 'My Shopping List 2',
        items: [
            {
                number: 1,
                name: 'B1',
                quantity: 5,
                done: false
            },
            {
                number: 2,
                name: 'B2',
                quantity: 3,
                done: true
            }]
    }]
    );

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

    return (
        <DataContext.Provider 
        value={{ 
            backendUrl, 
            loading, 
            displayList, 
            shoppingLists, 
            fetchShoppingList, 
            markItemDone, 
            deleteItem
        }}>
            {children}
        </DataContext.Provider>
    )
}