import React, { useEffect, useState, useRef } from 'react';
import sendButton from "../resources/icons/sendButton.svg";
import '../styles/groupChat.scss';
import userIcon from '../resources/icons/userIcon.svg';
import audioIcon from '../resources/icons/mikeIcon.svg';
import fileIcon from '../resources/icons/file.svg';
import deleteIcon from "../resources/icons/dustbin.png";
import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';

const mimeType = "audio/webm";

const GroupChat = ({ groupId }) => {
  const [profileData, setProfileData] = useState(null);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    // Fetch group details or messages using groupId
  }, [groupId]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="username-container">
          <div className="username" style={{ cursor: 'pointer' }}>
            {groupId}
          </div>
        </div>
        <div className="conversation-info">
        This conversation is within {groupId}. Share your thoughts here.
      </div>
      </div>
    
      
      <div className="messages-container">
        {/* Render messages here */}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-box">
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
        />
        <button >
          <img src={audioIcon} alt="Audio Button" />
        </button>
        <button ><img src={sendButton} alt="Send Button" /></button>
      </div>
    </div>
  );
};

export default GroupChat;
