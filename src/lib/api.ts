import axios from 'axios';

const getBaseURL = () => {
  if (typeof window === 'undefined') return 'http://localhost:5211'; // SSR
  
  const isHttps = window.location.protocol === 'https:';
  const port = isHttps ? 7209 : 5211;
  const host = window.location.hostname; // Pega localhost ou IP automaticamente
  
  return `${isHttps ? 'https' : 'http'}://${host}:${port}`;
};

const api = axios.create({
  baseURL: process.env.API_BASE_URL || getBaseURL(),
  withCredentials: true,
});

export default api;