import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

export default function LogoutForm() {
    const navigate = useNavigate();
    const { backendUrl } = useContext(DataContext);
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
            <h2>Logout</h2>
            <p>Are you sure you want to logout?</p>
            <button type="submit">Logout</button>
        </form>
    )
}