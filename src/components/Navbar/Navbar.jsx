import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div >
            <Link to='/'><p>Home</p></Link>
            <Link to='/Login'><p>Login</p></Link>
        </div>
    );
};

export default Navbar;