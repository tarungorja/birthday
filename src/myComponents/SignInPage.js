import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import bg1 from '../assets/img/bg1.jpg';
import Header from '../layouts/Header';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signInEmail = 'jioenergenie@ril.com';
    const signInPassword = 'jioenergenie@1';

    const handleClick = () => {
        if (email === signInEmail && password === signInPassword) {
            // Redirect to the dashboard
            window.location.href = 'http://localhost:3001/dashboard/finance';
        } else {
            // Display an error message
            setError('Please enter the correct email and password.');
        }
        setEmail('');
        setPassword('');
    };

    return (
        <React.Fragment>
            <Header />
            <div className="page-sign d-block py-0">
                <Row className="g-0">
                    <Col md="7" lg="5" xl="4" className="col-wrapper">
                        <Card className="card-sign">
                            <Card.Header>
                                <div className="header-logo mb-5">
                                    Jio EnerGenie
                                </div>
                                <Card.Title>Sign In</Card.Title>
                                <Card.Text>
                                    Welcome back! Please SignIn to continue.
                                </Card.Text>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <div className="mb-4">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your email address"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            value={email}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Form.Label className="d-flex justify-content-between">
                                            Password
                                            <Link to="">Forgot password?</Link>
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            value={password}
                                        />
                                    </div>
                                    {error && (
                                        <div className="error-message">
                                            {error}
                                        </div>
                                    )}
                                    <Button
                                        variant="primary"
                                        className="btn-sign"
                                        onClick={handleClick}
                                    >
                                        Sign In
                                    </Button>

                                    <div className="divider">
                                        <span>or sign in with</span>
                                    </div>

                                    <Row className="gx-2">
                                        <Col>
                                            <Button
                                                variant=""
                                                className="btn-facebook"
                                            >
                                                <i className="ri-facebook-fill"></i>{' '}
                                                Facebook
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                variant=""
                                                className="btn-google"
                                            >
                                                <i className="ri-google-fill"></i>{' '}
                                                Google
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                            <Card.Footer>
                                Don't have an account?{' '}
                                <Link to="">Create an Account</Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col className="d-none d-lg-block">
                        <img src={bg1} className="auth-img" alt="" />
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default SignInPage;
