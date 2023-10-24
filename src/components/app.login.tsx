'use client'

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const LoginSection = () => {

    const accounts = [
        { email: 'admin', password: 'admin' },
        { email: 'user', password: 'password' },
    ];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleLogin = () => {
        const loggedInAccount = accounts.find(account => account.email === email && account.password === password);

        if (loggedInAccount) {
            Cookies.set('isLoggedIn', 'true', {
                expires: 1,
                path: '/',
            });
            router.push('/');
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <>
            <div className='form-login mt-5 mb-5'>
                <h2 className='text-center'>Login Form</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleLogin}>
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default LoginSection;
