import axios from 'axios';

const BASE_URL =
  "https://express-test-git-main-sahu1994s-projects.vercel.app"; 

const instance = axios.create({
  baseURL: BASE_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  },
})

export default instance;
