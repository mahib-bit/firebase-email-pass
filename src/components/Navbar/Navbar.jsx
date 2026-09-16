import React from 'react';
import { NavLink } from 'react-router';

const NAV_ITEMS = [
    { path: '/', label: 'Home' },
    { path: '/Login', label: 'Login' },
    { path: '/dashboard', label: 'Dashboard' },
];

const Navbar = () => {
    return (
        <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
            {/* Liquid Glass Navigation Container */}
            <nav className="flex items-center gap-1.5 p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `group relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden backdrop-blur-md active:scale-95 ${isActive
                                ? 'text-white bg-white/30 border border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                                : 'text-slate-300 hover:text-white bg-gradient-to-b from-white/15 to-white/5 border border-white/10 hover:border-white/30 hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]'
                            }`
                        }
                    >
                        {/* Liquid Sheen Animation on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                        <span className="relative z-10 tracking-wide">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </header>
    );
};

export default Navbar;