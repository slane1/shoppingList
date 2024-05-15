import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

export default function LogoutForm() {
    const navigate = useNavigate();
    const { backendUrl } = useContext(DataContext);
    console.log(backendUrl, "logout form");
    const { checkLoggedIn } = useContext(AuthContext);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await axios.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true });
            await checkLoggedIn();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            <h1 className='mb-5'>Logout</h1>
            <p>Are you sure you want to logout?</p>
            <button type="submit" className='mt-3 w-20 h-10 hover:text-black hover:bg-gray-700 focus:ring-gray-600'>Logout</button>
        </form>
    )
}