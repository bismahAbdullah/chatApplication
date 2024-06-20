import axios from 'axios';

const API_URL = 'http://localhost:3002';

const getToken = () => localStorage.getItem('token');

export const getProfile = async (username) => {
    try{
        const response=axios.get(`${API_URL}/profile/getProfileInfo/${username}`)
        return response;

    }
    catch(error){
        throw error
    }
   
};

export const updateProfile = async (username, formData) => {
    try {
        const response = await axios.put(`${API_URL}/profile/updateProfile/${username}`, {
          displayName: formData.displayName,
          updatedUsername: formData.updatedUsername,
          profileDescription: formData.profileDescription
        });
        return response;
      } catch (error) {
        throw error;
      }
    
};

export const updateProfileContact = async (username, formData) => {
    try {
        const response = await axios.put(`${API_URL}/profile/updateProfileEmail/${username}`, {
          email: formData.email,
          phoneNumber: formData.phoneNumber
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    
};
