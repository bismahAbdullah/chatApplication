
// // // export default Signup;

// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import Button from './Button';
// // import '../styles/Signup.scss';

// // const Signup = ({ onClose, onOpenLogin }) => {
// //     const [displayName, setDisplayName] = useState('');
// //     const [username, setUsername] = useState('');
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [displayNameInfoVisible, setDisplayNameInfoVisible] = useState(false);
// //     const [usernameInfoVisible, setUsernameInfoVisible] = useState(false);
// //     const [emailError, setEmailError] = useState('');
// //     const [passwordErrors, setPasswordErrors] = useState([]);
// //     const [usernameAvailable, setUsernameAvailable] = useState(true);
// //     const [formErrors, setFormErrors] = useState('');

// //     const validateEmail = (email) => {
// //         const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// //         return re.test(String(email).toLowerCase());
// //     };

// //     const validatePassword = (password) => {
// //         const errors = [];

// //         if (password.length < 7) {
// //             errors.push('Password must be at least 7 characters long');
// //         }
// //         if (!/[A-Z]/.test(password)) {
// //             errors.push('Password must contain at least one capital letter');
// //         }
// //         if (!/\d/.test(password)) {
// //             errors.push('Password must contain at least one numeric digit');
// //         }
// //         if (!/[@$!%*?&]/.test(password)) {
// //             errors.push('Password must contain at least one symbol');
// //         }

// //         return errors;
// //     };

// //     const handleDisplayNameChange = (e) => {
// //         const { value } = e.target;
// //         setDisplayName(value);
// //         setDisplayNameInfoVisible(true);
// //     };

// //     const handleUsernameChange = (e) => {
// //         const { value } = e.target;
// //         setUsername(value);
// //         setUsernameInfoVisible(true);
// //         setUsernameAvailable(true); // Reset availability status on change
// //     };

// //     const handleEmailChange = (e) => {
// //         const { value } = e.target;
// //         setEmail(value);
// //         if (!validateEmail(value)) {
// //             setEmailError('Invalid email address');
// //         } else {
// //             setEmailError('');
// //         }
// //     };

// //     const handlePasswordChange = (e) => {
// //         const { value } = e.target;
// //         setPassword(value);
// //         setPasswordErrors(validatePassword(value));
// //     };

// //     const checkUsernameAvailability = async () => {
// //         try {
// //             const response = await axios.post('http://localhost:3001/user/signup', { username });
// //             if (response === 'Username already exists') {
// //                 setFormErrors('Username is not unique');
// //                 setUsernameAvailable(false);
// //             } else {
// //                 setUsernameAvailable(true);
// //             }
// //         } catch (error) {
// //             console.error('Error checking username availability', error);
// //         }
// //     };

// //     const handleSignup = async () => {
// //         if (!displayName || !username || !email || !password) {
// //             setFormErrors('All fields must be filled out');
// //             return;
// //         }

// //         if (emailError || passwordErrors.length > 0 || !usernameAvailable) {
// //             setFormErrors('Please correct the errors before submitting');
// //             return;
// //         }

// //         try {
// //             const response = await axios.post('http://localhost:3001/user/signup', { email, password, displayName, username });
// //             if (response.status === 201) {
               
// //                 alert('Signup successful! Check your email for confirmation.');
// //             } else {
// //                 setFormErrors('Signup failed. Please try again.');
// //             }
// //         } catch (error) {
// //             // console.error('Error during signup', error);
// //             // setFormErrors('Signup failed. Please try again.');
// //             console.error('Error during signup', error);
// //     if (error.response && error.response.data.error === 'Username already exists') {
// //         setFormErrors('Username is not unique');
// //     } else {
// //         setFormErrors('Signup failed. Please try again.');
// //     }
// //         }
// //     };

// //     return (
// //         <div className='signupContainer'>
// //             <button className="closeButton" onClick={onClose}>X</button>
// //             <h1 style={{ color: '#06334D' }}>Signup</h1>
// //             <div className="form-group">
// //                 <input
// //                     type="text"
// //                     className="form-control"
// //                     placeholder="Display Name"
// //                     value={displayName}
// //                     onChange={handleDisplayNameChange}
// //                 />
// //                 {displayNameInfoVisible && <p className="info">This is how other people see you. You can use special characters & emojis</p>}
// //             </div>
// //             <div className="form-group">
// //                 <input
// //                     type="text"
// //                     className="form-control"
// //                     placeholder="Username"
// //                     value={username}
// //                     onChange={handleUsernameChange}
// //                     onBlur={checkUsernameAvailability}
// //                 />
// //                 {usernameInfoVisible && <p className="info">Please only use numbers, letters, underscores, or periods.</p>}
// //                 {!usernameAvailable && <p className="error">Username not available</p>}
// //             </div>
// //             <div className="form-group">
// //                 <input
// //                     type="email"
// //                     className="form-control"
// //                     placeholder="Enter email"
// //                     value={email}
// //                     onChange={handleEmailChange}
// //                 />
// //                 {emailError && <p className="error">{emailError}</p>}
// //             </div>
// //             <div className="form-group">
// //                 <input
// //                     type="password"
// //                     className="form-control"
// //                     placeholder="Password"
// //                     value={password}
// //                     onChange={handlePasswordChange}
// //                 />
// //                 {passwordErrors.map((error, index) => (
// //                     <p key={index} className="error">{error}</p>
// //                 ))}
// //             </div>
// //             {formErrors && <p className="error">{formErrors}</p>}
// //             <Button label="Signup" className="btn btn-primary" onClick={handleSignup} />
// //             <hr />
// //             <Button label="Already have an account?" className="btn btn-primary" onClick={onOpenLogin} />
// //         </div>
// //     );
// // };

