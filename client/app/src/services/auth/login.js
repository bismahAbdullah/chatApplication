import axios from 'axios';

const API_URL = 'http://localhost:3002';

const getToken = () => localStorage.getItem('token');


export const loginApi = async (email,password) => {
    const token = getToken();
    const response = await axios.post(`${API_URL}/user/login`, { email, password })
    console.log(response.data)
    return response;
    
};
