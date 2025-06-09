import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: false, // ostavi false jer ne koristiš još cookie/session auth
});

export default api;
