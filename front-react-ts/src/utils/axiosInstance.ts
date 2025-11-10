import axios from 'axios';
import { HOST_API_BASE_URL } from './globalConfig';

const api = axios.create({
  baseURL: HOST_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response) || 'Unexpected error occurred')
);

export default api;