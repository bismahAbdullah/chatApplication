// // // Sidebar.jsx
// // import React from 'react';
// // import Button from './SideBarButton'; // Assuming you have a Button component
// // import '../styles/sideBar.scss';

// // import home from "../resources/home.svg"
// // import bell from "../resources/bell.svg"
// // import bubbleIcon from "../resources/bubbleIcon.svg"
// // import moreIcon from "../resources/moreIcon.svg"
// // import plusSign from "../resources/plusIcon.svg"
// // import userIcon from "../resources/userIcon.svg"
// // import pulseLogo from '../resources/pulseLogo.svg'

// // const Sidebar = () => {
// //     return (
        
// //         // <h1>akjlkdjaslkj</h1>
// //         <div  className="sidebar">
           
// //             <Button imageSrc={pulseLogo} text="" className="show"/>
// //             <Button imageSrc={home} text="Home" className="show"/>
// //             <Button imageSrc={bell} text="Activity" />
// //             <Button imageSrc={bubbleIcon} text="DMs" />
// //             <Button imageSrc={moreIcon} text="More" />
// //             <div className="end-buttons">
             
// //                 <Button imageSrc={plusSign} text="" />
// //                 <Button imageSrc={userIcon} text="Profile" />
// //             </div>
// //         </div>
// //     );
// // };

// // export default Sidebar;
// // Sidebar.jsx
// import React from 'react';
// import '../styles/sideBar.scss';

// import homeIcon from "../resources/icons/home.svg";
// import bellIcon from "../resources/icons/bell.svg";
// import bubbleIcon from "../resources/icons/bubbleIcon.svg";
// import moreIcon from "../resources/icons/moreIcon.svg";
// import plusIcon from "../resources/icons/plusIcon.svg";
// import userIcon from "../resources/icons/userIcon.svg";
// import pulseLogo from '../resources/icons/pulseLogo.svg';

// const Sidebar = () => {
//     return (
//         <div className="sidebar">
//             <button className="sidebar-button">
//                 <img src={pulseLogo} alt="Pulse Logo" />
//             </button>
//             <button className="sidebar-button">
//                 <img src={homeIcon} alt="Home" />
//                 <span>Home</span>
//             </button>
//             <button className="sidebar-button">
//                 <img src={bellIcon} alt="Bell" />
//                 <span>Activity</span>
//             </button>
//             <button className="sidebar-button">
//                 <img src={bubbleIcon} alt="Bubble" />
//                 <span>DMs</span>
//             </button>
//             <button className="sidebar-button">
//                 <img src={moreIcon} alt="More" />
//                 <span>More</span>
//             </button>
//             <div className="end-buttons">
//                 <button className="sidebar-button">
//                     <img src={plusIcon} alt="Plus" />
//                 </button>
//                 <button className="sidebar-button">
//                     <img src={userIcon} alt="User" />
//                     <span>Profile</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
import React  from 'react';
import '../styles/sideBar.scss';

import homeIcon from "../resources/icons/home.svg";
import bellIcon from "../resources/icons/bell.svg";
import bubbleIcon from "../resources/icons/bubbleIcon.svg";
import moreIcon from "../resources/icons/moreIcon.svg";
import plusIcon from "../resources/icons/plusIcon.svg";
import userIcon from "../resources/icons/userIcon.svg";
import pulseLogo from '../resources/icons/pulseLogo.svg';
import { useState } from 'react';
import Profile  from './ProfilePanel';

const Sidebar = ({ username }) => {
    const [showProfilePanel, setShowProfilePanel] = useState(false);

    const handleUsernameClick = () => {
        setShowProfilePanel(true);
      };
    
      const handleCloseProfilePanel = () => {
        setShowProfilePanel(false);
      };

    return (
        <div className="sidebar">
            <button className="sidebar-button">
                <img src={pulseLogo} alt="Pulse Logo" />
            </button>
            <button className="sidebar-button">
                <img src={homeIcon} alt="Home" />
                <span>Home</span>
            </button>
            <button className="sidebar-button">
                <img src={bellIcon} alt="Bell" />
                <span>Activity</span>
            </button>
            <button className="sidebar-button">
                <img src={bubbleIcon} alt="Bubble" />
                <span>DMs</span>
            </button>
            <button className="sidebar-button">
                <img src={moreIcon} alt="More" />
                <span>More</span>
            </button>
            <div className="end-buttons">
                <button className="sidebar-button">
                    <img src={plusIcon} alt="Plus" />
                </button>
                {username && (
                    <button className="sidebar-button"  onClick={handleUsernameClick}>
                        <img src={userIcon} alt="User" />
                        <span>{username}</span>
                    </button>
                )}
            </div>
            {showProfilePanel && (
        <div className="overlay">
          <Profile username={username} onClose={handleCloseProfilePanel} />
        </div>
      )}
        </div>
    );
};

export default Sidebar;
