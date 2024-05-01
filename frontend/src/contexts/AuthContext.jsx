import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState({
        id: 1,
        username: "Username",
        email: "mail@example.mail",
    });
    const [loggedIn, setLoggedIn] = useState(true);

    async function checkLoggedIn() {
        try {
            const response = await fetch("/auth/auth-user");
            const data = await response.json();
            if (data.username) {
                setUser(data);
                setLoggedIn(true);
            } else {
                setUser({});
                setLoggedIn(false);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
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