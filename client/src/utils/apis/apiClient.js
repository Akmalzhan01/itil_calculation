import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://itil-calculation.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;