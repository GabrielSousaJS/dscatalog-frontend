import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { getAuthData } from './storage';

export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog123';

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  const params: AxiosRequestConfig = {
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    },
  };

  return axios(params);
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: `Bearer ${getAuthData().access_token}`,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};



axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      window.location.href = 'http://localhost:3000/admin/auth';
    }
    return Promise.reject(error);
  }
);