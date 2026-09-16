import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Profile</h1>
            <p>This is the profile page.</p>
            <p>Email: {user?.email}</p>
        </div>
    );
};

export default Profile;