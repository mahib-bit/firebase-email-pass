import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {
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
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative p-4 overflow-hidden">
                <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-center space-y-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
                        <svg className="w-8 h-8 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                            Authentication Required
                        </h2>
                        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                            Please login first to view this page.
                        </p>
                    </div>

                    <Link
                        to="/Login"
                        className="group relative inline-block w-full py-3.5 px-6 rounded-2xl font-semibold text-white transition-all duration-300 overflow-hidden bg-gradient-to-b from-white/30 via-white/10 to-transparent border border-white/40 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(168,85,247,0.4)] hover:border-white/60 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                        <span className="relative z-10">Go to Login</span>
                    </Link>
                </div>
            </div>
        );
    }

    return children;
};

export default PrivateRoute;