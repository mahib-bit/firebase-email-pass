import { round } from 'firebase/firestore/pipelines';
import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div style={{ display : 'flex' , flexDirection : 'row', justifyContent : 'center' , gap: "10px"}}>
            <Link to='/'><p>Home</p></Link>
            <Link to='/Login'><p>Login</p></Link>
            <Link to='/dashboard'><p>Dashboard</p></Link>
        </div>
    );
};

export default Navbar;