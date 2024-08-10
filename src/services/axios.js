import axios from 'axios';

const BASE_URL = "https://express-test-git-main-sahu1994s-projects.vercel.app"; 

const instance = axios.create({
  baseURL: BASE_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
   // 'Authorization': `Bearer ${localStorage.getItem("token")}`
  },
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
