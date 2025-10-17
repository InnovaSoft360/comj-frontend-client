// lib/api.ts
import axios from 'axios';
import { API_CONFIG } from './config';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  withCredentials: true,
});

export default api;