import axios from 'axios';

const API_URL = 'https://healthsphere-zomd.onrender.com';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
};

export const healthAPI = {
    getTodayData: () => api.get('/health/today'),
    updateHealthData: (data) => api.post('/health/update', data),
    getHistory: () => api.get('/health/history'),
};

export default api;