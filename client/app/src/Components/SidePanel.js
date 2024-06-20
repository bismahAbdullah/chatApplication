
// import React, { useState } from 'react';
// import axios from 'axios';
// import '../styles/sidePanel.scss';
// import groupLogo from "../resources/icons/groupLogo.svg";
// import bubbleLogo from '../resources/icons/bubbleIconColoured.svg';
// import usericon from '../resources/icons/userIcon.svg'
// import { useBeforeUnload } from 'react-router-dom';
// import { getUsers, getProfileInfo } from '../services/users/sidePanel';


// const SidePanel = ({ onSelectUser }) => {
//     const [showDirectMessages, setShowDirectMessages] = useState(false);
//     const [showGroups, setShowGroups] = useState(false);
//     const [users, setUsers] = useState([]);

//     const toggleDirectMessages = async () => {
//         setShowDirectMessages(!showDirectMessages);

//         if (!showDirectMessages && users.length === 0) {
//             try {
//                 const usernames = await getUsers();
//                 const userProfiles = await Promise.all(usernames.map(async username => {
//                     const profileData = await getProfileInfo(username);
//                   //  console.log(profileData)
//                     return {
//                         username,
//                         profileData
//                         // profilePicture: profileData.profilePicture,
//                         // online_status: profileData.online_status,
//                     };
//                 }));
//         //    console.log(userProfiles)
//                 setUsers(userProfiles);
//                // console.log(users)
                
//             } catch (error) {
//                 console.error('Error fetching usernames:', error);
//             }
//         }
//     };

//     const toggleGroups = () => setShowGroups(!showGroups);
    

//     return (
//         <div className="side-panel">
//             <h2 className="side-panel-heading">QLU Recruiting</h2>
//             <hr className="side-panel-divider" />
            
//             <div className="side-panel-section">
//                 <img src={groupLogo} alt="Group Icon" className="side-panel-icon" />
//                 <span className="side-panel-text">Group</span>
//             </div>

//             <div className="side-panel-section">
//                 <img src={bubbleLogo} alt="Direct Messages Icon" className="side-panel-icon" />
//                 <span className="side-panel-text">Direct Messages</span>
//             </div>

//             <div className="side-panel-dropdown-section">
//                 <div onClick={toggleDirectMessages} className="dropdown-toggle">
//                     Direct Messages
//                 </div>
                
//                 {showDirectMessages && (
//                     <div className="dropdown-content">
//                         {users.length > 0 ? (
//                             users.map((user, index) => (
//                                 <div 
//                                     key={index} 
//                                     className="dropdown-item" 
//                                     onClick={() => onSelectUser(user.username)}>
//                                     <img src={usericon} alt={`${user.username}'s profile`} className="profile-picture" />
//                                     <span className="username">{user.username}</span>
//                                     <div className={`status-indicator ${user.profileData.profileData.online_status ? 'true' : 'false'}`}></div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="dropdown-item">No users found</div>
//                         )}
//                     </div>
//                 )}
//             </div>

//             <div className="side-panel-dropdown-section">
//                 <div onClick={toggleGroups} className="dropdown-toggle">
//                     Groups
//                 </div>
//                 {showGroups && (
//                     <div className="dropdown-content">
//                         <div className="dropdown-item">Group 1</div>
//                         <div className="dropdown-item">Group 2</div>
//                         <div className="dropdown-item">Group 3</div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SidePanel;
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/sidePanel.scss';
import groupLogo from "../resources/icons/groupLogo.svg";
import bubbleLogo from '../resources/icons/bubbleIconColoured.svg';
import usericon from '../resources/icons/userIcon.svg';
import { getUsers, getProfileInfo } from '../services/users/sidePanel';

const SidePanel = ({ onSelectUser, onSelectGroup }) => {
    const [showDirectMessages, setShowDirectMessages] = useState(false);
    const [showGroups, setShowGroups] = useState(false);
    const [users, setUsers] = useState([]);

    const toggleDirectMessages = async () => {
        setShowDirectMessages(!showDirectMessages);

        if (!showDirectMessages && users.length === 0) {
            try {
                const usernames = await getUsers();
                const userProfiles = await Promise.all(usernames.map(async username => {
                    const profileData = await getProfileInfo(username);
                    return {
                        username,
                        profileData
                    };
                }));
                setUsers(userProfiles);
            } catch (error) {
                console.error('Error fetching usernames:', error);
            }
        }
    };

    const toggleGroups = () => setShowGroups(!showGroups);

    return (
        <div className="side-panel">
            <h2 className="side-panel-heading">QLU Recruiting</h2>
            <hr className="side-panel-divider" />
            
            <div className="side-panel-section" onClick={toggleGroups}>
                <img src={groupLogo} alt="Group Icon" className="side-panel-icon" />
                <span className="side-panel-text">Groups</span>
            </div>

            <div className="side-panel-section" onClick={toggleDirectMessages}>
                <img src={bubbleLogo} alt="Direct Messages Icon" className="side-panel-icon" />
                <span className="side-panel-text">Direct Messages</span>
            </div>
            <div className="side-panel-dropdown-section">
            <div onClick={toggleDirectMessages} className="dropdown-toggle">
                     Direct Messages
                 </div>
            {showDirectMessages && (
                <div className="dropdown-content">
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <div 
                                key={index} 
                                className="dropdown-item" 
                                onClick={() => onSelectUser(user.username)}>
                                <img src={usericon} alt={`${user.username}'s profile`} className="profile-picture" />
                                <span className="username">{user.username}</span>
                                <div className={`status-indicator ${user.profileData.profileData.online_status ? 'true' : 'false'}`}></div>
                            </div>
                        ))
                    ) : (
                        <div className="dropdown-item">No users found</div>
                    )}
                </div>
            )}
            </div>
            <div className="side-panel-dropdown-section">
            <div onClick={toggleGroups} className="dropdown-toggle">
                     Groups
                 </div>

            {showGroups && (
                <div className="dropdown-content">
                    <div className="dropdown-item" onClick={() => onSelectGroup('Group 1')}>Group 1</div>
                    <div className="dropdown-item" onClick={() => onSelectGroup('Group 2')}>Group 2</div>
                    <div className="dropdown-item" onClick={() => onSelectGroup('Group 3')}>Group 3</div>
                </div>
            )}
        </div>
        </div>
    );
};

export default SidePanel;
