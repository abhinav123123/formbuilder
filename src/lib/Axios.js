import axios from 'axios';
import { BASE_URL } from '../constants';

const Axios = axios.create({
  baseURL: BASE_URL, // our API base URL
});

// Request interceptor for adding the bearer token
Axios.interceptors.request.use(
  (config) => {
    config.headers.version = "rsh"
    const token = sessionStorage.getItem('accessToken'); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    if (response?.data?.status?.code == 200) {
      return response.data.data
    } else if (!response?.data?.status && response.status === 200) {
      return response.data
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Export the api instance
export default Axios;
