

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import MainPage from "../src/Pages/MainPage"
import SplashScreen from "../src/Pages/SplashScreen"
import Login from "../src/Components/Login"
import Profile from "../src/Components/DirectProfileChat"
import SocketConnection from '../src/Components/SocketConnection'
import Auth from '../src/Components/AuthContainer'
import Group from '../src/Components/GroupChat'




function App() {

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return false; // No token found
    }
  
    try {
      // Parse the token payload
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  
      // Check token expiration (if applicable)
      // Example: Check if token has expired
      const tokenExpired = Date.now() >= tokenPayload.exp * 1000;
  
      // Add any other validation logic here if needed
      
      return !tokenExpired; // Return true if token is not expired
    } catch (error) {
      console.error('Error validating token:', error);
      return false; // Return false if there's an error or token is invalid
    }
  };
  
  return (
    
    <div className="App">
      {/* <SocketConnection /> */}
        <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (<Navigate to="/splashScreen" />) : (<MainPage />)
          }
        />
        <Route path="/splashScreen" element={<SplashScreen />} />
       
      </Routes>
    </Router> 
      
       {/* <Auth /> */}
       {/* <Router>
        <Routes> 
         
          <Route path="/" element={<MainPage />} />
          <Route path="/splashScreen" element={<SplashScreen />} />
           <Login /> 
          <SplashScreen/>
           <SocketConnection /> 
            <Profile username={testUsername}  />  
         </Routes>
      </Router> */}
      {/* <header className="App-header">
        <MainPage />
        
      </header> */}
    </div>
  );
}

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import MainPage from "../src/Pages/MainPage";
// import SplashScreen from "../src/Pages/SplashScreen";
// import Login from "../src/Components/Login";
// import Profile from "../src/Components/DirectProfileChat";
// import SocketConnection from '../src/Components/SocketConnection';
// import Auth from '../src/Components/AuthContainer';

// // Function to check if a token exists and is valid
// const isAuthenticated = () => {
//   const token = localStorage.getItem('token');
  
//   if (!token) {
//     return false; // No token found
//   }

//   try {
//     // Parse the token payload
//     const tokenPayload = JSON.parse(atob(token.split('.')[1]));

//     // Check token expiration (if applicable)
//     // Example: Check if token has expired
//     const tokenExpired = Date.now() >= tokenPayload.exp * 1000;

//     // Add any other validation logic here if needed
    
//     return !tokenExpired; // Return true if token is not expired
//   } catch (error) {
//     console.error('Error validating token:', error);
//     return false; // Return false if there's an error or token is invalid
//   }
// };

// const Main = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             isAuthenticated() ? (
//               <Navigate to="/splashScreen" />
//             ) : (
//               <MainPage />
//             )
//           }
//         />
//         <Route path="/splashScreen" element={<SplashScreen />} />
//         {/* Add other routes as needed */}
//       </Routes>
//     </Router>
//   );
// };

// function App() {
//   // const testUsername = 'Bismah ju';
//   return (
//     <div className="App">
//       {/* <Auth /> */}
//       <Main />
//     </div>
//   );
// }

// export default App;
