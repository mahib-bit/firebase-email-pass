import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.innit';

const STATS = [
    {
        title: 'Account Status',
        value: 'Verified',
        statusColor: 'bg-emerald-400',
        change: 'Active Session',
        icon: (
            <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        title: 'Security Score',
        value: '98%',
        statusColor: 'bg-indigo-400',
        change: '+2% this week',
        icon: (
            <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
    },
    {
        title: 'Active Sessions',
        value: '3 Devices',
        statusColor: 'bg-purple-400',
        change: 'Mac, Mobile, Web',
        icon: (
            <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: 'Storage Used',
        value: '2.4 GB',
        statusColor: 'bg-cyan-400',
        change: 'of 10 GB quota',
        icon: (
            <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
        ),
    },
];

const RECENT_ACTIVITIES = [
    { id: 1, action: 'Email Verification Sent', date: 'Just now', type: 'security' },
    { id: 2, action: 'Successful Login via Chrome', date: '2 hours ago', type: 'login' },
    { id: 3, action: 'Password Change Requested', date: 'Yesterday', type: 'security' },
    { id: 4, action: 'New Device Authorized', date: '3 days ago', type: 'device' },
];

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
                <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-sm font-medium text-slate-300">Checking credentials...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative p-4 overflow-hidden">

                <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-center space-y-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
                        <svg className="w-8 h-8 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                            Access Restricted
                        </h2>
                        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                            You must be logged in to access the active dashboard and session metrics.
                        </p>
                    </div>

                    <Link
                        to="/Login"
                        className="group relative inline-block w-full py-3.5 px-6 rounded-2xl font-semibold text-white transition-all duration-300 overflow-hidden bg-gradient-to-b from-white/30 via-white/10 to-transparent border border-white/40 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(168,85,247,0.4)] hover:border-white/60 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                        <span className="relative z-10">Log In to Continue</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">

            <div className="absolute top-20 left-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-8">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-indigo-200 mb-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            Live Workspace
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                            Dashboard Overview
                        </h1>
                        <p className="text-sm text-slate-300 mt-1">
                            Welcome back, <span className="text-indigo-200 font-semibold">{user.email}</span>
                        </p>
                    </div>

                    <button className="group relative self-start md:self-auto px-6 py-3 rounded-2xl font-medium text-sm text-white transition-all duration-300 overflow-hidden bg-gradient-to-b from-white/25 via-white/10 to-transparent border border-white/30 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(168,85,247,0.3)] hover:border-white/50 active:scale-95">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                        <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Sync Metrics
                        </span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STATS.map((stat, idx) => (
                        <div
                            key={idx}
                            className="group relative p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:-translate-y-1 hover:border-white/40 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
                                    {stat.icon}
                                </div>
                                <span className="flex h-2.5 w-2.5 relative">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${stat.statusColor} opacity-75`} />
                                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${stat.statusColor}`} />
                                </span>
                            </div>

                            <p className="text-xs text-slate-300 font-medium">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                            <p className="text-xs text-indigo-200/80 mt-2">{stat.change}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                            <span className="text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">Real-time</span>
                        </div>

                        <div className="space-y-4">
                            {RECENT_ACTIVITIES.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                                        <div>
                                            <p className="text-sm font-medium text-white">{activity.action}</p>
                                            <p className="text-xs text-slate-400">{activity.date}</p>
                                        </div>
                                    </div>

                                    <span className="text-xs text-indigo-200 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                                        {activity.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">Quick Controls</h2>
                            <p className="text-xs text-slate-300 leading-relaxed mb-6">
                                Manage your profile settings and active credentials directly from your glass controls.
                            </p>

                            <div className="space-y-3">
                                <button className="group relative w-full py-3 px-4 rounded-2xl font-medium text-xs text-white transition-all duration-300 overflow-hidden bg-gradient-to-b from-white/20 to-white/5 border border-white/20 hover:border-white/40 active:scale-95 text-left flex items-center justify-between">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                                    <span className="relative z-10">Security Settings</span>
                                    <span className="relative z-10 text-slate-400 group-hover:text-white">→</span>
                                </button>

                                <button className="group relative w-full py-3 px-4 rounded-2xl font-medium text-xs text-white transition-all duration-300 overflow-hidden bg-gradient-to-b from-white/20 to-white/5 border border-white/20 hover:border-white/40 active:scale-95 text-left flex items-center justify-between">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                                    <span className="relative z-10">Active Devices</span>
                                    <span className="relative z-10 text-slate-400 group-hover:text-white">→</span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-white/10 text-center">
                            <span className="text-[11px] text-slate-400">
                                Encrypted Session ID: <code className="text-indigo-200">#8F21-GLS</code>
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Dashboard;