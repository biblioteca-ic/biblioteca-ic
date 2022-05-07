import axios from 'axios';
import { getToken } from './auth';

console.log('A .env eh', process.env.REACT_APP_BASE_URL_API);

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
});

api.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers['x-access-token'] = `${token}`;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export { api };
