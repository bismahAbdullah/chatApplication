
// // import React from 'react';
// // import { Form } from 'react-bootstrap';
// // import SideBar from '../Components/SideBar';
// // import SidePanel from '../Components/SidePanel';
// // import '../styles/splashScreen.scss';
// // import mainImage from '../resources/imgs/splashScreenLogo.svg'

// // const SplashScreen = () => {
// //     return (
// //         <div className="main-container">
// //             <div className="top-div">
// //                 <Form.Control
// //                     type="text"
// //                     placeholder="Search QLU Recruiting"
// //                     className="custom-textfield"
// //                 />
// //             </div>
// //             <div className="content-div">
// //                 <div className="sidebar-div">
// //                     <SideBar />
// //                 </div>
// //                 <div className="sidepanel-div">
// //                     <SidePanel />
// //                 </div>
// //                 <div className="main-content-div">
// //                     {/* Main content goes here */}
// //                     <img src={mainImage}></img>
// //                     <h2>Pulse</h2>
// //                     <h3>Connect, Communicate, Create</h3>
// //                     <h3>Your Journey with Pulse begins here!</h3>
                    

// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default SplashScreen;
// import React, { useState } from 'react';
// import { Form } from 'react-bootstrap';
// import SideBar from '../Components/SideBar';
// import SidePanel from '../Components/SidePanel';
// import DirectProfileChat from '../Components/DirectProfileChat';
// import '../styles/splashScreen.scss';
// import mainImage from '../resources/imgs/splashScreenLogo.svg';

// const SplashScreen = () => {
//     const [selectedUser, setSelectedUser] = useState(null);

//     const handleSelectUser = (username) => {
//         setSelectedUser(username);
//     };

//     return (
//         <div className="main-container">
//             <div className="top-div">
//                 <Form.Control
//                     type="text"
//                     placeholder="Search QLU Recruiting"
//                     className="custom-textfield"
//                 />
//             </div>
//             <div className="content-div">
//                 <div className="sidebar-div">
//                     <SideBar />
//                 </div>
//                 <div className="sidepanel-div">
//                     <SidePanel onSelectUser={handleSelectUser} />
//                 </div>
//                 <div className="main-content-div1">
//                     {selectedUser ? (
//                         <DirectProfileChat username={selectedUser} className="direct-profile-chat"/>
//                     ) : (
//                         <>
//                             <img src={mainImage} alt="Splash Screen" />
//                             <h2>Pulse</h2>
//                             <h3>Connect, Communicate, Create</h3>
//                             <h3>Your Journey with Pulse begins here!</h3>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SplashScreen;
// import React, { useState, useEffect ,useRef} from 'react';
// import { Form } from 'react-bootstrap';
// import SideBar from '../Components/SideBar';
// import SidePanel from '../Components/SidePanel';
// import DirectProfileChat from '../Components/DirectProfileChat';
// import axios from 'axios';
// import '../styles/splashScreen.scss';
// import mainImage from '../resources/imgs/splashScreenLogo.svg';
// import { Navigate, useLocation, useNavigate} from 'react-router-dom'


// const SplashScreen = () => {
//     // const {state}=useLocation();
//     // console.log(state)
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [username, setUsername] = useState(null);
//    // const [user,setUser]=useState(null)
//     const [isConnected,setIsConnected]=useState();
//     const navigate= useNavigate();
//     const socketRef=useRef();
//     const parseJwt = (token) => {
//         try {
//           // Split the token into its parts
//           const base64Url = token.split('.')[1];
//           // Decode the Base64Url encoded string
//           const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//           // Parse the JSON payload
//           const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//           }).join(''));
      
//           return JSON.parse(jsonPayload);
//         } catch (e) {
//           console.error('Failed to parse JWT:', e);
//           return null;
//         }
//       };
//       const getUser = () => {
//         const token = localStorage.getItem('token');
//        // console.log(token)
//         if (!token) {
//           return null;
//         }
      
