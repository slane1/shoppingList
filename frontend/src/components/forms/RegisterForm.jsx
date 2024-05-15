import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import axios from "axios";

export default function Register() {
    const { backendUrl } = useContext(DataContext);
    const [register, setRegister] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [response, setResponse] = useState("");

    const handleChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(register);
        try {
            const response = await axios.post(`${backendUrl}/auth/register`, register);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        console.log(response.data);
    }
    , [response]);
    

    return (
        <div className='flex flex-col items-center mt-10'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white">Register</h2>
            <p>{response}</p>
            <form className='flex flex-col items-center mt-10 mb-5 gap-1 w-3/4'>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleChange} />
                <button type="submit" onClick={handleSubmit} className='mt-3 w-20 h-10 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>Register</button>
            </form>
            </div>
        </div>
    )
    
}