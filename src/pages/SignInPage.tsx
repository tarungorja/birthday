import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { logIn } from '../api/loginApi';
import { AxiosError } from 'axios';
import config from '../configuration/AppConfig';
const homePage = config.HOMEPAGE ? config.HOMEPAGE : '/';

const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/dashboard/health');
        } else {
            userRef.current?.focus();
        }
    }, []);

    useEffect(() => {
        setError('');
    }, [email, password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await logIn(email, password).catch((e: AxiosError) => {
            if (e.response?.status === 401) {
                setError('Please Provide Valid Credentials');
            } else {
                setError('Login Failed');
            }
        });
        if (response && response?.data) {
            const token = response.data['access_token']['credentials'];
            const bearer = response.data['access_token']['scheme'];
            localStorage.setItem('authToken', `${bearer} ${token}`);
            localStorage.setItem('recentlyViewedBatteries', JSON.stringify([]));
            localStorage.setItem('recentlyViewedSignals', JSON.stringify([]));
            navigate('/dashboard/health');
        }
    };
    return (
        <React.Fragment>
            <div className='page-sign'>
                <Card className='card-sign'>
                    <Card.Body>
                        <Card.Title
                            className='header-logo mb-3 ms-auto '
                            style={{
                                left: '50%',
                                transform: 'translateX(-50%)',
                                textAlign: 'center',
                            }}
                        >
                            <h2 style={{ color: '#0b2972', fontWeight: 'bold' }}>
                                <img src={`${homePage}energenie_logo.svg`} style={{ height: '50px' }} alt='Logo' className='pe-2' />
                                JioEnerGenie
                            </h2>
                            <p className='fs-sm-normal text-secondary'>Maximize the Battery Life</p>
                        </Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type='email'
                                    ref={userRef}
                                    placeholder='Enter your email address'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <Form.Label className='d-flex justify-content-between'>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter your password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                            </div>
                            {error && (
                                <div ref={errRef} className='text-danger'>
                                    {error}
                                </div>
                            )}
                            <Button variant='primary' className='btn-sign' type='submit'>
                                Sign In
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default SignInPage;
