import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext/AuthContext';

const RedirectRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
                <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex items-center gap-3.5">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-indigo-300 rounded-full animate-spin" />
                    <span className="text-sm font-medium text-slate-300">Checking authentication...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/Login" replace />;
    }

    return children;
};

export default RedirectRoute;