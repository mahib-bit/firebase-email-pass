import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext/AuthContext';

const RedirectRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <p>Checking authentication...</p>;
    }

    if (!user) {
        return <Navigate to="/Login" replace />;
    }

    return children;
};

export default RedirectRoute;