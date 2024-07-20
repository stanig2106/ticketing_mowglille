import axios, { AxiosError } from 'axios';

axios.defaults.timeout = 5 * 1000; // 5 seconds
axios.interceptors.request.use(
  (config) => {
    config.url = `/api${config.url}`;

    config.params = {
      token: localStorage.getItem('token'),
      ...(config.params || {})
    };

    if (process.env.DEV) config.baseURL = 'http://localhost:3333';

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error as Error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error as Error);
  }
);
