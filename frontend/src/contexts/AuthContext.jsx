import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState({
        id: 1,
        username: "Username",
        email: "mail@example.mail",
    });
    const [loggedIn, setLoggedIn] = useState(true);
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