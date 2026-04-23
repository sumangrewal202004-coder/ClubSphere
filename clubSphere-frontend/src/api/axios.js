import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Axios request interceptor - token:', token ? 'present' : 'missing');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers['Content-Type'] = 'application/json';

  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('Axios response error:', err.response?.status, err.response?.data);
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;