// // export default Signup;
// import React, { useState } from 'react';
// import axios from 'axios';
// import Button from './Button';
// import '../styles/Signup.scss';

// const Signup = ({ onClose, onOpenLogin }) => {
//     const [displayName, setDisplayName] = useState('');
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [displayNameInfoVisible, setDisplayNameInfoVisible] = useState(false);
//     const [usernameInfoVisible, setUsernameInfoVisible] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordErrors, setPasswordErrors] = useState([]);
//     const [usernameAvailable, setUsernameAvailable] = useState(true);
//     const [formErrors, setFormErrors] = useState('');

//     const validateEmail = (email) => {
//         const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         return re.test(String(email).toLowerCase());
//     };

//     const validatePassword = (password) => {
//         const errors = [];

//         if (password.length < 7) {
//             errors.push('Password must be at least 7 characters long');
//         }
//         if (!/[A-Z]/.test(password)) {
//             errors.push('Password must contain at least one capital letter');
//         }
//         if (!/\d/.test(password)) {
//             errors.push('Password must contain at least one numeric digit');
//         }
//         if (!/[@$!%*?&]/.test(password)) {
//             errors.push('Password must contain at least one symbol');
//         }

//         return errors;
//     };

//     const handleDisplayNameChange = (e) => {
//         const { value } = e.target;
//         setDisplayName(value);
//         setDisplayNameInfoVisible(true);
//     };

//     const handleUsernameChange = (e) => {
//         const { value } = e.target;
//         setUsername(value);
//         setUsernameInfoVisible(true);
//         setUsernameAvailable(true); // Reset availability status on change
//         setFormErrors(''); // Clear any form errors when the username changes
//     };

//     const handleEmailChange = (e) => {
//         const { value } = e.target;
//         setEmail(value);
//         if (!validateEmail(value)) {
//             setEmailError('Invalid email address');
//         } else {
//             setEmailError('');
//         }
//     };

//     const handlePasswordChange = (e) => {
//         const { value } = e.target;
//         setPassword(value);
//         setPasswordErrors(validatePassword(value));
//     };

//     const checkUsernameAvailability = async () => {
//         try {
//             const response = await axios.post(`${process.env.API_BASE_URL}/user/signup`, { username });
//             if (response === 'Username already exists') {
//                 setFormErrors('Username is not unique');
//                 setUsernameAvailable(false);
//             }
//             else if (response === 'Email already registered'){
//                 setFormErrors('Email is already registered!');
//                 setUsernameAvailable(false);

//             } 
//             else {
//                 setUsernameAvailable(true);
//             }
//         } catch (error) {
//             console.error('Error checking username availability', error);
//         }
//     };

//     const handleSignup = async () => {
//         if (!displayName || !username || !email || !password) {
//             setFormErrors('All fields must be filled out');
//             return;
//         }

//         if (emailError || passwordErrors.length > 0 || !usernameAvailable) {
//             setFormErrors('Please correct the errors before submitting');
//             return;
//         }

//         try {
//             const response = await axios.post(`${process.env.API_BASE_URL}/user/signup`, { email, password, displayName, username });
//             if (response.status === 201) {
//                 alert('Signup successful! Check your email for confirmation.');

//                 // Clear form fields after successful signup
//                 setDisplayName('');
//                 setUsername('');
//                 setEmail('');
//                 setPassword('');
//                 // Clear form errors after successful signup
//                 setFormErrors('');
//                 onClose();
//             } else {
//                 setFormErrors('Signup failed. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error during signup', error);
//             if (error.response && error.response.data.error === 'Username already exists') {
//                 setFormErrors('Username is not unique');
//             } else {
//                 setFormErrors('Signup failed. Please try again.');
//             }
//         }
//     };

