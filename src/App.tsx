import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './layouts/Main';
import NotFound from './pages/NotFound';
import publicRoutes from './routes/PublicRoutes';
import protectedRoutes from './routes/ProtectedRoutes';
import './assets/css/remixicon.css';
import './scss/style.scss';
import Header from './layouts/Header';
import { ErrorProvider } from './Contexts/ErrorContext';
import PublicRoutes from './layouts/PublicRoutes';
import config from './configuration/AppConfig';
const homePage = config.HOMEPAGE ? config.HOMEPAGE : '/';

console.log('homePage: ', homePage);
function App() {
    return (
        <React.Fragment>

            <BrowserRouter basename={homePage}><ErrorProvider>
                <Routes>
                    <Route
                        path='/'
                        element={<Navigate to='signin-page' replace />}
                    />
                    <Route path='/' element={<Main />}>
                        {protectedRoutes.map((route, index) => (
                            <Route
                                path={route.path}
                                element={
                                    <React.Suspense fallback={<Header />}>
                                        {route.element}
                                    </React.Suspense>
                                }
                                key={index}
                            />
                        ))}
                    </Route>
                    <Route element={<PublicRoutes />}>
                        {publicRoutes.map((route, index) => (
                            <Route
                                path={route.path}
                                element={
                                    <React.Suspense fallback={<Header />}>
                                        {route.element}
                                    </React.Suspense>
                                }
                                key={index}
                            />
                        ))}
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </ErrorProvider>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
