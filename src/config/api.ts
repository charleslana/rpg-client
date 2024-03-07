import axios, { AxiosError } from 'axios';
import { getToken, removeToken } from '../utils/localStorageUtils';

const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 429) {
        removeToken();
        location.reload();
      }
      if (error.response.status === 403 || error.response.status === 422) {
        location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