//     return (
//         <div className='signupContainer'>
//             <button className="closeButton" onClick={onClose}>X</button>
//             <h1 style={{ color: '#06334D' }}>Signup</h1>
//             <div className="form-group">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Display Name"
//                     value={displayName}
//                     onChange={handleDisplayNameChange}
//                 />
//                 {displayNameInfoVisible && <p className="info">This is how other people see you. You can use special characters & emojis</p>}
//             </div>
//             <div className="form-group">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Username"
//                     value={username}
//                     onChange={handleUsernameChange}
//                     onBlur={checkUsernameAvailability}
//                 />
//                 {usernameInfoVisible && <p className="info">Please only use numbers, letters, underscores, or periods.</p>}
//                 {!usernameAvailable && <p className="error">Username not available</p>}
//             </div>
//             <div className="form-group">
//                 <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={handleEmailChange}
//                 />
//                 {emailError && <p className="error">{emailError}</p>}
//             </div>
//             <div className="form-group">
//                 <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                 />
//                 {passwordErrors.map((error, index) => (
//                     <p key={index} className="error">{error}</p>
//                 ))}
//             </div>
//             {formErrors && <p className="error">{formErrors}</p>}
//             <Button label="Signup" className="btn btn-primary" onClick={handleSignup} />
//             <hr />
//             <Button label="Already have an account?" className="btn btn-primary" onClick={onOpenLogin} />
//         </div>
//     );
// };

// export default Signup;
import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import '../styles/Signup.scss';
import {checkUsernameAvailability,signUpAPi} from '../services/auth/signup'

const Signup = ({ onClose, onOpenLogin }) => {
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayNameInfoVisible, setDisplayNameInfoVisible] = useState(false);
    const [usernameInfoVisible, setUsernameInfoVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [formErrors, setFormErrors] = useState('');

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const errors = [];

        if (password.length < 7) {
            errors.push('Password must be at least 7 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one capital letter');
        }
        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one numeric digit');
        }
        if (!/[@$!%*?&]/.test(password)) {
            errors.push('Password must contain at least one symbol');
        }

        return errors;
    };

    const handleDisplayNameChange = (e) => {
        const { value } = e.target;
        setDisplayName(value);
        setDisplayNameInfoVisible(true);
    };

    const handleUsernameChange = (e) => {
        const { value } = e.target;
        setUsername(value);
        setUsernameInfoVisible(true);
        setUsernameAvailable(true); // Reset availability status on change
        setFormErrors(''); // Clear any form errors when the username changes
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
        setPasswordErrors(validatePassword(value));
    };

    const checkUsernameAvailability = async () => {
        try {
            const response = await checkUsernameAvailability(username);
            if (response === 'Username already exists') {
                setFormErrors('Username is not unique');
                setUsernameAvailable(false);
            }
            else if (response === 'Email already registered'){
                setFormErrors('Email is already registered!');
                setUsernameAvailable(false);

            } 
            else {
                setUsernameAvailable(true);
            }
        } catch (error) {
            console.error('Error checking username availability', error);
        }
    };

    const handleSignup = async () => {
        if (!displayName || !username || !email || !password) {
            setFormErrors('All fields must be filled out');
            return;
        }

        if (emailError || passwordErrors.length > 0 || !usernameAvailable) {
            setFormErrors('Please correct the errors before submitting');
            return;
        }

        try {
            const response = await signUpAPi(email,password,displayName,username);
            if (response.status === 201) {
                alert('Signup successful! Check your email for confirmation.');

                // Clear form fields after successful signup
                setDisplayName('');
                setUsername('');
                setEmail('');
                setPassword('');
                // Clear form errors after successful signup
                setFormErrors('');
                onClose();
            } else {
                setFormErrors('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during signup', error);
            if (error.response && error.response.data.error === 'Username already exists') {
                setFormErrors('Username is not unique');
            } else {
                setFormErrors('Signup failed. Please try again.');
            }
        }
    };

    return (
        <div className='signupContainer'>
            <button className="closeButton" onClick={onClose}>X</button>
            <h1 style={{ color: '#06334D' }}>Signup</h1>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Display Name"
                    value={displayName}
                    onChange={handleDisplayNameChange}
                />
                {displayNameInfoVisible && <p className="info">This is how other people see you. You can use special characters & emojis</p>}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    onBlur={checkUsernameAvailability}
                />
                {usernameInfoVisible && <p className="info">Please only use numbers, letters, underscores, or periods.</p>}
                {!usernameAvailable && <p className="error">Username not available</p>}
            </div>
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
            </div>
            {formErrors && <p className="error">{formErrors}</p>}
            <Button label="Signup" className="btn btn-primary" onClick={handleSignup} />
            <hr />
            <Button label="Already have an account?" className="btn btn-primary" onClick={onOpenLogin} />
        </div>
    );
};

export default Signup;
