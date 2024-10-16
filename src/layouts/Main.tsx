import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Main = () => {
    const token = localStorage.getItem('authToken');
    const bc = document.body.classList;

    bc.add('sidebar-offset');
    // auto close sidebar when switching pages in mobile
    bc.remove('sidebar-show');

    // scroll to top when switching pages
    window.scrollTo(0, 0);

    return <>{token ? <Outlet /> : <Navigate to='/signin-page' />}</>;
};

export default Main;
