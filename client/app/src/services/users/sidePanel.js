import axios from 'axios';

const API_URL = 'http://localhost:3002';

const getToken = () => localStorage.getItem('token');

export const getUsers = async () => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/user/getUsers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.usernames;
};

export const getProfileInfo = async (username) => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/profile/getProfileInfo/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data)
    return response.data;
    
};
