import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Button, Modal } from 'react-bootstrap';
import mailBox from '../assets/svg/error-circle.svg';
import { logOut } from '../utilities/logOutUtil';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface ErrorContextType {
    errorDetails: AxiosError<IErrorResponse> | null;
    showError: (error: AxiosError<IErrorResponse>) => void;
    hideError: () => void;
}
interface ErrorProviderProps {
    children: ReactNode;
}
const ErrorContext = createContext<ErrorContextType>({
    errorDetails: null,
    showError: () => { },
    hideError: () => { },
});

export const useError = () => useContext(ErrorContext);

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const [errorDetails, setErrorDetails] = useState<AxiosError<IErrorResponse> | null>(null);
    const showError = (error: AxiosError<IErrorResponse>) => {
        console.log('Error:', error);
        setErrorDetails(error);
    };

    const hideError = () => {
        setErrorDetails(null);
    };
    const handleHomePage = () => {
        setErrorDetails(null);
        navigate('/dashboard/health');
    };
    return (
        <ErrorContext.Provider value={{ errorDetails, showError, hideError }}>
            {children}
            {errorDetails && (
                <Modal show={errorDetails != null} onHide={hideError} animation={false} centered backdrop='static'>
                    <Modal.Header>
                        <h4>
                            {errorDetails.response?.status === 401
                                ? 'Session Expired'
                                : errorDetails.response?.status === 403
                                    ? 'Invalid Authorization token'
                                    : 'Error'}
                        </h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='text-center'>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={mailBox} style={{ width: '70px' }} alt='Error icon' />
                                {/* <h1 className="error-popup m-0">{errorDetails.response?.status}</h1> */}
                            </div>
                            {/* <h6 className='m-2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Detail: {errorDetails.response?.data?.detail || 'An unexpected error occurred'}
                            </h6> */}
                            <h6
                                className='m-2'
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                {errorDetails.response?.status === 401
                                    ? 'Your Session has Expired!!'
                                    : errorDetails.response?.status === 403
                                        ? 'Invalid Authorization token!!'
                                        : errorDetails.response?.status === 503
                                            ? 'Service is unavailable, Please try again after some time'
                                            : 'An  error occurred'}
                            </h6>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {errorDetails.response?.status === 401 || errorDetails.response?.status === 403 ? (
                            <Button variant='primary' onClick={() => logOut()}>
                                Re-login
                            </Button>
                        ) : errorDetails.response?.status === 503 ? (
                            <Button variant='primary' onClick={() => logOut()}>
                                Re-login
                            </Button>
                        ) : (
                            <Button variant='primary' onClick={handleHomePage}>
                                Home Page
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            )}
        </ErrorContext.Provider>
    );
};
