import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState({
        id: 1,
        username: "Username",
        email: "mail@example.mail",
    });
    const [loggedIn, setLoggedIn] = useState(true);

    async function checkLoggedIn() {
        console.log("Checking logged in");
        try {
            const response = await axios.get('/auth/auth-user', {
                withCredentials: true
        });
        if (response.data) {
            console.log("setting user", response.data);
            setUser(response.data);
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
        console.log("useEffect running auth context");
        checkLoggedIn();
    }, []);
    
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loggedIn,
            setLoggedIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}