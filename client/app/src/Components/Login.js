
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './Button';
import Signup from './SignUp';
import '../styles/Login.scss';
import {jwtDecode} from 'jwt-decode'
import {loginApi} from "../services/auth/login"

const Login = ({ onClose, onOpenSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [generalError, setGeneralError] = useState('');
    const [showSignup, setShowSignup] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);
        
        if (!validateEmail(value)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
        // setPasswordErrors(validatePassword(value));
    };

    const loginMutation = useMutation(
        async () => {
            try {
                const response = await loginApi(email,password);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        {
            onSuccess: (data) => {
                if (data && data.token) {
                    localStorage.setItem('token', data.token);
                    const user=jwtDecode(data.token);
                    console.log(`token ka data ${user}`)
                    //onClose(); // Close the Login component
                    navigate('/splashScreen'); 
                }
            },
            onError: (error) => {
                if (error.response && error.response.status === 404) {
                    setGeneralError('Endpoint not found. Please check the server.');
                } else {
                    setGeneralError('Email or password incorrect');
                }
            }
        }
    );

    const handleLogin = () => {
        if (!email || !password) {
            setGeneralError('Please fill in all fields');
            return;
        }

        if (emailError) {
            setGeneralError('Please correct the errors before logging in');
            return;
        }

        setGeneralError('');
        loginMutation.mutate();
    };

    const handleSignupClick = () => {
        setShowSignup(true); // Show the Signup component
    };

    const handleCloseSignup = () => {
        setShowSignup(false); // Close the Signup component
    };

    return (
        <div className='loginContainer'>
            <button className="closeButton" onClick={onClose}>X</button>
            <h1 style={{ color: '#06334D' }}>Login</h1>
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                />
                {emailError && <p className="error">{emailError}</p>}
            </div>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {passwordErrors.map((error, index) => (
                    <p key={index} className="error">{error}</p>
                ))}
                <a href="/forgot-password">Forgot Password?</a>
            </div>
            {generalError && <p className="error">{generalError}</p>}
            <Button label="Login" onClick={handleLogin} className="btn btn-primary" />
            <hr />
            <Button label="Create a new account" onClick={handleSignupClick} className="btn btn-primary" />
            {showSignup && <Signup onClose={handleCloseSignup} onOpenLogin={onOpenSignup} />}
        </div>
    );
};

export default Login;
