import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(
  config => {
    // Add token if available
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//  Response interceptor
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized (logout, redirect, etc.)
      console.error('Unauthorized! Redirecting to login...');
    }
    return Promise.reject(error);
  }
);
export default api;
