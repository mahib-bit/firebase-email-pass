import React from 'react';
import { createBrowserRouter } from 'react-router';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Root from '../Root/Root';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Profile from '../pages/Profile/Profile';
import RedirectRoute from '../RedirectRoute/RedirectRoute';

export const router = createBrowserRouter([

    {
        path: '/',
        Component: Root,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'Login',
                Component: Login,
            },
            {
                path: 'dashboard',
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: 'profile',
                element: (
                    <RedirectRoute>
                        <Profile />
                    </RedirectRoute>
                ),
            }
        ]
    }

]);