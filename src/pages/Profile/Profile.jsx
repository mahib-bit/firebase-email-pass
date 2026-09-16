import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.innit';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user } = useContext(AuthContext);
    // console.log(user)

    const handleResetPassword = () => {
        if (user?.email) {
            sendPasswordResetEmail(auth, user.email)
                .then(() => toast.success('Password reset email sent!'))
                .catch(() => toast.error('Failed to send password reset email.'));
        }
    }

    return (
        <div className="flex flex-col min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative p-4 overflow-hidden">

            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

            <h1>Profile</h1>
            <p>This is the profile page.</p>
            <p>Email: {user?.email}</p>
            <div>
                <button className='btn btn-block' onClick={handleResetPassword}>
                    Send Password Reset Email
                </button>
            </div>

        </div>
    );
};

export default Profile;