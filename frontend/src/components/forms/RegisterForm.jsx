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
            <form className='space-y-6'>
                <div>
                    <label htmlFor="username" className="block mb-2 text-base text-left font-medium text-gray-900 dark:text-white items-start">Username</label>
                    <input type="text" name="username" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-base text-left font-medium text-gray-900 dark:text-white items-start">Email</label>
                    <input type="email" name="email" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-base text-left font-medium text-gray-900 dark:text-white items-start">Password</label>
                    <input type="password" name="password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' onChange={handleChange} />
                </div>
                <button type="submit" onClick={handleSubmit} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
            </form>
            </div>
        </div>
    )
    
}