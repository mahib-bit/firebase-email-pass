import React, { useContext, useState, useEffect } from 'react';
import { sendEmailVerification, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import {
    User,
    Mail,
    ShieldCheck,
    ShieldAlert,
    Key,
    Edit3,
    Calendar,
    IdCard,
    Shield,
    X,
    CheckCircle2,
    Link as LinkIcon,
    Save
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { auth } from '../../Firebase/firebase.innit';

const Profile = () => {
    const { user } = useContext(AuthContext);

    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) return;

        setLoading(true);
        try {
            await updateProfile(auth.currentUser, {
                displayName: displayName,
                photoURL: photoURL,
            });

            await auth.currentUser.reload();
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendVerification = () => {
        if (auth.currentUser) {
            sendEmailVerification(auth.currentUser)
                .then(() => toast.success('Verification email sent! Check your inbox.'))
                .catch(() => toast.error('Failed to send verification email.'));
        }
    };

    const handleResetPassword = () => {
        if (user?.email) {
            sendPasswordResetEmail(auth, user.email)
                .then(() => toast.success('Password reset email sent! Check your inbox.'))
                .catch(() => toast.error('Failed to send password reset email.'));
        } else {
            toast.error('No registered email found.');
        }
    };

    const displayPhoto = user?.photoURL || photoURL;
    const initial = (displayName || user?.displayName || user?.email || 'U').charAt(0).toUpperCase();

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-8">
                <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 border-2 border-white/40 flex items-center justify-center text-3xl font-bold text-white shadow-inner backdrop-blur-md overflow-hidden">
                                {displayPhoto ? (
                                    <img src={displayPhoto} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    initial
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-md flex items-center justify-center" title="Active Session">
                                <CheckCircle2 className="w-4 h-4 text-slate-900" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                                    {user?.displayName || displayName || 'User Profile'}
                                </h1>
                                <span className={`px-3 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-md flex items-center gap-1 ${user?.emailVerified
                                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                    }`}>
                                    {user?.emailVerified ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                                    {user?.emailVerified ? 'Verified' : 'Unverified'}
                                </span>
                            </div>
                            <p className="text-sm text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
                                <Mail className="w-4 h-4 text-indigo-300" />
                                {user?.email || 'No user signed in'}
                            </p>
                            <p className="text-xs text-indigo-200/70 pt-1 flex items-center justify-center sm:justify-start gap-1.5">
                                <IdCard className="w-3.5 h-3.5" />
                                User ID: <code className="bg-white/10 px-1.5 py-0.5 rounded border border-white/10">{user?.uid || 'N/A'}</code>
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-5 py-2.5 rounded-2xl text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all active:scale-95 flex items-center gap-2"
                    >
                        {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                    </button>
                </div>

                {isEditing ? (
                    <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] space-y-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Edit3 className="w-5 h-5 text-indigo-300" />
                            Update Profile Information
                        </h2>

                        <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">Display Name</label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 backdrop-blur-md"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">Photo URL (Direct Link)</label>
                                <div className="relative">
                                    <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                    <input
                                        type="url"
                                        placeholder="https://example.com/photo.jpg"
                                        value={photoURL}
                                        onChange={(e) => setPhotoURL(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 backdrop-blur-md"
                                    />
                                </div>
                            </div>

                            {photoURL && (
                                <div className="flex items-center gap-3 pt-1">
                                    <span className="text-xs text-slate-400">Preview:</span>
                                    <img
                                        src={photoURL}
                                        alt="Preview"
                                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400/50"
                                    />
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 rounded-2xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/50 transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    {loading ? 'Saving Changes...' : 'Save Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] space-y-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <User className="w-5 h-5 text-indigo-300" />
                                Account Details
                            </h2>

                            <div className="space-y-3 pt-2 text-sm">
                                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                                    <span className="text-slate-400 flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> Email Address
                                    </span>
                                    <span className="font-medium text-white truncate max-w-[180px] sm:max-w-[220px]">{user?.email || 'N/A'}</span>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                                    <span className="text-slate-400 flex items-center gap-2">
                                        <Shield className="w-4 h-4" /> Verification
                                    </span>
                                    <span className={user?.emailVerified ? 'text-emerald-300 font-medium flex items-center gap-1' : 'text-amber-300 font-medium flex items-center gap-1'}>
                                        {user?.emailVerified ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                                        {user?.emailVerified ? 'Verified ✓' : 'Pending Verification'}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                                    <span className="text-slate-400 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> Created At
                                    </span>
                                    <span className="font-medium text-slate-200">
                                        {user?.metadata?.creationTime
                                            ? new Date(user.metadata.creationTime).toLocaleDateString()
                                            : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] space-y-4 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    <Key className="w-5 h-5 text-purple-300" />
                                    Security Options
                                </h2>
                                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                    Manage your credentials and request verification links.
                                </p>

                                <div className="space-y-3">
                                    {!user?.emailVerified && (
                                        <button
                                            onClick={handleResendVerification}
                                            className="group relative w-full py-3 px-4 rounded-2xl font-medium text-xs text-white transition-all duration-300 overflow-hidden bg-gradient-to-b from-white/20 to-white/5 border border-white/20 hover:border-white/40 active:scale-95 text-left flex items-center justify-between"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                                            <span className="relative z-10 flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-indigo-300" /> Resend Verification Email
                                            </span>
                                            <Mail className="relative z-10 w-4 h-4 text-indigo-300 group-hover:text-white" />
                                        </button>
                                    )}

                                    <button
                                        onClick={handleResetPassword}
                                        className="group relative w-full py-3 px-4 rounded-2xl font-medium text-xs text-white transition-all duration-300 overflow-hidden bg-gradient-to-b from-white/20 to-white/5 border border-white/20 hover:border-white/40 active:scale-95 text-left flex items-center justify-between"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Key className="w-4 h-4 text-indigo-300" /> Send Password Reset Email
                                        </span>
                                        <Key className="relative z-10 w-4 h-4 text-indigo-300 group-hover:text-white" />
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 text-center">
                                <span className="text-[11px] text-slate-400">
                                    Session Active • Encrypted Portal
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;