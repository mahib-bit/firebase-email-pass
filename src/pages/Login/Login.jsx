import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../Firebase/firebase.innit';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const { user } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                sendEmailVerification(result.user);
                toast.success('Verification email sent! Check your inbox.');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('This email is already registered!');
                } else if (error.code === 'auth/invalid-email') {
                    toast.warn('Please enter a valid email address!');
                } else if (error.code === 'auth/weak-password') {
                    toast.warn('Password must be at least 6 characters!');
                } else {
                    toast.error('Registration failed. Please try again.');
                }
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                toast.success('Welcome back! Login successful.');
            })
            .catch(error => {
                if (error.code === 'auth/invalid-credential') {
                    toast.error('Invalid email or password!');
                } else if (error.code === 'auth/invalid-email') {
                    toast.warn('Please enter a valid email address!');
                } else {
                    toast.error('Login failed. Please check your credentials.');
                }
            });
    };

    const handleResendVerification = () => {
        if (auth.currentUser) {
            sendEmailVerification(auth.currentUser)
                .then(() => toast.success('Verification email Sent!'))
                .catch(() => toast.error('Failed to send verification email.'));
        }
    }

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                toast.info('Logged out successfully.');
            })
            .catch(() => {
                toast.error('Logout failed.');
            });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 sm:p-6 lg:p-8">

            <ToastContainer
                position="top-right"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white">

                {user ? (
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 shadow-inner">
                            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-wide">Welcome Back!</h2>
                            <p className="text-sm text-slate-300 mt-1 truncate">{user.email}</p>
                        </div>
                        
                        {!user.emailVerified && (
                            <div>
                                <p className="text-xs text-slate-300">Did not receive an email?
                                    <button onClick={handleResendVerification} className="font-semibold text-indigo-300 hover:text-white underline underline-offset-4 transition-colors ml-1">
                                        Resend
                                    </button> </p>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="group relative w-full py-3.5 px-6 rounded-2xl font-medium text-white transition-all duration-300 overflow-hidden bg-gradient-to-b from-white/25 to-white/5 border border-white/30 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(239,68,68,0.3)] hover:border-red-400/50 hover:from-red-500/20 hover:to-red-600/10 active:scale-95"
                        >
                            <span className="relative z-10">Logout</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </button>
                    </div>

                ) : (
                    <div>
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                                {isRegister ? 'Create Account' : 'Welcome Back'}
                            </h1>
                            <p className="text-sm text-slate-300 mt-2">
                                {isRegister ? 'Sign up to get started' : 'Sign in to access your account'}
                            </p>
                        </div>

                        <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent backdrop-blur-md transition-all duration-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent backdrop-blur-md transition-all duration-200"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="group relative w-full mt-2 py-3.5 px-6 rounded-2xl font-semibold text-white transition-all duration-300 overflow-hidden bg-gradient-to-b from-white/30 via-white/10 to-transparent border border-white/40 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(168,85,247,0.4)] hover:border-white/60 hover:from-white/40 hover:via-white/20 active:scale-[0.98]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                <span className="relative z-10 tracking-wide">
                                    {isRegister ? 'Register' : 'Sign In'}
                                </span>
                            </button>
                        </form>

                        <div className="mt-8 text-center pt-6 border-t border-white/10">
                            <p className="text-xs text-slate-300">
                                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsRegister(!isRegister)}
                                    className="font-semibold text-indigo-300 hover:text-white underline underline-offset-4 transition-colors ml-1"
                                >
                                    {isRegister ? 'Login' : 'Register'}
                                </button>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;