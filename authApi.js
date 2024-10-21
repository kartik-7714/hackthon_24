import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register user
export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

// Login user
export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

// Validate token
export const validateToken = async (token) => {
  return axios.get(`${API_URL}/validate-token`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Logout user (client-side only)
export const logoutUser = () => {
  // Remove token from local storage
  localStorage.removeItem('token');
  // You might want to invalidate the token on the server as well
};
