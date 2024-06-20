import axios from 'axios';

const API_URL = 'http://localhost:3002';

const getToken = () => localStorage.getItem('token');



export const receiveMessages = async (username) => {
    try{
        const token = getToken();
        const response = await axios.get(`${API_URL}/message/receiveMessages/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        console.log(response.data)
        return response;
    }
    catch(error)
    {throw error}
   
    
};
export const sendMessages = async (username,message) => {
    try{
        const token = getToken();
        const response = await axios.post(`${API_URL}/message/sendMessages`, {
            receiverUsername: username,
            message
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
    
        console.log(response.data)
        return response;
        
    }
    catch(error)
    {throw error}
   
};
export const receiveAudioMessages = async (username) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/message/getAudio/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      console.error('Error receiving audio messages:', error);
      throw error;
    }
  };
export const sendAudioMessage = async (username, audioUrl) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('audio', audioUrl);
      formData.append('receiverUsername', username);
      console.log(audioUrl)
  
      const response = await axios.post(`${API_URL}/message/sendAudio`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    //   const response = await axios.post(`${API_URL}/message/sendAudio`, {
    //     receiverUsername: username,
    //     audioUrl
    //   }, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
      return response;
    } catch (error) {
      console.error('Error sending audio message:', error);
      throw error;
    }
  };
  export const sendMedia = async (mediaType, receiverUsername, mediaUrl) => {
    try {
      const token = getToken();
      console.log(receiverUsername,mediaType)
      const formData = new FormData();
     // formData.append('mediaType', mediaType);
      formData.append('receiverUsername', receiverUsername);
      formData.append('media', mediaUrl);
      for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
      }
  
      const response = await axios.post(`${API_URL}/message/sendMedia`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
         
        },
        params: {
            mediaType: mediaType, // Pass mediaType as a query parameter
          },
      });
  
      return response; // Assuming your backend sends back a JSON response with mediaUrl
    } catch (error) {
      console.error('Error sending media:', error);
      throw error;
    }
  };
  
  export const getMedia = async (receiverUsername) => {
    try {
      const token = getToken();
  
      const response = await axios.get(`${API_URL}/message/getMedia/${receiverUsername}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return response; // Assuming your backend sends back an array of media messages
    } catch (error) {
      console.error('Error fetching media:', error);
      throw error;
    }
  };