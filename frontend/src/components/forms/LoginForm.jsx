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
        <div className='flex flex-col items-center'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center mt-10 mb-5 gap-1 w-3/4'>
            <label htmlFor="email">Mail</label>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit" className='mt-3 w-20 h-10 hover:text-black hover:bg-gray-700 focus:ring-gray-600'>Login</button>
        </form>
        <div>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
        </div>
    </div>
)
} 