import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8081/api/v1.0/admin',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('jwt_token');
    const clonedConfig = { ...config };
    clonedConfig.headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      clonedConfig.headers['Authorization'] = `Bearer ${token}`;
    }
    return clonedConfig;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    const statusCode = error?.message;
    if (statusCode === '404') {
      window.location.href = '/not-found';
      return;
    }
    if (statusCode === '401') {
      window.location.href = '/login';
      return;
    }

    if (statusCode === '403') {
      window.location.href = '/forbidden';
      return;
    }

    if (statusCode === '500') {
      // show notification
      console.log('error', error);
    }

    throw error;
  }
);

export default axiosClient;
