import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("backendUrl", backendUrl);
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    async function checkLoggedIn() {
        console.log("Checking logged in");
        if (!Cookies.get('token')) {
            console.log("no token found");
            setLoggedIn(false);
            return;
        }
        try {
            const response = await axios.get(`${backendUrl}/auth/auth-user`, {
                withCredentials: true
        });
        if (response.data) {
            console.log("setting user", response.data);
            setUser({
                id: response.data._id,
                username: response.data.name,
                email: response.data.email
            });
            setLoggedIn(true);
        } else {
            console.log("no user found");
            setLoggedIn(false);
            setUser({});
        }
    }
    catch (err) {
        console.log("error");
        console.error(err);
        setLoggedIn(false);
        setUser({});
    }}

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            checkLoggedIn();
        } else {
            setLoggedIn(false);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loggedIn,
            setLoggedIn,
            checkLoggedIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}