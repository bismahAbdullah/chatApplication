


//beautyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import sendButton from "../resources/icons/sendButton.svg";
// import '../styles/profile.scss';
// import { Buffer } from 'buffer';
// import userIcon from '../resources/icons/userIcon.svg';
// import Profile from '../Components/ProfilePanel';
// import audioIcon from '../resources/icons/mikeIcon.svg';

// const mimeType = "audio/webm";

// const DirectProfileChat = ({ username }) => {
//   console.log(username)
//   const [profileData, setProfileData] = useState(null);
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [socket, setSocket] = useState(null);
//   const [showProfilePanel, setShowProfilePanel] = useState(false);
//   const token = localStorage.getItem('token'); // Retrieve token from local storage

//   const [permission, setPermission] = useState(false);
//   const mediaRecorder = useRef(null);
//   const [recordingStatus, setRecordingStatus] = useState("inactive");
//   const [stream, setStream] = useState(null);
//   const [audioChunks, setAudioChunks] = useState([]);
//   const [audio, setAudio] = useState(null);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3002/profile/getProfileInfo/${username}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setProfileData(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           // If response status is 404, set profileData to null
//           setProfileData(null);
//         } else {
//           // For other errors, log the error
//           console.error('Error fetching profile data:', error);
//         }
//       }
//     };

//     if (username) {
//       console.log(username)
//       fetchProfileData();
//     }
//   }, [username, token]);

//   useEffect(() => {
//     const newSocket = io('http://localhost:3002');

//     newSocket.on('connect', () => {
//       console.log('Connected to server');
//       newSocket.emit('join', token);
//     });

//     newSocket.on('receive_message', (newMessage) => {
//       setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
//     });
//     console.log(receivedMessages)

//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [username, token]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3002/message/receiveMessages/${username}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setReceivedMessages(response.data);
//         // console.log(receivedMessages)
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchMessages();
//   }, [username, token]);

//   const sendMessageToServer = async () => {
//     try {
//       if (socket) {
//         const response = await axios.post('http://localhost:3002/message/sendMessages', {
//           receiverUsername: username,
//           message
//         }, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const sentMessage = response.data;

//         // Emit the message to the server
//         socket.emit('message', sentMessage);

