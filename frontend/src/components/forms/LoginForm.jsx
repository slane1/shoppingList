import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

export default function Login() {
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
            const response = await axios.post(`${backendUrl}/auth/login`, login);
            console.log(response.data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                checkLoggedIn();
                // Redirect to dashboard
                navigate("/dashboard");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>

        </div>
    )
} 