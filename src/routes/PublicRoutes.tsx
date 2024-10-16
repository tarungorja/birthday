import React from 'react';
import SignInPage from '../pages/SignInPage';

// Lazy load the components using dynamic imports
const NotFound = React.lazy(() => import('../pages/NotFound'));
const InternalServerError = React.lazy(
    () => import('../pages/InternalServerError')
);
const ServiceUnavailable = React.lazy(
    () => import('../pages/ServiceUnavailable')
);
const Forbidden = React.lazy(() => import('../pages/Forbidden'));

const publicRoutes = [
    {
        path: '/signin-page',
        element: <SignInPage />,
    },
    { path: 'pages/error-404', element: <NotFound /> },
    { path: 'pages/error-500', element: <InternalServerError /> },
    { path: 'pages/error-503', element: <ServiceUnavailable /> },
    { path: 'pages/error-505', element: <Forbidden /> },
];

export default publicRoutes;
