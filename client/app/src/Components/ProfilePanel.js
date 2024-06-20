// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import '../styles/profilePanel.scss';
// // // import userIcon from '../resources/icons/userIcon.svg'

// // // const Profile = ({ username, onClose }) => {
// // //   const [profileData, setProfileData] = useState(null);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchProfileData = async () => {
// // //       try {
// // //         const response = await axios.get(`http://localhost:3002/profile/getProfileInfo/${username}`);
// // //         setProfileData(response.data);
// // //       } catch (error) {
// // //         setError('Error fetching profile data');
// // //         setProfileData({
// // //           userData: { username: 'null', email: 'null' },
// // //           profileData: { profile_picture: 'null', mobile_number: 'null', profile_description: 'null' }
// // //         });
// // //       }
// // //     };

// // //     fetchProfileData();
// // //   }, [username]);

// // //   return (
// // //     <div className="profile-containerp">
// // //       <div className="profile-headerp">
// // //         <h1>Profile</h1>
// // //         <button className="close-buttonp" onClick={onClose}>×</button>
// // //       </div>
// // //       {profileData ? (
// // //         <>
// // //           <div className="profile-picture-containerp">
// // //             <img
// // //               src={userIcon}
// // //               alt="Profile"
// // //               className="profile-picturep"
// // //             />
// // //           </div>
// // //           <div className="profile-infop">
// // //             <div className="username-sectionp">
// // //               <span className="usernamep">{profileData.userData.username}</span>
// // //               <button className="edit-buttonp">Edit</button>
// // //             </div>
// // //             <div className="profile-descriptionp">
// // //               {profileData.profileData.profile_description}
// // //             </div>
// // //             <div className="emailp">{profileData.userData.displayName}</div>
// // //             <hr />
// // //             <div className="contact-infop">
// // //               <div className="email-sectionp">
// // //                 <span className="labelp">Email:</span>
// // //                 <span className="valuep">{profileData.userData.email}</span>
// // //               </div>
// // //               <div className="phone-sectionp">
// // //                 <span className="labelp">Phone Number:</span>
// // //                 <span className="valuep">{profileData.profileData.mobile_number}</span>
// // //               </div>
// // //               <button  style={{ marginLeft: '408px' }} className="edit-buttonp">Edit</button>
// // //             </div>
// // //           </div>
// // //         </>
// // //       ) : (
// // //         <div>{error || 'Loading...'}</div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Profile;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import '../styles/profilePanel.scss';
// // import userIcon from '../resources/icons/userIcon.svg'

// // const Profile = ({ username, onClose }) => {
// //   const [profileData, setProfileData] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [editingProfile, setEditingProfile] = useState(false);
// //   const [editingContact, setEditingContact] = useState(false);
// //   const [formData, setFormData] = useState({
// //     displayName: '',
// //     updatedUsername: '',
// //     profileDescription: '',
// //     email: '',
// //     phoneNumber: ''
// //   });

// //   useEffect(() => {
// //     const fetchProfileData = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:3002/profile/getProfileInfo/${username}`);
// //         setProfileData(response.data);
// //         setFormData({
// //           displayName: response.data.userData.displayName,
// //           updatedUsername: response.data.userData.username,
// //           profileDescription: response.data.profileData.profile_description,
// //           email: response.data.userData.email,
// //           phoneNumber: response.data.profileData.mobile_number
// //         });
// //       } catch (error) {
// //         setError('Error fetching profile data');
// //         setProfileData({
// //           userData: { username: 'null', email: 'null' },
// //           profileData: { profile_picture: 'null', mobile_number: 'null', profile_description: 'null' }
// //         });
// //       }
// //     };

// //     fetchProfileData();
// //   }, [username]);

// //   const handleEditProfile = () => {
// //     setEditingProfile(true);
// //   };

// //   const handleEditContact = () => {
// //     setEditingContact(true);
// //   };

// //   const handleSaveProfile = async () => {
// //     try {
// //       const response = await axios.put(`http://localhost:3002/profile/updateProfileInfo/${username}`, {
// //         displayName: formData.displayName,
// //         updatedUsername: formData.updatedUsername,
// //         profileDescription: formData.profileDescription
// //       });
// //       console.log('Profile updated successfully:', response.data);
// //       setEditingProfile(false);
// //     } catch (error) {
// //       console.error('Error updating profile:', error);
// //       // Handle error gracefully
// //     }
// //   };

