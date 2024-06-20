import axios from 'axios';

const API_URL = 'http://localhost:3002';

const getToken = () => localStorage.getItem('token');


export const checkUsernameAvailability = async (username) => {
    try{
       
    const response = axios.post(`${API_URL}/user/signup`, { username })
    return response;

    } catch(error)
    {
        throw error
    }
    
    
};
export const signUpAPi = async (email,password,displayName,username) => {
    try{
       
    const response = axios.post(`${API_URL}/user/signup`, { email, password, displayName, username })
    return response;

    } catch(error)
    {
        throw error
    }
    
    
};
