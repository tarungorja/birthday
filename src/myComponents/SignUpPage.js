import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import React, { useState } from 'react';
export default function SignUpPage() {
    const [email, setEmail] = useState();
    const [name, setName] = useState();

    const [password, setPassword] = useState();
    const handleClick = (e) => {
        e.preventDefault();
        console.log(`email: ${email}`);
        console.log(`password: ${password}`);
        console.log(`name: ${name}`);
    };
    return (
        <div className="page-sign">
            <Header />
            <Card className="card-sign">
                <Card.Header>
                    <Link to="/" className="header-logo mb-4">
                        Smart Battery Analytics Wire Frames
                    </Link>
                    <Card.Title>Sign Up</Card.Title>
                    <Card.Text>
                        It's free to signup and only takes a minute.
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <div className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4"></div>
                    <Button
                        variant="primary"
                        className="btn-sign"
                        onClick={(e) => handleClick(e)}
                    >
                        Create Account
                    </Button>
                </Card.Body>
                <Card.Footer>
                    Already have an account?{' '}
                    <Link to="/signin-page">Sign In</Link>
                </Card.Footer>
            </Card>
        </div>
    );
}