// //   const handleSaveContact = async () => {
// //     try {
// //       const response = await axios.put(`http://localhost:3002/profile/updateContactInfo/${username}`, {
// //         email: formData.email,
// //         phoneNumber: formData.phoneNumber
// //       });
// //       console.log('Contact info updated successfully:', response.data);
// //       setEditingContact(false);
// //     } catch (error) {
// //       console.error('Error updating contact info:', error);
// //       // Handle error gracefully
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   return (
// //     <div className="profile-containerp">
// //       <div className="profile-headerp">
// //         <h1>Profile</h1>
// //         <button className="close-buttonp" onClick={onClose}>×</button>
// //       </div>
// //       {profileData ? (
// //         <>
// //           <div className="profile-picture-containerp">
// //             <img
// //               src={userIcon}
// //               alt="Profile"
// //               className="profile-picturep"
// //             />
// //           </div>
// //           <div className="profile-infop">
// //             <div className="username-sectionp">
// //               <span className="usernamep">{profileData.userData.username}</span>
// //               <button className="edit-buttonp" onClick={handleEditProfile}>Edit</button>
// //             </div>
// //             <div className="profile-descriptionp">
// //               {profileData.profileData.profile_description}
// //             </div>
// //             <div className="emailp">{profileData.userData.displayName}</div>
// //             <hr />
// //             <div className="contact-infop">
// //               <div className="email-sectionp">
// //                 <span className="labelp">Email:</span>
// //                 <span className="valuep">{profileData.userData.email}</span>
// //               </div>
// //               <div className="phone-sectionp">
// //                 <span className="labelp">Phone Number:</span>
// //                 <span className="valuep">{profileData.profileData.mobile_number}</span>
// //               </div>
// //               <button className="edit-buttonp" onClick={handleEditContact}>Edit</button>
// //             </div>
// //           </div>
// //         </>
// //       ) : (
// //         <div>{error || 'Loading...'}</div>
// //       )}

// //       {/* Edit Profile Form */}
// //       {editingProfile && (
// //         <div className="edit-profile-form">
// //           <input
// //             type="text"
// //             name="displayName"
// //             value={formData.displayName}
// //             onChange={handleChange}
// //             placeholder="Display Name"
// //           />
// //           <input
// //             type="text"
// //             name="updatedUsername"
// //             value={formData.updatedUsername}
// //             onChange={handleChange}
// //             placeholder="Username"
// //             disabled
// //           />
// //           <textarea
// //             name="profileDescription"
// //             value={formData.profileDescription}
// //             onChange={handleChange}
// //             placeholder="Profile Description"
// //           />
// //           <div className="button-container">
// //             <button className="secondary-button" onClick={() => setEditingProfile(false)}>Cancel</button>
// //             <button className="primary-button" onClick={handleSaveProfile}>Save Changes</button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Edit Contact Info Form */}
// //       {editingContact && (
// //         <div className="edit-contact-form">
// //           <input
// //             type="text"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             placeholder="Email Address"
// //           />
// //           <input
// //             type="text"
// //             name="phoneNumber"
// //             value={formData.phoneNumber}
// //             onChange={handleChange}
// //             placeholder="Phone Number"
// //           />
// //           <div className="button-container">
// //             <button className="secondary-button" onClick={() => setEditingContact(false)}>Cancel</button>
// //             <button className="primary-button" onClick={handleSaveContact}>Save Changes</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Profile;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/profilePanel.scss';
// import userIcon from '../resources/icons/userIcon.svg';

// const Profile = ({ username, onClose }) => {
//   const [profileData, setProfileData] = useState(null);
//   const [error, setError] = useState(null);
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [editingContact, setEditingContact] = useState(false);
//   const [formData, setFormData] = useState({
//     displayName: '',
//     updatedUsername: '',
//     profileDescription: '',
//     email: '',
//     phoneNumber: ''
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3002/profile/getProfileInfo/${username}`);
//         setProfileData(response.data);
//         setFormData({
//           displayName: response.data.userData.displayName,
//           updatedUsername: response.data.userData.username,
//           profileDescription: response.data.profileData.profile_description,
//           email: response.data.userData.email,
//           phoneNumber: response.data.profileData.mobile_number
//         });
//       } catch (error) {
//         setError('Error fetching profile data');
//         setProfileData({
//           userData: { username: 'null', email: 'null' },
//           profileData: { profile_picture: 'null', mobile_number: 'null', profile_description: 'null' }
//         });
//       }
//     };

//     fetchProfileData();
//   }, [username]);

//   const handleEditProfile = () => {
//     setEditingProfile(true);
//   };

//   const handleEditContact = () => {
//     setEditingContact(true);
//   };

//   const handleSaveProfile = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3002/profile/updateProfile/${username}`, {
//         displayName: formData.displayName,
//         updatedUsername: formData.updatedUsername,
//         profileDescription: formData.profileDescription
//       });
//       console.log('Profile updated successfully:', response.data);
//       setEditingProfile(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       // Handle error gracefully
//     }
//   };

//   const handleSaveContact = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3002/profile/updateProfileEmail/${username}`, {
//         email: formData.email,
//         phoneNumber: formData.phoneNumber
//       });
//       console.log('Contact info updated successfully:', response.data);
//       setEditingContact(false);
//     } catch (error) {
//       console.error('Error updating contact info:', error);
//       // Handle error gracefully
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Clear token from localStorage
//     navigate('/'); // Redirect to main page
//   };

//   return (
//     <div className="profile-containerp">
//       <div className="profile-headerp">
//         <h1>Profile</h1>
//         <button className="close-buttonp" onClick={onClose}>×</button>
//       </div>
//       {profileData ? (
//         <>
//           <div className="profile-picture-containerp">
//             <img
//               src={userIcon}
//               alt="Profile"
//               className="profile-picturep"
//             />
//           </div>
//           <div className="profile-infop">
//             <div className="username-sectionp">
//               <span className="usernamep">{profileData.userData.username}</span>
//               <button className="edit-buttonp" onClick={handleEditProfile}>Edit</button>
//             </div>
//             <div className="profile-descriptionp">
//               {profileData.profileData.profile_description}
//             </div>
//             <div className="emailp">{profileData.userData.displayName}</div>
//             <hr />
//             <div className="contact-infop">
//               <div className="email-sectionp">
//                 <span className="labelp">Email:</span>
//                 <span className="valuep">{profileData.userData.email}</span>
//               </div>
//               <div className="phone-sectionp">
//                 <span className="labelp">Phone Number:</span>
//                 <span className="valuep">{profileData.profileData.mobile_number}</span>
//               </div>
//               <button className="edit-buttonp" onClick={handleEditContact}>Edit</button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div>{error || 'Loading...'}</div>
//       )}

//       {/* Edit Profile Form */}
//       {editingProfile && (
//         <div className="edit-profile-form overlay">
//           <div className="edit-profile-form-content">
//             <h2>Edit Profile Info</h2>
//             <hr />
//             <div className="input-group">
//               <label htmlFor="displayName">Display Name</label>
//               <input
//                 type="text"
//                 name="displayName"
//                 value={formData.displayName}
//                 onChange={handleChange}
//                 placeholder="Display Name"
//               />
//             </div>
//             <div className="input-group">
//               <label htmlFor="updatedUsername">Username</label>
//               <input
//                 type="text"
//                 name="updatedUsername"
//                 value={formData.updatedUsername}
//                 onChange={handleChange}
//                 placeholder="Username"
//                 disabled
//               />
//             </div>
//             <div className="input-group">
//               <label htmlFor="profileDescription">Profile Description</label>
//               <textarea
//                 name="profileDescription"
//                 value={formData.profileDescription}
//                 onChange={handleChange}
//                 placeholder="Profile Description"
//               />
//             </div>
//             <div className="button-container">
//               <button className="secondary-button" onClick={() => setEditingProfile(false)}>Cancel</button>
//               <button className="primary-button" onClick={handleSaveProfile}>Save Changes</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Contact Info Form */}
//       {editingContact && (
//         <div className="edit-contact-form overlay">
//           <div className="edit-contact-form-content">
//             <h2>Edit Contact Info</h2>
//             <hr />
//             <div className="input-group">
//               <label htmlFor="email">Email Address</label>
//               <input
//                 type="text"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email Address"
//               />
//             </div>
//             <div className="input-group">
//               <label htmlFor="phoneNumber">Phone Number</label>
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 placeholder="Phone Number"
//               />
//             </div>
//             <div className="button-container">
//               <button className="secondary-button" onClick={() => setEditingContact(false)}>Cancel</button>
//               <button className="primary-button" onClick={handleSaveContact}>Save Changes</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Logout Button */}
//       <button className="logout-buttonp" onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/profilePanel.scss';
import userIcon from '../resources/icons/userIcon.svg';
import {getProfile,updateProfile,updateProfileContact} from '../services/users/profilePanel'
import MainPage from '../Pages/MainPage'

const Profile = ({ username, onClose }) => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    updatedUsername: '',
    profileDescription: '',
    email: '',
    phoneNumber: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfile(username);
        setProfileData(response.data);
        setFormData({
          displayName: response.data.userData.displayName,
          updatedUsername: response.data.userData.username,
          profileDescription: response.data.profileData.profile_description,
          email: response.data.userData.email,
          phoneNumber: response.data.profileData.mobile_number
        });
      } catch (error) {
        setError('Error fetching profile data');
        setProfileData({
          userData: { username: 'null', email: 'null' },
          profileData: { profile_picture: 'null', mobile_number: 'null', profile_description: 'null' }
        });
      }
    };

    fetchProfileData();
  }, [username]);

  const handleEditProfile = () => {
    setEditingProfile(true);
  };

  const handleEditContact = () => {
    setEditingContact(true);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await updateProfile(username,formData)
      console.log('Profile updated successfully:', response.data);
      setEditingProfile(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error gracefully
    }
  };

  const handleSaveContact = async () => {
    try {
      const response = await updateProfileContact(username,formData)
      console.log('Contact info updated successfully:', response.data);
      setEditingContact(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating contact info:', error);
      // Handle error gracefully
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for Pakistani phone number format: 03xx-xxxxxxx
    return /^03[0-9]{2}-[0-9]{7}$/.test(phoneNumber);
  };

  const canSaveProfile = () => {
    return formData.displayName.trim() !== '' && !editingProfile;
  };

  const canSaveContact = () => {
    return validateEmail(formData.email) && validatePhoneNumber(formData.phoneNumber) && !editingContact;
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/'); // Redirect to main page
    <MainPage />
  };

  return (
    <div className="profile-containerp">
      <div className="profile-headerp">
        <h1>Profile</h1>
        <button className="close-buttonp" onClick={onClose}>×</button>
      </div>
      {profileData ? (
        <>
          <div className="profile-picture-containerp">
            <img
              src={userIcon}
              alt="Profile"
              className="profile-picturep"
            />
          </div>
          <div className="profile-infop">
            <div className="username-sectionp">
              <span className="usernamep">{profileData.userData.username}</span>
              <button className="edit-buttonp" onClick={handleEditProfile}>Edit</button>
            </div>
            <div className="profile-descriptionp">
              {profileData.profileData.profile_description}
            </div>
            <div className="emailp">{profileData.userData.displayName}</div>
            <hr />
            <div className="contact-infop">
              <div className="email-sectionp">
                <span className="labelp">Email:</span>
                <span className="valuep">{profileData.userData.email}</span>
              </div>
              <div className="phone-sectionp">
                <span className="labelp">Phone Number:</span>
                <span className="valuep">{profileData.profileData.mobile_number}</span>
              </div>
              <button className="edit-buttonp" onClick={handleEditContact}>Edit</button>
            </div>
          </div>
        </>
      ) : (
        <div>{error || 'Loading...'}</div>
      )}

      {/* Edit Profile Form */}
      {editingProfile && (
        <div className="edit-profile-form overlay">
          <div className="edit-profile-form-content">
            <h2>Edit Profile Info</h2>
            <hr />
            <div className="input-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Display Name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="updatedUsername">Username</label>
              <input
                type="text"
                name="updatedUsername"
                value={formData.updatedUsername}
                onChange={handleChange}
                placeholder="Username"
                disabled
              />
            </div>
            <div className="input-group">
              <label htmlFor="profileDescription">Profile Description</label>
              <textarea
                name="profileDescription"
                value={formData.profileDescription}
                onChange={handleChange}
                placeholder="Profile Description"
              />
            </div>
            <div className="button-container">
              <button className="secondary-button" onClick={() => setEditingProfile(false)}>Cancel</button>
              <button className="primary-button" onClick={handleSaveProfile} >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contact Info Form */}
      {editingContact && (
        <div className="edit-contact-form overlay">
          <div className="edit-contact-form-content">
            <h2>Edit Contact Info</h2>
            <hr />
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
              />
              {!validateEmail(formData.email) && (
                <p className="error-message">Please enter a valid email address.</p>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              {!validatePhoneNumber(formData.phoneNumber) && (
                <p className="error-message">Please enter a valid Pakistani phone number (e.g., 03xx-xxxxxxx).</p>
              )}
            </div>
            <div className="button-container">
              <button className="secondary-button" onClick={() => setEditingContact(false)}>Cancel</button>
              <button className="primary-button" onClick={handleSaveContact} >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <button className="logout-buttonp" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
