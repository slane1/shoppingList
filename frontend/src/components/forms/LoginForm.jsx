import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

export default function LoginForm() {
    const navigate = useNavigate();
    const { backendUrl } = useContext(DataContext);
    const { checkLoggedIn } = useContext(AuthContext);
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/auth/login`, login,{ withCredentials: true });
            if (data.token) {
                const token = data.token;
                localStorage.setItem('token', token);
                await checkLoggedIn();
                navigate('/dashboard');
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
    <div className='flex flex-col items-center mt-10'>
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleSubmit} className='space-y-6'>
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white">Login</h2>
                <div>
                    <label htmlFor="email" className="block mb-2 text-base text-left font-medium text-gray-900 dark:text-white items-start">Mail</label>
                    <input type="email" name="email" placeholder="Email" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-base text-left font-medium text-gray-900 dark:text-white items-start">Password</label>
                    <input type="password" name="password" placeholder="Password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' onChange={handleChange} />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </form>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-5">
                <p>Don't have an account?</p>
                <Link to="/register">Register</Link>
            </div>
        </div>
    </div>
)
} 