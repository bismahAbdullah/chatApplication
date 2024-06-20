
// import React, { useState } from 'react';
// import '../styles/MainPage.scss';
// import logo from '../resources/logo.svg';
// import MainImage from '../resources/MainPageImage.png';
// import Button from '../Components/Button';
// import Login from '../Components/Login';

// const MainPage = () => {
//     const [showLogin, setShowLogin] = useState(false);

//     const handleLoginClick = () => {
//         setShowLogin(true);
//     };

//     const handleCloseLogin = () => {
//         setShowLogin(false);
//     };

//     return (
//         <div className={`mainPageContainer ${showLogin ? 'blurred' : ''}`}>
//             <nav className="navbar navbar-expand-lg">
//                 <div className="container-fluid">
//                     <div className="d-flex align-items-center">
//                         <a className="navbar-brand" href="#" style={{ color: 'white', fontFamily: 'Saira Stencil One' }}>
//                             PULSE
//                         </a>
//                         <img src={logo} alt="Logo" style={{ width: '50px' }} />
//                     </div>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
//                         <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <a className="nav-link active" aria-current="page" href="#" style={{ fontFamily: 'Roboto' }}>Privacy</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" href="#" style={{ fontFamily: 'Roboto' }}>Help Center</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" href="#" style={{ fontFamily: 'Roboto' }}>Pulse Web</a>
//                             </li>
//                             <li className="nav-item dropdown">
//                                 <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                     Downloads
//                                 </a>
//                                 <ul className="dropdown-menu">
//                                     <li><a className="dropdown-item" href="#">Download for Mac</a></li>
//                                     <li><a className="dropdown-item" href="#">Download for Windows</a></li>
//                                 </ul>
//                             </li>
//                             <li style={{ margin: '0 20px', fontSize: '20px' }}>
//                                 <Button label="Try Pulse" className="btn btn-outline-success" />
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//             <div className='mainPageContent'>
//                 <div className='textDescription'>
//                     <h1>Communicate, Anywhere, Anytime</h1>
//                     <h3>Connect effortlessly across all devices with Pulse. Break free from limitations and redefine communication, anytime, anywhere.</h3>
//                     <div className='loginSignupButtons'>
//                         <Button label="Login" className="btn btn-primary" onClick={handleLoginClick} />
//                         <Button label="Sign up" className="btn btn-primary" />
//                     </div>
//                 </div>
//                 <div className='mainPageImage'>
//                     <img src={MainImage} alt="Logo" />
//                 </div>
//             </div>
//             {showLogin && <Login onClose={handleCloseLogin} />}
//         </div>
//     );
// };

// export default MainPage;
import React, { useState } from 'react';
import '../styles/MainPage.scss';
import logo from '../resources/icons/logo.svg';
import MainImage from '../resources/imgs/MainPageImage.png';
import Button from '../Components/Button';
import Login from '../Components/Login';
import Signup from "../Components/SignUp"
const MainPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false); // State for controlling Signup visibility

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleSignupClick = () => {
        setShowSignup(true); // Function to show the Signup component
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleCloseSignup = () => {
        setShowSignup(false); // Function to close the Signup component
    };

    return (
        <div className="mainPageWrapper">
            <div className={`mainPageContainer ${showLogin || showSignup ? 'blurred' : ''}`}>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center">
                            <a className="navbar-brand" href="#" style={{ color: 'white', fontFamily: 'Saira Stencil One' }}>
                                PULSE
                            </a>
                            <img src={logo} alt="Logo" style={{ width: '50px' }} />
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#" style={{ fontFamily: 'Roboto' }}>Privacy</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" style={{ fontFamily: 'Roboto' }}>Help Center</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" style={{ fontFamily: 'Roboto' }}>Pulse Web</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Downloads
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Download for Mac</a></li>
                                        <li><a className="dropdown-item" href="#">Download for Windows</a></li>
                                    </ul>
                                </li>
                                <li style={{ margin: '0 20px', fontSize: '20px' }}>
                                    <Button label="Try Pulse" className="btn btn-outline-success" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='mainPageContent'>
                    <div className='textDescription'>
                        <h1>Communicate, Anywhere, Anytime</h1>
                        <h3>Connect effortlessly across all devices with Pulse. Break free from limitations and redefine communication, anytime, anywhere.</h3>
                        <div className='loginSignupButtons'>
                            <Button label="Login" className="btn btn-primary" onClick={handleLoginClick} />
                            <Button label="Sign up" className="btn btn-primary" onClick={handleSignupClick}/>
                        </div>
                    </div>
                    <div className='mainPageImage'>
                        <img src={MainImage} alt="Logo" />
                    </div>
                </div>
            </div>
            {showLogin && <Login onClose={handleCloseLogin} />}
            {showSignup && <Signup onClose={handleCloseSignup} />} 
        </div>
    );
};

export default MainPage;
