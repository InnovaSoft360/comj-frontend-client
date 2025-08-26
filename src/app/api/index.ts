import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5027',
  withCredentials: true, 
});

export default api;