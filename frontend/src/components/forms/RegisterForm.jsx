import React, { useState } from "react";
import axios from "axios";


export default function Register() {
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
        try {
            const response = await axios.post("/auth/register", register);
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    };
    

    return (
        <div>
            <h1>Register</h1>
            <p>{response}</p>
            <form action="">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleChange} />
                <button type="submit" onClick={handleSubmit}>Register</button>
            </form>
        </div>
    )
    
}