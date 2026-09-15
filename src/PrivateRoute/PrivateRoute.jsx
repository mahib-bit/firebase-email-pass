import React, { useContext } from 'react';

import { AuthContext } from '../Context/AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    console.log('User:', user);
    console.log('Loading:', loading);

    if (loading) {
        return <p>Checking authentication...</p>;
    }

    if (!user) {
        return <p>Please login first.</p>;
    }

    return children;
};

export default PrivateRoute;