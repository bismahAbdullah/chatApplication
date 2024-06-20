import React, { useState } from 'react';
import Login from './Login';
import Signup from './SignUp';

const AuthenticationContainer = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showSignup, setShowSignup] = useState(false);

    const handleOpenSignup = () => {
        setShowLogin(false);
        setShowSignup(true);
    };

    const handleOpenLogin = () => {
        setShowSignup(false);
        setShowLogin(true);
    };

    return (
        <div className="authentication-container">
            {showLogin && <Login onClose={() => setShowLogin(false)} onOpenSignup={handleOpenSignup} />}
            {showSignup && <Signup onClose={() => setShowSignup(false)} onOpenLogin={handleOpenLogin} />}
        </div>
    );
};

export default AuthenticationContainer;
