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
        <div className='flex flex-col items-center mt-10'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form onSubmit={handleSubmit}>
                    <h1 className='mb-5'>Logout</h1>
                    <p>Are you sure you want to logout?</p>
                    <button type="submit" className="mt-5 w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                </form>
            </div>
        </div>
    )
}