//         const payload = parseJwt(token);
//         console.log(payload)
//         if (payload && payload.user) {
//             //setUser(payload.user)
//            // console.log(user)
//           return payload.user;
//           // Adjust according to your JWT structure
//         }
     
//         return null;
//       };

//       useEffect(()=>{
//         const user=getUser();
// console.log(user)
//         setUsername(user.username)
//         console.log(username)
//       },[])
    

    

//    // useEffect(() => {
//         // const fetchUsername = async () => {
//         //     try {
//         //         const response = await axios.get('http://localhost:3002/user/getUsername', {
//         //             headers: {
//         //                 Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
//         //             }
//         //         });
//         //         setUsername(response.data.username);
//         //     } catch (error) {
//         //         console.error('Error fetching username:', error);
//         //         setUsername(null); // Handle error gracefully
//         //     }
//         // };

//         // fetchUsername();
//     //}, []);

//     const handleSelectUser = (username) => {
//         setSelectedUser(username);
//     };

//     return (
//         <div className="main-container">
//             <div className="top-div">
//                 <Form.Control
//                     type="text"
//                     placeholder="Search QLU Recruiting"
//                     className="custom-textfield"
//                 />
//             </div>
//             <div className="content-div">
//                 <div className="sidebar-div">
//                     <SideBar username={username} />
//                 </div>
//                 <div className="sidepanel-div">
//                     <SidePanel onSelectUser={handleSelectUser} />
//                 </div>
//                 <div className="main-content-div1">
//                     {selectedUser ? (
//                         <DirectProfileChat username={selectedUser} className="direct-profile-chat" />
//                     ) : (
//                         <>
//                             <img src={mainImage} alt="Splash Screen" />
//                             <h2>Pulse</h2>
//                             <h3>Connect, Communicate, Create</h3>
//                             <h3>Your Journey with Pulse begins here!</h3>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SplashScreen;
import React, { useState, useEffect ,useRef} from 'react';
import { Form } from 'react-bootstrap';
import SideBar from '../Components/SideBar';
import SidePanel from '../Components/SidePanel';
import DirectProfileChat from '../Components/DirectProfileChat';
import GroupChat from '../Components/GroupChat';
import axios from 'axios';
import '../styles/splashScreen.scss';
import mainImage from '../resources/imgs/splashScreenLogo.svg';
import { Navigate, useLocation, useNavigate} from 'react-router-dom';

const SplashScreen = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();
    const socketRef = useRef();

    const parseJwt = (token) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          return JSON.parse(jsonPayload);
        } catch (e) {
          console.error('Failed to parse JWT:', e);
          return null;
        }
      };

    const getUser = () => {
        const token = localStorage.getItem('token');
        if (!token) {
          return null;
        }
        const payload = parseJwt(token);
        if (payload && payload.user) {
          return payload.user;
        }
        return null;
      };

      useEffect(() => {
        const user = getUser();
        setUsername(user?.username);
      }, []);
    
    const handleSelectUser = (username) => {
        setSelectedUser(username);
        setSelectedGroup(null);
    };

    const handleSelectGroup = (groupId) => {
        setSelectedGroup(groupId);
        setSelectedUser(null);
    };

    return (
        <div className="main-container">
            <div className="top-div">
                <Form.Control
                    type="text"
                    placeholder="Search QLU Recruiting"
                    className="custom-textfield"
                />
            </div>
            <div className="content-div">
                <div className="sidebar-div">
                    <SideBar username={username} />
                </div>
                <div className="sidepanel-div">
                    <SidePanel 
                        onSelectUser={handleSelectUser} 
                        onSelectGroup={handleSelectGroup} 
                    />
                </div>
                <div className="main-content-div1">
                    {selectedUser ? (
                        <DirectProfileChat username={selectedUser} className="direct-profile-chat" />
                    ) : selectedGroup ? (
                        <GroupChat groupId={selectedGroup} className="group-chat" />
                    ) : (
                        <>
                            <img src={mainImage} alt="Splash Screen" />
                            <h2>Pulse</h2>
                            <h3>Connect, Communicate, Create</h3>
                            <h3>Your Journey with Pulse begins here!</h3>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
