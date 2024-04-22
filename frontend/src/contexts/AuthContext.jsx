import React, { createContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}