//         // Update local state with the new message
//         setReceivedMessages((prevMessages) => [...prevMessages, sentMessage]);
//         setMessage(''); // Clear message input field after sending
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const getBase64Image = (imageString) => {
//     return `data:image/jpeg;base64,${Buffer.from(imageString, 'binary').toString('base64')}`;
//   };

//   const handleUsernameClick = () => {
//     setShowProfilePanel(true);
//   };

//   const handleCloseProfilePanel = () => {
//     setShowProfilePanel(false);
//   };

//   // Audio Recording Functions
//   const getMicrophonePermission = async () => {
//     if ("MediaRecorder" in window) {
//       try {
//         const streamData = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: false,
//         });
//         setPermission(true);
//         setStream(streamData);
//       } catch (err) {
//         alert(err.message);
//       }
//     } else {
//       alert("The MediaRecorder API is not supported in your browser.");
//     }
//   };

//   const startRecording = async () => {
//     setRecordingStatus("recording");
//     const media = new MediaRecorder(stream, { type: mimeType });
//     mediaRecorder.current = media;
//     mediaRecorder.current.start();
//     let localAudioChunks = [];
//     mediaRecorder.current.ondataavailable = (event) => {
//       if (typeof event.data === "undefined") return;
//       if (event.data.size === 0) return;
//       localAudioChunks.push(event.data);
//     };
//     setAudioChunks(localAudioChunks);
//   };

//   const stopRecording = () => {
//     setRecordingStatus("inactive");
//     mediaRecorder.current.stop();
//     mediaRecorder.current.onstop = () => {
//       const audioBlob = new Blob(audioChunks, { type: mimeType });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       setAudio(audioUrl);
//       setAudioChunks([]);
//       setMessage(audioUrl); // Set the audio URL in the message input
//     };
//   };

//   console.log(profileData);

//   return (
//     <div className="profile-container">
//       {profileData ? (
//         <>
//           <div className="profile-header">
//             <div className="profile-picture">
//               <img src={userIcon} alt="DirectProfileChat Picture" />
//             </div>
//             <div className="username-container">
//               <div
//                 className="username"
//                 style={{ cursor: 'pointer' }}
//               >
//                 {profileData.userData.username}
//               </div>
//               <div className={`status-indicator ${profileData.profileData.online_status ? 'true' : 'false'}`}></div>
//             </div>
//           </div>
//           <div className="description">{profileData.profileData.profile_description}</div>
//           <div className="conversation-info">
//             This conversation is between @{profileData.userData.username} and you. Check out their profile to know more about them.
//           </div>
//           <div className="messages-container">
//             {receivedMessages.map((msg, index) => (
//               <div key={index}>
//                 <strong style={{ fontFamily: 'Roboto', fontSize: '16px', fontWeight: '700', lineHeight: '16.41px', textAlign: 'left', color: '#06334D'} }>
//                   {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}:
//                 </strong> 
//                 {msg.message} <br />
//                 <small>{new Date(msg.created_at).toLocaleString()}</small>
//               </div>
//             ))}
//           </div>
//           <div className="message-box">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <button onClick={!permission ? getMicrophonePermission : (recordingStatus === "inactive" ? startRecording : stopRecording)}>
//               <img src={audioIcon} alt="Audio Button" />
//             </button>
//             <button onClick={sendMessageToServer}><img src={sendButton} alt="Send Button" /></button>
//           </div>
//           {audio && (
//             <div className="audio-container">
//               <audio src={audio} controls></audio>
//               {/* <a download href={audio}>Download Recording</a> */}
//             </div>
//           )}
//         </>
//       ) : (
//         <div>User not registered</div>
//       )}
//       <div>
//       </div>
//     </div>
//   );
// };
//best versionnnnnnnnnnnnnnn
// export default DirectProfileChat;
// import React, { useEffect, useState, useRef } from 'react';
// import sendButton from "../resources/icons/sendButton.svg";
// import '../styles/profile.scss';
// import { Buffer } from 'buffer';
// import userIcon from '../resources/icons/userIcon.svg';
// import Profile from '../Components/ProfilePanel';
// import audioIcon from '../resources/icons/mikeIcon.svg';
// import {sendMessages,receiveMessages} from "../services/msgs/DirectProfileChat"
// import {getProfileInfo} from "../services/users/directProfileChat"

// const mimeType = "audio/webm";

// const DirectProfileChat = ({ username }) => {

//   const [profileData, setProfileData] = useState(null);
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [socket, setSocket] = useState(null);
//   const [showProfilePanel, setShowProfilePanel] = useState(false);
//   const token = localStorage.getItem('token'); // Retrieve token from local storage

//   const [permission, setPermission] = useState(false);
//   const mediaRecorder = useRef(null);
//   const [recordingStatus, setRecordingStatus] = useState("inactive");
//   const [stream, setStream] = useState(null);
//   const [audioChunks, setAudioChunks] = useState([]);
//   const [audio, setAudio] = useState(null);
//   // useEffect(() => {
//   //   console.log(sockettt); // Log the socket object to verify if it's established
//   // }, []);
//   const handlechange=(e)=>{
//     setMessage(e.target.value)
//     console.log(e.target.value)
//   }
// const handlesubmit=(e)=>{
//   e.preventDefault();
//   console.log(message)
// }
//   useEffect(() => {

//     const fetchProfileData = async () => {
//       try {
//         console.log(username)
//         const response = await getProfileInfo(username);
//         console.log(response)

//         setProfileData(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           // If response status is 404, set profileData to null
//           setProfileData(null);
//         } else {
//           // For other errors, log the error
//           console.error('Error fetching profile data:', error);
//         }
//       }
//     };

//     if (username) {
//       console.log(username)
//       fetchProfileData();
//     }
//   }, [username, token])


//   //[username, token,socket]);

//   // useEffect(() => {
//   //   const newSocket = io('http://localhost:3002');

//   //   newSocket.on('connect', () => {
//   //     console.log('Connected to server');
//   //     newSocket.emit('join', token);
//   //   });

//   //   newSocket.on('receive_message', (newMessage) => {
//   //     setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
//   //   });
//   //   console.log(receivedMessages)

//   //   setSocket(newSocket);

//   //   return () => {
//   //     newSocket.disconnect();
//   //   };
//   // }, [username, token]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await receiveMessages(username)
//         setReceivedMessages(response.data);
//         // console.log(receivedMessages)
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchMessages();
//   }, [username, token]);

//   const sendMessageToServer = async () => {
//     try {
//      // if (socket) {
//      console.log(username,message)
//         const response = await sendMessages(username,message)
//         const sentMessage = response.data;

//         // Emit the message to the server
//        // socket.emit('message', sentMessage);

//         // Update local state with the new message
//         setReceivedMessages((prevMessages) => [...prevMessages, sentMessage]);
//         setMessage(''); // Clear message input field after sending
//         setAudio(null); // Clear audio after sending
//      // }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const getBase64Image = (imageString) => {
//     return `data:image/jpeg;base64,${Buffer.from(imageString, 'binary').toString('base64')}`;
//   };

//   const handleUsernameClick = () => {
//     setShowProfilePanel(true);
//   };

//   const handleCloseProfilePanel = () => {
//     setShowProfilePanel(false);
//   };

//   // Audio Recording Functions
//   const getMicrophonePermission = async () => {
//     if ("MediaRecorder" in window) {
//       try {
//         const streamData = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: false,
//         });
//         setPermission(true);
//         setStream(streamData);
//       } catch (err) {
//         alert(err.message);
//       }
//     } else {
//       alert("The MediaRecorder API is not supported in your browser.");
//     }
//   };

//   const startRecording = async () => {
//     setRecordingStatus("recording");
//     const media = new MediaRecorder(stream, { type: mimeType });
//     mediaRecorder.current = media;
//     mediaRecorder.current.start();
//     let localAudioChunks = [];
//     mediaRecorder.current.ondataavailable = (event) => {
//       if (typeof event.data === "undefined") return;
//       if (event.data.size === 0) return;
//       localAudioChunks.push(event.data);
//     };
//     setAudioChunks(localAudioChunks);
//   };

//   const stopRecording = () => {
//     setRecordingStatus("inactive");
//     mediaRecorder.current.stop();
//     mediaRecorder.current.onstop = () => {
//       const audioBlob = new Blob(audioChunks, { type: mimeType });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       console.log(audioUrl)
//       setAudio(audioUrl);
//       setAudioChunks([]);
//     };
//   };

//   console.log(profileData);



//   //save copyyyy
//   return (
//     <div className="profile-container">
//         {profileData ? (
//             <>
//                 <div className="profile-header">
//                     <div className="profile-picture">
//                         <img src={userIcon} alt="DirectProfileChat Picture" />
//                     </div>
//                     <div className="username-container">
//                         <div className="username" style={{ cursor: 'pointer' }}>
//                             {profileData.userData.username}
//                         </div>
//                         <div className={`status-indicator ${profileData.profileData.online_status ? 'true' : 'false'}`}></div>
//                     </div>
//                 </div>
//                 <div className="description">{profileData.profileData.profile_description}</div>
//                 <div className="conversation-info">
//                     This conversation is between @{profileData.userData.username} and you. Check out their profile to know more about them.
//                 </div>
//                 <div className="messages-container">
//                     {receivedMessages.map((msg, index) => (
//                         <div key={index} className="message">
//                             <div className="message-header">
//                                 <strong className="message-username">
//                                     {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
//                                 </strong>
//                                 <span className="message-time">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                             </div>
//                             <div className="message-content">{msg.message}</div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="message-box">
//                     {recordingStatus === "recording" && <div className="recording-indicator">Recording audio...</div>}
//                     <input
//                         type="text"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         placeholder="Type your message..."
//                     />
//                     <button onClick={!permission ? getMicrophonePermission : (recordingStatus === "inactive" ? startRecording : stopRecording)}>
//                         <img src={audioIcon} alt="Audio Button" />
//                     </button>
//                     <button  onClick={sendMessageToServer}><img src={sendButton} alt="Send Button" /></button>

//                 </div>
//                 {audio && (
//                     <div className="audio-container">
//                         <audio src={audio} controls></audio>
//                     </div>
//                 )}
//             </>
//         ) : (
//             <div>User not registered</div>
//         )}
//         <div>
//         </div>
//     </div>
// );
// };

// export default DirectProfileChat;
//aduio saved in db 
// import React, { useEffect, useState, useRef } from 'react';
// import sendButton from "../resources/icons/sendButton.svg";
// import '../styles/profile.scss';
// import { Buffer } from 'buffer';
// import userIcon from '../resources/icons/userIcon.svg';
// import audioIcon from '../resources/icons/mikeIcon.svg';
// import { sendMessages, receiveMessages, sendAudioMessage, receiveAudioMessages } from "../services/msgs/DirectProfileChat";
// import { getProfileInfo } from "../services/users/directProfileChat";

// const mimeType = "audio/webm";

// const DirectProfileChat = ({ username }) => {
//   const [profileData, setProfileData] = useState(null);
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [socket, setSocket] = useState(null);
//   const [showProfilePanel, setShowProfilePanel] = useState(false);
//   const token = localStorage.getItem('token'); // Retrieve token from local storage
//   const [permission, setPermission] = useState(false);
//   const mediaRecorder = useRef(null);
//   const [recordingStatus, setRecordingStatus] = useState("inactive");
//   const [stream, setStream] = useState(null);
//   const [audioChunks, setAudioChunks] = useState([]);
//   const [audio, setAudio] = useState(null);

//   const handleChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await getProfileInfo(username);
//         setProfileData(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           setProfileData(null);
//         } else {
//           console.error('Error fetching profile data:', error);
//         }
//       }
//     };

//     if (username) {
//       fetchProfileData();
//     }
//   }, [username, token]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await receiveMessages(username);
//         setReceivedMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     const fetchAudioMessages = async () => {
//       try {
//         const response = await receiveAudioMessages(username);

//         setReceivedMessages(prevMessages => [...prevMessages, ...response.data]);
//         console.log(receiveMessages)
//       } catch (error) {
//         console.error('Error fetching audio messages:', error);
//       }
//     };

//     fetchMessages();
//     fetchAudioMessages();
//   }, [username, token]);

//   const sendMessageToServer = async () => {
//     try {
//       if (audio) {
//         const audioBlob = new Blob(audioChunks, { type: mimeType });
//         const audioUrl = URL.createObjectURL(audioBlob);
//         const response = await sendAudioMessage(username, audioUrl);
//         const sentAudioMessage = response.data;

//         // Update local state with the new audio message
//         setReceivedMessages((prevMessages) => [...prevMessages, sentAudioMessage]);
//         setAudio(null); // Clear audio after sending
//       } else if (message.trim()) {
//         const response = await sendMessages(username, message);
//         const sentMessage = response.data;

//         // Update local state with the new message
//         setReceivedMessages((prevMessages) => [...prevMessages, sentMessage]);
//         setMessage(''); // Clear message input field after sending
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const getBase64Image = (imageString) => {
//     return `data:image/jpeg;base64,${Buffer.from(imageString, 'binary').toString('base64')}`;
//   };

//   const getMicrophonePermission = async () => {
//     if ("MediaRecorder" in window) {
//       try {
//         const streamData = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
//         setPermission(true);
//         setStream(streamData);
//       } catch (err) {
//         alert(err.message);
//       }
//     } else {
//       alert("The MediaRecorder API is not supported in your browser.");
//     }
//   };

//   const startRecording = async () => {
//     setRecordingStatus("recording");
//     const media = new MediaRecorder(stream, { type: mimeType });
//     mediaRecorder.current = media;
//     mediaRecorder.current.start();
//     let localAudioChunks = [];
//     mediaRecorder.current.ondataavailable = (event) => {
//       if (typeof event.data === "undefined") return;
//       if (event.data.size === 0) return;
//       localAudioChunks.push(event.data);
//     };
//     setAudioChunks(localAudioChunks);
//   };

//   const stopRecording = () => {
//     setRecordingStatus("inactive");
//     mediaRecorder.current.stop();
//     mediaRecorder.current.onstop = () => {
//       const audioBlob = new Blob(audioChunks, { type: mimeType });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       setAudio(audioUrl);
//       setAudioChunks([]);
//     };
//   };

//   return (
//     <div className="profile-container">
//       {profileData ? (
//         <>
//           <div className="profile-header">
//             <div className="profile-picture">
//               <img src={userIcon} alt="DirectProfileChat Picture" />
//             </div>
//             <div className="username-container">
//               <div className="username" style={{ cursor: 'pointer' }}>
//                 {profileData.userData.username}
//               </div>
//               <div className={`status-indicator ${profileData.profileData.online_status ? 'true' : 'false'}`}></div>
//             </div>
//           </div>
//           <div className="description">{profileData.profileData.profile_description}</div>
//           <div className="conversation-info">
//             This conversation is between @{profileData.userData.username} and you. Check out their profile to know more about them.
//           </div>
//           <div className="messages-container">
//             {receivedMessages.map((msg, index) => (
//               <div key={index} className="message">
//                 <div className="message-header">
//                   <strong className="message-username">
//                     {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
//                   </strong>
//                   <span className="message-time">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                 </div>
//                 {msg.message && <div className="message-content">{msg.message}</div>}
//                 {msg.audio_url && <audio controls src={msg.audio_url}></audio>}
//               </div>
//             ))}
//           </div>
//           <div className="message-box">
//             {recordingStatus === "recording" && <div className="recording-indicator">Recording audio...</div>}
//             <input
//               type="text"
//               value={message}
//               onChange={handleChange}
//               placeholder="Type your message..."
//             />
//             <button onClick={!permission ? getMicrophonePermission : (recordingStatus === "inactive" ? startRecording : stopRecording)}>
//               <img src={audioIcon} alt="Audio Button" />
//             </button>
//             <button onClick={sendMessageToServer}><img src={sendButton} alt="Send Button" /></button>
//           </div>
//           {audio && (
//             <div className="audio-container">
//               <audio src={audio} controls></audio>
//             </div>
//           )}
//         </>
//       ) : (
//         <div>User not registered</div>
//       )}
//     </div>
//   );
// };

// export default DirectProfileChat;
//sending but not getting audiossssssss
// import React, { useEffect, useState, useRef } from 'react';
// import sendButton from "../resources/icons/sendButton.svg";
// import '../styles/profile.scss';
// import { Buffer } from 'buffer';
// import userIcon from '../resources/icons/userIcon.svg';
// import audioIcon from '../resources/icons/mikeIcon.svg';
// import { sendMessages, receiveMessages, sendAudioMessage, receiveAudioMessages } from "../services/msgs/DirectProfileChat";
// import { getProfileInfo } from "../services/users/directProfileChat";

// const mimeType = "audio/webm";

// const DirectProfileChat = ({ username }) => {
//   const [profileData, setProfileData] = useState(null);
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [receivedAudioMessages, setReceivedAudioMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [socket, setSocket] = useState(null);
//   const [showProfilePanel, setShowProfilePanel] = useState(false);
//   const token = localStorage.getItem('token'); // Retrieve token from local storage

//   const [permission, setPermission] = useState(false);
//   const mediaRecorder = useRef(null);
//   const [recordingStatus, setRecordingStatus] = useState("inactive");
//   const [stream, setStream] = useState(null);
//   const [audioChunks, setAudioChunks] = useState([]);
//   const [audio, setAudio] = useState(null);

//   const handlechange = (e) => {
//     setMessage(e.target.value);
//   }

//   const handlesubmit = (e) => {
//     e.preventDefault();
//   }

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await getProfileInfo(username);
//         setProfileData(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           setProfileData(null);
//         } else {
//           console.error('Error fetching profile data:', error);
//         }
//       }
//     };

//     if (username) {
//       fetchProfileData();
//     }
//   }, [username, token]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await receiveMessages(username);
//         setReceivedMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     const fetchAudioMessages = async () => {
//       try {
//         const response = await receiveAudioMessages(username);
//         console.log(username,response.data)
//         setReceivedAudioMessages(response.data);
//         console.log(receivedAudioMessages)
//       } catch (error) {
//         console.error('Error fetching audio messages:', error);
//       }
//     };

//     fetchMessages();
//     fetchAudioMessages();
//   }, [username, token]);

//   const sendMessageToServer = async () => {
//     try {
//       if (audio) {
//         const response = await sendAudioMessage(username, audio);
//         const sentAudioMessage = response.data;

//         setReceivedAudioMessages((prevMessages) => [...prevMessages, sentAudioMessage]);
//         setAudio(null);
//       } else if (message.trim()) {
//         const response = await sendMessages(username, message);
//         const sentMessage = response.data;

//         setReceivedMessages((prevMessages) => [...prevMessages, sentMessage]);
//         setMessage('');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const getBase64Image = (imageString) => {
//     return `data:image/jpeg;base64,${Buffer.from(imageString, 'binary').toString('base64')}`;
//   };

//   const handleUsernameClick = () => {
//     setShowProfilePanel(true);
//   };

//   const handleCloseProfilePanel = () => {
//     setShowProfilePanel(false);
//   };

//   // Audio Recording Functions
//   const getMicrophonePermission = async () => {
//     if ("MediaRecorder" in window) {
//       try {
//         const streamData = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: false,
//         });
//         setPermission(true);
//         setStream(streamData);
//       } catch (err) {
//         alert(err.message);
//       }
//     } else {
//       alert("The MediaRecorder API is not supported in your browser.");
//     }
//   };

//   const startRecording = async () => {
//     setRecordingStatus("recording");
//     const media = new MediaRecorder(stream, { type: mimeType });
//     mediaRecorder.current = media;
//     mediaRecorder.current.start();
//     let localAudioChunks = [];
//     mediaRecorder.current.ondataavailable = (event) => {
//       if (typeof event.data === "undefined") return;
//       if (event.data.size === 0) return;
//       localAudioChunks.push(event.data);
//     };
//     setAudioChunks(localAudioChunks);
//   };

//   const stopRecording = () => {
//     setRecordingStatus("inactive");
//     mediaRecorder.current.stop();
//     mediaRecorder.current.onstop = () => {
//       const audioBlob = new Blob(audioChunks, { type: mimeType });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       setAudio(audioUrl);
//       setAudioChunks([]);
//     };
//   };

//   console.log(profileData);

//   return (
//     <div className="profile-container">
//       {profileData ? (
//         <>
//           <div className="profile-header">
//             <div className="profile-picture">
//               <img src={userIcon} alt="DirectProfileChat Picture" />
//             </div>
//             <div className="username-container">
//               <div className="username" style={{ cursor: 'pointer' }}>
//                 {profileData.userData.username}
//               </div>
//               <div className={`status-indicator ${profileData.profileData.online_status ? 'true' : 'false'}`}></div>
//             </div>
//           </div>
//           <div className="description">{profileData.profileData.profile_description}</div>
//           <div className="conversation-info">
//             This conversation is between @{profileData.userData.username} and you. Check out their profile to know more about them.
//           </div>
//           <div className="messages-container">
//             {receivedMessages.map((msg, index) => (
//               <div key={index} className="message">
//                 <div className="message-header">
//                   <strong className="message-username">
//                     {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
//                   </strong>
//                   <span className="message-time">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                 </div>
//                 <div className="message-content">{msg.message}</div>
//               </div>
//             ))}
//             {receivedAudioMessages.map((msg, index) => (
//               <div key={index} className="message">
//                 <div className="message-header">
//                   <strong className="message-username">
//                     {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
//                   </strong>
//                   <span className="message-time">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                 </div>
//                 <div className="message-content">
//                   <audio src={msg.file_path} controls></audio>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="message-box">
//             {recordingStatus === "recording" && <div className="recording-indicator">Recording audio...</div>}
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <button onClick={!permission ? getMicrophonePermission : (recordingStatus === "inactive" ? startRecording : stopRecording)}>
//               <img src={audioIcon} alt="Audio Button" />
//             </button>
//             <button onClick={sendMessageToServer}><img src={sendButton} alt="Send Button" /></button>
//           </div>
//           {audio && (
//             <div className="audio-container">
//               <audio src={audio} controls></audio>
//             </div>
//           )}
//         </>
//       ) : (
//         <div>User not registered</div>
//       )}
//     </div>
//   );
// };

// export default DirectProfileChat;
//wokring fine for sending and receving audioooooooooooooooo
// import React, { useEffect, useState, useRef } from 'react';
// import sendButton from "../resources/icons/sendButton.svg";
// import '../styles/profile.scss';
// import { Buffer } from 'buffer';
// import userIcon from '../resources/icons/userIcon.svg';
// import audioIcon from '../resources/icons/mikeIcon.svg';
// import { 
//   sendMessages, 
//   receiveMessages, 
//   sendAudioMessage, 
//   receiveAudioMessages 
// } from "../services/msgs/DirectProfileChat";
// import { getProfileInfo } from "../services/users/directProfileChat";
// import fileIcon from '../resources/icons/file.svg'

// const mimeType = "audio/webm";

// const DirectProfileChat = ({ username }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [profileData, setProfileData] = useState(null);
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [receivedAudioMessages, setReceivedAudioMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [recordingStatus, setRecordingStatus] = useState("inactive");
//   const [permission, setPermission] = useState(false);
//   const mediaRecorder = useRef(null);
//   const [stream, setStream] = useState(null);
//   const [audioChunks, setAudioChunks] = useState([]);

//   const handleFileChange = (e) => {
//     setSelectedFiles(e.target.files);
//   };


//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await getProfileInfo(username);
//         setProfileData(response.data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };

//     const fetchMessages = async () => {
//       try {
//         const response = await receiveMessages(username);
//         setReceivedMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     const fetchAudioMessages = async () => {
//       try {
//         const response = await receiveAudioMessages(username);
//         setReceivedAudioMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching audio messages:', error);
//       }
//     };

//     fetchProfileData();
//     fetchMessages();
//     fetchAudioMessages();
//   }, [username]);

//   const sendMessageToServer = async () => {
//     try {
//       if (audioBlob) {
//         const response = await sendAudioMessage(username, audioBlob);
//         const sentAudioMessage = response.data;

//         setReceivedAudioMessages((prevMessages) => [...prevMessages, sentAudioMessage]);
//         setAudioBlob(null);
//         setAudioUrl(null);
//       } else if (message.trim()) {
//         const response = await sendMessages(username, message);
//         const sentMessage = response.data;

//         setReceivedMessages((prevMessages) => [...prevMessages, sentMessage]);
//         setMessage('');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const getMicrophonePermission = async () => {
//     if ("MediaRecorder" in window) {
//       try {
//         const streamData = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: false,
//         });
//         setPermission(true);
//         setStream(streamData);
//       } catch (err) {
//         alert(err.message);
//       }
//     } else {
//       alert("The MediaRecorder API is not supported in your browser.");
//     }
//   };

//   const startRecording = async () => {
//     setRecordingStatus("recording");
//     const media = new MediaRecorder(stream, { type: mimeType });
//     mediaRecorder.current = media;
//     mediaRecorder.current.start();
//     let localAudioChunks = [];
//     mediaRecorder.current.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         localAudioChunks.push(event.data);
//       }
//     };
//     setAudioChunks(localAudioChunks);
//   };

//   const stopRecording = () => {
//     setRecordingStatus("inactive");
//     mediaRecorder.current.stop();
//     mediaRecorder.current.onstop = () => {
//       const audioBlob = new Blob(audioChunks, { type: mimeType });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       setAudioBlob(audioBlob);
//       setAudioUrl(audioUrl);
//       setAudioChunks([]);
//     };
//   };

//   return (
//     <div className="profile-container">
//       {profileData ? (
//         <>
//           <div className="profile-header">
//             <div className="profile-picture">
//               <img src={userIcon} alt="DirectProfileChat Picture" />
//             </div>
//             <div className="username-container">
//               <div className="username" style={{ cursor: 'pointer' }}>
//                 {profileData.userData.username}
//               </div>
//               <div className={`status-indicator ${profileData.profileData.online_status ? 'true' : 'false'}`}></div>
//             </div>
//           </div>
//           <div className="description">{profileData.profileData.profile_description}</div>
//           <div className="conversation-info">
//             This conversation is between @{profileData.userData.username} and you. Check out their profile to know more about them.
//           </div>
//           <div className="messages-container">
//             {receivedMessages.map((msg, index) => (
//               <div key={index} className="message">
//                 <div className="message-header">
//                   <strong className="message-username">
//                     {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
//                   </strong>
//                   <span className="message-time">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                 </div>
//                 <div className="message-content">{msg.message}</div>
//               </div>
//             ))}
//             {receivedAudioMessages.map((msg, index) => (
//               <div key={index} className="message">
//                 <div className="message-header">
//                   <strong className="message-username">
//                     {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
//                   </strong>
//                   <span className="message-time">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                 </div>
//                 <div className="message-content">
//                   <audio src={msg.file_path} controls></audio>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="message-box">
//             {audioUrl && (
//               <div className="audio-container">
//                 <audio src={audioUrl} controls></audio>
//               </div>
//             )}
//             {recordingStatus === "recording" && <div className="recording-indicator">Recording audio...</div>}
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type your message..."
//             />

//             <button onClick={() => document.getElementById('fileInput').click()}>
//               <img src={fileIcon} alt="Send Media" />
//             </button>
//             <input
//               id="fileInput"
//               type="file"
//               multiple
//               style={{ display: 'none' }}
//               onChange={handleFileChange}
//             />
//             <button onClick={!permission ? getMicrophonePermission : (recordingStatus === "inactive" ? startRecording : stopRecording)}>
//               <img src={audioIcon} alt="Audio Button" />
//             </button>
//             <button onClick={sendMessageToServer}><img src={sendButton} alt="Send Button" /></button>

//           </div>

//         </>
//       ) : (
//         <div>User not registered</div>
//       )}
//     </div>
//   );
// };

// export default DirectProfileChat;
//working for sending and receing media filessssssssssssssssss
// import React, { useEffect, useState, useRef } from 'react';
// import sendButton from "../resources/icons/sendButton.svg";
// import '../styles/profile.scss';
// import { 
//   sendMessages, 
//   receiveMessages, 
//   sendAudioMessage, 
//   receiveAudioMessages,
//   sendMedia,
//   getMedia
// } from "../services/msgs/DirectProfileChat";
// import { getProfileInfo } from "../services/users/directProfileChat";
// import userIcon from '../resources/icons/userIcon.svg';
// import audioIcon from '../resources/icons/mikeIcon.svg';
// import fileIcon from '../resources/icons/file.svg';

// const mimeType = "audio/webm";

// const DirectProfileChat = ({ username }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [profileData, setProfileData] = useState(null);
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [receivedAudioMessages, setReceivedAudioMessages] = useState([]);
//   const [receivedMediaMessages, setReceivedMediaMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [recordingStatus, setRecordingStatus] = useState("inactive");
//   const [permission, setPermission] = useState(false);
//   const mediaRecorder = useRef(null);
//   const [stream, setStream] = useState(null);
//   const [audioChunks, setAudioChunks] = useState([]);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await getProfileInfo(username);
//         setProfileData(response.data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };

//     const fetchMessages = async () => {
//       try {
//         const response = await receiveMessages(username);
//         setReceivedMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     const fetchAudioMessages = async () => {
//       try {
//         const response = await receiveAudioMessages(username);
//         setReceivedAudioMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching audio messages:', error);
//       }
//     };

//     const fetchMediaMessages = async () => {
//       try {
//         const response = await getMedia(username);
        
//         setReceivedMediaMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching media messages:', error);
//       }
//     };

//     fetchProfileData();
//     fetchMessages();
//     fetchAudioMessages();
//     fetchMediaMessages();
//   }, [username]);

//   const sendMessageToServer = async () => {
//     try {
//       if (audioBlob) {
//         const response = await sendAudioMessage(username, audioBlob);
//         const sentAudioMessage = response.data;
//         setReceivedAudioMessages((prevMessages) => [...prevMessages, sentAudioMessage]);
//         setAudioBlob(null);
//         setAudioUrl(null);
//       } else if (selectedFiles.length > 0) {
//         const mediaType = getMediaType(selectedFiles[0].type);
//         console.log(selectedFiles[0])
//        // const blobUrl = await createBlobUrl(selectedFiles[0]);
//        const blobUrl = selectedFiles[0];
        
//        const response = await sendMedia(mediaType, username, blobUrl);
//         const sentMediaMessage = response.data;
//         setReceivedMediaMessages((prevMessages) => [...prevMessages, sentMediaMessage]);
//         setSelectedFiles([]);
//       } else if (message.trim()) {
//         const response = await sendMessages(username, message);
//         const sentMessage = response.data;
//         setReceivedMessages((prevMessages) => [...prevMessages, sentMessage]);
//         setMessage('');
//       }
//     } catch (error) {
//       console.error( error);
//     }
//   };

//   const createBlobUrl = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const blobUrl = URL.createObjectURL(new Blob([reader.result], { type: file.type }));
//         resolve(blobUrl);
//        // resolve(reader.result);
//       };
//       reader.onerror = reject;
//       reader.readAsArrayBuffer(file)
//       //reader.readAsDataURL(file);
//     });
//   };

//   const getMicrophonePermission = async () => {
//     if ("MediaRecorder" in window) {
//       try {
//         const streamData = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: false,
//         });
//         setPermission(true);
//         setStream(streamData);
//       } catch (err) {
//         alert(err.message);
//       }
//     } else {
//       alert("The MediaRecorder API is not supported in your browser.");
//     }
//   };

//   const startRecording = async () => {
//     setRecordingStatus("recording");
//     const media = new MediaRecorder(stream, { type: mimeType });
//     mediaRecorder.current = media;
//     mediaRecorder.current.start();
//     let localAudioChunks = [];
//     mediaRecorder.current.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         localAudioChunks.push(event.data);
//       }
//     };
//     setAudioChunks(localAudioChunks);
//   };

//   const stopRecording = () => {
//     setRecordingStatus("inactive");
//     mediaRecorder.current.stop();
//     mediaRecorder.current.onstop = () => {
//       const audioBlob = new Blob(audioChunks, { type: mimeType });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       setAudioBlob(audioBlob);
//       setAudioUrl(audioUrl);
//       setAudioChunks([]);
//     };
//   };

//   const handleFileChange = (e) => {
//     setSelectedFiles(e.target.files);
//   };

//   const getMediaType = (fileType) => {
//     if (fileType.startsWith('image')) {
//       return 'image';
//     } else if (fileType.startsWith('video')) {
//       return 'video';
//     } else {
//       return 'file';
//     }
//   };

//   return (
//     <div className="profile-container">
//       {profileData ? (
//         <>
//           <div className="profile-header">
//             <div className="profile-picture">
//               <img src={userIcon} alt="DirectProfileChat Picture" />
//             </div>
//             <div className="username-container">
//               <div className="username" style={{ cursor: 'pointer' }}>
//                 {profileData.userData.username}
//               </div>
//               <div className={`status-indicator ${profileData.profileData.online_status ? 'true' : 'false'}`}></div>
//             </div>
//           </div>
//           <div className="description">{profileData.profileData.profile_description}</div>
//           <div className="conversation-info">
//             This conversation is between @{profileData.userData.username} and you. Check out their profile to know more about them.
//           </div>
//           <div className="messages-container">
//             {receivedMessages.map((msg, index) => (
//               <div key={index} className="message">
//                 <div className="message-header">
//                   <strong className="message-username">
//                     {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
//                   </strong>
//                   <span className="message-time">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                 </div>
//                 <div className="message-content">{msg.message}</div>
//               </div>
//             ))}
//             {receivedAudioMessages.map((msg, index) => (
//               <div key={index} className="message">
//                 <div className="message-header">
//                   <strong className="message-username">
//                     {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
//                   </strong>
//                   <span className="message-time">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                 </div>
//                 <div className="message-content">
//                   <audio src={msg.file_path} controls></audio>
//                 </div>
//               </div>
//             ))}
//             {receivedMediaMessages.map((msg, index) => (
//               <div key={index} className="message">
//                 <div className="message-header">
//                   <strong className="message-username">
//                     {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
//                   </strong>
//                   <span className="message-time">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                 </div>
//                 <div className="message-content">
//                   {msg.media_type === 'image' && <img className='media' src={msg.file_path} alt="Sent Image" />}
//                   {msg.media_type === 'video' && <video className='media'src={msg.file_path} controls></video>}
//                   {msg.media_type === 'file' && <a className='media'href={msg.file_path} target="_blank" rel="noopener noreferrer">Download File</a>}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="message-box">
//             {audioUrl && (
//               <div className="audio-container">
//                 <audio src={audioUrl} controls></audio>
//               </div>
//             )}
//             {recordingStatus === "recording" && <div className="recording-indicator">Recording audio...</div>}
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <button onClick={() => document.getElementById('fileInput').click()}>
//               <img src={fileIcon} alt="Send Media" />
//             </button>
//             <input
//               id="fileInput"
//               type="file"
//               multiple
//               style={{ display: 'none' }}
//               onChange={handleFileChange}
//             />
//             <button onClick={!permission ? getMicrophonePermission : (recordingStatus === "inactive" ? startRecording : stopRecording)}>
//               <img src={audioIcon} alt="Audio Button" />
//             </button>
//             <button onClick={sendMessageToServer}><img src={sendButton} alt="Send Button" /></button>
//           </div>
//         </>
//       ) : (
//         <div>User not registered</div>
//       )}
//     </div>
//   );
// };

// export default DirectProfileChat;
//can previw media filessssssssssssssssssssssss
// import React, { useEffect, useState, useRef } from 'react';
// import sendButton from "../resources/icons/sendButton.svg";
// import '../styles/profile.scss';
// import { 
//   sendMessages, 
//   receiveMessages, 
//   sendAudioMessage, 
//   receiveAudioMessages,
//   sendMedia,
//   getMedia
// } from "../services/msgs/DirectProfileChat";
// import { getProfileInfo } from "../services/users/directProfileChat";
// import userIcon from '../resources/icons/userIcon.svg';
// import audioIcon from '../resources/icons/mikeIcon.svg';
// import fileIcon from '../resources/icons/file.svg';
// import deleteIcon from "../resources/icons/dustbin.png"

// const mimeType = "audio/webm";

// const DirectProfileChat = ({ username }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [filePreviews, setFilePreviews] = useState([]);
//   const [profileData, setProfileData] = useState(null);
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [receivedAudioMessages, setReceivedAudioMessages] = useState([]);
//   const [receivedMediaMessages, setReceivedMediaMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [recordingStatus, setRecordingStatus] = useState("inactive");
//   const [permission, setPermission] = useState(false);
//   const mediaRecorder = useRef(null);
//   const [stream, setStream] = useState(null);
//   const [audioChunks, setAudioChunks] = useState([]);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await getProfileInfo(username);
//         setProfileData(response.data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };

//     const fetchMessages = async () => {
//       try {
//         const response = await receiveMessages(username);
//         setReceivedMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     const fetchAudioMessages = async () => {
//       try {
//         const response = await receiveAudioMessages(username);
//         setReceivedAudioMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching audio messages:', error);
//       }
//     };

//     const fetchMediaMessages = async () => {
//       try {
//         const response = await getMedia(username);
        
//         setReceivedMediaMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching media messages:', error);
//       }
//     };

//     fetchProfileData();
//     fetchMessages();
//     fetchAudioMessages();
//     fetchMediaMessages();
//   }, [username]);

//   const sendMessageToServer = async () => {
//     try {
//       if (audioBlob) {
//         const response = await sendAudioMessage(username, audioBlob);
//         const sentAudioMessage = response.data;
//         setReceivedAudioMessages((prevMessages) => [...prevMessages, sentAudioMessage]);
//         setAudioBlob(null);
//         setAudioUrl(null);
//       } else if (selectedFiles.length > 0) {
//         for (const file of selectedFiles) {
//           const mediaType = getMediaType(file.type);
//           const response = await sendMedia(mediaType, username, file);
//           const sentMediaMessage = response.data;
//           setReceivedMediaMessages((prevMessages) => [...prevMessages, sentMediaMessage]);
//         }
//         setSelectedFiles([]);
//         setFilePreviews([]);
//       } else if (message.trim()) {
//         const response = await sendMessages(username, message);
//         const sentMessage = response.data;
//         setReceivedMessages((prevMessages) => [...prevMessages, sentMessage]);
//         setMessage('');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const createBlobUrl = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const blobUrl = URL.createObjectURL(new Blob([reader.result], { type: file.type }));
//         resolve(blobUrl);
//       };
//       reader.onerror = reject;
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const getMicrophonePermission = async () => {
//     if ("MediaRecorder" in window) {
//       try {
//         const streamData = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: false,
//         });
//         setPermission(true);
//         setStream(streamData);
//       } catch (err) {
//         alert(err.message);
//       }
//     } else {
//       alert("The MediaRecorder API is not supported in your browser.");
//     }
//   };

//   const startRecording = async () => {
//     setRecordingStatus("recording");
//     const media = new MediaRecorder(stream, { type: mimeType });
//     mediaRecorder.current = media;
//     mediaRecorder.current.start();
//     let localAudioChunks = [];
//     mediaRecorder.current.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         localAudioChunks.push(event.data);
//       }
//     };
//     setAudioChunks(localAudioChunks);
//   };

//   const stopRecording = () => {
//     setRecordingStatus("inactive");
//     mediaRecorder.current.stop();
//     mediaRecorder.current.onstop = () => {
//       const audioBlob = new Blob(audioChunks, { type: mimeType });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       setAudioBlob(audioBlob);
//       setAudioUrl(audioUrl);
//       setAudioChunks([]);
//     };
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedFiles(files);
//     const filePreviews = files.map(file => URL.createObjectURL(file));
//     setFilePreviews(filePreviews);
//   };

//   const removeFile = (index) => {
//     const newSelectedFiles = [...selectedFiles];
//     newSelectedFiles.splice(index, 1);
//     setSelectedFiles(newSelectedFiles);

//     const newFilePreviews = [...filePreviews];
//     newFilePreviews.splice(index, 1);
//     setFilePreviews(newFilePreviews);
//   };

//   const getMediaType = (fileType) => {
//     if (fileType.startsWith('image')) {
//       return 'image';
//     } else if (fileType.startsWith('video')) {
//       return 'video';
//     } else {
//       return 'file';
//     }
//   };

//   return (
//     <div className="profile-container">
//       {profileData ? (
//         <>
//           <div className="profile-header">
//             <div className="profile-picture">
//               <img src={userIcon} alt="DirectProfileChat Picture" />
//             </div>
//             <div className="username-container">
//               <div className="username" style={{ cursor: 'pointer' }}>
//                 {profileData.userData.username}
//               </div>
//               <div className={`status-indicator ${profileData.profileData.online_status ? 'true' : 'false'}`}></div>
//             </div>
//           </div>
//           <div className="description">{profileData.profileData.profile_description}</div>
//           <div className="conversation-info">
//             This conversation is between @{profileData.userData.username} and you. Check out their profile to know more about them.
//           </div>
//           <div className="messages-container">
//             {receivedMessages.map((msg, index) => (
//               <div key={index} className="message">
//                 <div className="message-header">
//                   <strong className="message-username">
//                     {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
//                   </strong>
//                   <span className="message-time">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                 </div>
//                 <div className="message-content">{msg.message}</div>
//               </div>
//             ))}
//             {receivedAudioMessages.map((msg, index) => (
//               <div key={index} className="message">
//                 <div className="message-header">
//                   <strong className="message-username">
//                     {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
//                   </strong>
//                   <span className="message-time">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                 </div>
//                 <div className="message-content">
//                   <audio src={msg.file_path} controls></audio>
//                 </div>
//               </div>
//             ))}
//             {receivedMediaMessages.map((msg, index) => (
//               <div key={index} className="message">
//                 <div className="message-header">
//                   <strong className="message-username">
//                     {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
//                   </strong>
//                   <span className="message-time">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                 </div>
//                 <div className="message-content">
//                   {msg.media_type === 'image' && <img className='media' src={msg.file_path} alt="Sent Image" />}
//                   {msg.media_type === 'video' && <video className='media' src={msg.file_path} controls></video>}
//                   {msg.media_type === 'file' && <a className='media' href={msg.file_path} target="_blank" rel="noopener noreferrer">Download File</a>}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="message-box">
//           {filePreviews.length > 0 && (
//             <div className="file-previews">
//               {filePreviews.map((preview, index) => (
//                 <div key={index} className="file-preview">
//                   {selectedFiles[index].type.startsWith('image') ? (
//                     <img className='file-preview' src={preview} alt={`Preview ${index}`} />
//                   ) : selectedFiles[index].type.startsWith('video') ? (
//                     <video className='file-preview' src={preview} controls />
//                   ) : (
//                     <a className='file-preview' href={preview} target="_blank" rel="noopener noreferrer">Preview File</a>
//                   )}
//                   <button onClick={() => removeFile(index)}>
//                   <img src={deleteIcon} alt="remove Button" />
//                     </button>
//                 </div>
//               ))}
//             </div>
//           )}
//             {audioUrl && (
//               <div className="audio-container">
//                 <audio src={audioUrl} controls></audio>
//               </div>
//             )}
//             {recordingStatus === "recording" && <div className="recording-indicator">Recording audio...</div>}
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <button onClick={() => document.getElementById('fileInput').click()}>
//               <img src={fileIcon} alt="Send Media" />
//             </button>
//             <input
//               id="fileInput"
//               type="file"
//               multiple
//               style={{ display: 'none' }}
//               onChange={handleFileChange}
//             />
//             <button onClick={!permission ? getMicrophonePermission : (recordingStatus === "inactive" ? startRecording : stopRecording)}>
//               <img src={audioIcon} alt="Audio Button" />
//             </button>
//             <button onClick={sendMessageToServer}><img src={sendButton} alt="Send Button" /></button>
            
//           </div>
         
//         </>
//       ) : (
//         <div>User not registered</div>
//       )}
//     </div>
//   );
// };

// export default DirectProfileChat;
import React, { useEffect, useState, useRef } from 'react';
import sendButton from "../resources/icons/sendButton.svg";
import '../styles/profile.scss';
import { 
  sendMessages, 
  receiveMessages, 
  sendAudioMessage, 
  receiveAudioMessages,
  sendMedia,
  getMedia
} from "../services/msgs/DirectProfileChat";
import { getProfileInfo } from "../services/users/directProfileChat";
import userIcon from '../resources/icons/userIcon.svg';
import audioIcon from '../resources/icons/mikeIcon.svg';
import fileIcon from '../resources/icons/file.svg';
import deleteIcon from "../resources/icons/dustbin.png"
import io from 'socket.io-client';
import {jwtDecode} from 'jwt-decode';

const mimeType = "audio/webm";

const DirectProfileChat = ({ username }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [receivedAudioMessages, setReceivedAudioMessages] = useState([]);
  const [receivedMediaMessages, setReceivedMediaMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const messagesEndRef = useRef(null);
  const [socket,setSocket]=useState(null)
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user.id; 
  //console.log(userId)

  useEffect(()=>{
   
    const newSocket=io("http://localhost:3003")
    setSocket(newSocket)

    return ()=>{
      newSocket.disconnect()
    }
    

  },[userId])

  useEffect(()=>{
    
    
    if(socket===null) return
    console.log(socket)
    socket.emit("addNewUser",userId);
    socket.on("getMessage", (data) => {
      setReceivedMessages((prevMessages) => [...prevMessages, {
        sender_id: data.senderId,
        message: data.message,
        created_at: new Date(),
        type: 'text'
      }]);
    });
    socket.on("getAudioMessage", (data) => {
      setReceivedAudioMessages((prevMessages) => [...prevMessages, {
        sender_id: data.senderId,
        file_path: data.audioMessage,
        created_at: new Date(),
        type: 'audio'
      }]);
    });
    socket.on("getMediaMessage", (data) => {
      setReceivedMediaMessages((prevMessages) => [...prevMessages, {
        sender_id: data.senderId,
        file_path: data.mediaMessage.file_path,
        media_type: data.mediaMessage.media_type,
        created_at: new Date(),
        type: 'media'
      }]);
    });
  },[socket])

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfileInfo(username);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await receiveMessages(username);
        setReceivedMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const fetchAudioMessages = async () => {
      try {
        const response = await receiveAudioMessages(username);
        setReceivedAudioMessages(response.data);
      } catch (error) {
        console.error('Error fetching audio messages:', error);
      }
    };

    const fetchMediaMessages = async () => {
      try {
        const response = await getMedia(username);
        setReceivedMediaMessages(response.data);
      } catch (error) {
        console.error('Error fetching media messages:', error);
      }
    };

    fetchProfileData();
    fetchMessages();
    fetchAudioMessages();
    fetchMediaMessages();
  }, [username]);
  useEffect(() => {
    scrollToBottom();
  }, [receivedMessages, receivedAudioMessages, receivedMediaMessages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const sendMessageToServer = async () => {
    try {
      if (audioBlob) {
        const response = await sendAudioMessage(username, audioBlob);
        const sentAudioMessage = response.data;
        setReceivedAudioMessages((prevMessages) => [...prevMessages, sentAudioMessage]);
        setAudioBlob(null);
        setAudioUrl(null);
        socket.emit("sendAudioMessage", {
          senderId: userId,
          receiverId: profileData.userData.id,
          audioMessage: sentAudioMessage.file_path
        });
      } else if (selectedFiles.length > 0) {
        const mediaMessages = [];
        for (const file of selectedFiles) {
          const mediaType = getMediaType(file.type);

          const response = await sendMedia(mediaType, username, file);
          const sentMediaMessage = response.data;
          console.log(sentMediaMessage)
          mediaMessages.push(sentMediaMessage);
          socket.emit("sendMediaMessage", {
            senderId: userId,
            receiverId: profileData.userData.id,
            mediaMessage: {
              file_path: sentMediaMessage.file_path,
              media_type: sentMediaMessage.media_type
            }
          });
        }
        setReceivedMediaMessages((prevMessages) => [...prevMessages, ...mediaMessages]);
        setSelectedFiles([]);
        setFilePreviews([]);
       
      } else if (message.trim()) {
        const response = await sendMessages(username, message);
        const sentMessage = response.data;
        setReceivedMessages((prevMessages) => [...prevMessages, sentMessage]);
        setMessage('');
        socket.emit("sendMessage", {
          senderId: userId,
          receiverId: profileData.userData.id,
          message: sentMessage.message
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createBlobUrl = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const blobUrl = URL.createObjectURL(new Blob([reader.result], { type: file.type }));
        resolve(blobUrl);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { type: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        localAudioChunks.push(event.data);
      }
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioBlob(audioBlob);
      setAudioUrl(audioUrl);
      setAudioChunks([]);
    };
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setFilePreviews(filePreviews);
  };

  const removeFile = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);

    const newFilePreviews = [...filePreviews];
    newFilePreviews.splice(index, 1);
    setFilePreviews(newFilePreviews);
  };

  const getMediaType = (fileType) => {
    if (fileType.startsWith('image')) {
      return 'image';
    } else if (fileType.startsWith('video')) {
      return 'video';
    } else {
      return 'file';
    }
  };

  const combineAndSortMessages = () => {
    const allMessages = [
      ...receivedMessages.map(msg => ({ ...msg, type: 'text' })),
      ...receivedAudioMessages.map(msg => ({ ...msg, type: 'audio' })),
      ...receivedMediaMessages.map(msg => ({ ...msg, type: 'media' })),

    ];
console.log(allMessages)
    return allMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  };

  return (
    <div className="profile-container">
      {profileData ? (
        <>
          <div className="profile-header">
            <div className="profile-picture">
              <img src={userIcon} alt="DirectProfileChat Picture" />
            </div>
            <div className="username-container">
              <div className="username" style={{ cursor: 'pointer' }}>
                {profileData.userData.username}
              </div>
              <div className={`status-indicator ${profileData.profileData.online_status ? 'true' : 'false'}`}></div>
            </div>
          </div>
          <div className="description">{profileData.profileData.profile_description}</div>
          <div className="conversation-info">
            This conversation is between @{profileData.userData.username} and you. Check out their profile to know more about them.
          </div>
          <div className="messages-container">
            {combineAndSortMessages().map((msg, index) => (
              <div key={index} className="message">
                <div className="message-header">
                  <strong className="message-username">
                    {msg.sender_id === profileData.userData.id ? profileData.userData.username : 'You'}
                  </strong>
                  <span className="message-time">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="message-content">
                  {msg.type === 'text' && msg.message}
                  {msg.type === 'audio' && <audio src={msg.file_path} controls></audio>}
                  {msg.type === 'media' && (
                    <>
                      {msg.media_type === 'image' && <img className='media' src={msg.file_path} alt="Sent Image" />}
                      {msg.media_type === 'video' && <video className='media' src={msg.file_path} controls></video>}
                      {msg.media_type === 'file' && <a className='media' href={msg.file_path} target="_blank" rel="noopener noreferrer">Download File</a>}
                    </>
                  )}
                </div>
              </div>
            ))}
             <div ref={messagesEndRef} />
          </div>
          <div className="message-box">
          {filePreviews.length > 0 && (
            <div className="file-previews">
              {filePreviews.map((preview, index) => (
                <div key={index} className="file-preview">
                  {selectedFiles[index].type.startsWith('image') ? (
                    <img className="file-preview" src={preview} alt={`Preview ${index}`} />
                  ) : selectedFiles[index].type.startsWith('video') ? (
                    <video className="file-preview"src={preview} controls />
                  ) : (
                    <a className="file-preview"href={preview} target="_blank" rel="noopener noreferrer">Preview File</a>
                  )}
                  <button onClick={() => removeFile(index)}>
                  <img src={deleteIcon} alt="del Media" /></button>
                </div>
              ))}
            </div>
          )}
            {audioUrl && (
              <div className="audio-container">
                <audio src={audioUrl} controls></audio>
              </div>
            )}
            {recordingStatus === "recording" && <div className="recording-indicator">Recording audio...</div>}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder=""
            />
            <button onClick={() => document.getElementById('fileInput').click()}>
              <img src={fileIcon} alt="Send Media" />
            </button>
            <input
              id="fileInput"
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button onClick={!permission ? getMicrophonePermission : (recordingStatus === "inactive" ? startRecording : stopRecording)}>
              <img src={audioIcon} alt="Audio Button" />
            </button>
            <button onClick={sendMessageToServer}><img src={sendButton} alt="Send Button" /></button>
          </div>
          
        </>
      ) : (
        <div>User not registered</div>
      )}
    </div>
  );
};

export default DirectProfileChat;
