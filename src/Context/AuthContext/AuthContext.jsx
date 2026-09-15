import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.innit';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();

    }, []);

    return (
        <AuthContext.Provider value={{ user,loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;