import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../Firebase/firebase.innit';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleRegister = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {

                sendEmailVerification(result.user);

                alert('Verification email sent!');

            })
            .catch(error => {
                console.log(error.code);
                if (error.code === 'auth/email-already-in-use') {
                    alert('This email is already registered!');
                }
                else if (error.code === 'auth/invalid-email') {
                    alert('Please enter a valid email!');
                }
                else if (error.code === 'auth/weak-password') {
                    alert('Password must be at least 6 characters!');
                }
                else {
                    alert('Registration failed!');
                }
            });
    };

    const handleLogin = () => {

        if (user) {
            alert('You are already logged in!');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {

                console.log(error.code);

                if (error.code === 'auth/invalid-credential') {
                    alert('Invalid email or password!');
                }
                else if (error.code === 'auth/invalid-email') {
                    alert('Please enter a valid email!');
                }
                else {
                    alert('Login failed!');
                }

            });
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('User logged out')
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            console.log(user);
        });
        return () => unsubscribe();

    }, []);

    return (
        <div>
            <h1>Register</h1>
            <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
            <br />
            <button onClick={handleRegister}>Register</button>
            <br />
            <button onClick={handleLogin}>Login</button>
            <br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Login;