import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState({
        id: 1,
        username: "Username",
        email: "mail@example.mail",
    });
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}