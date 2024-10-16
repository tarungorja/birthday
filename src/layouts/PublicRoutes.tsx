import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    const token = localStorage.getItem('authToken');
    return <>{token ? <Navigate to='/dashboard/health' /> : <Outlet />}</>;
};

export default PublicRoutes;
