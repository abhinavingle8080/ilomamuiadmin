import axios from 'axios';

import { getAccessToken } from '../utils/jwt';
import { API_URL, SECRET_KEY } from '../config/constants';

const postMethod = (url, data) => {
  const axiosConfig = {
    url: `${API_URL}${url}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-secret-key': SECRET_KEY,
      Authorization: `Bearer ${getAccessToken()}`,
    },
    data
  };
  return axios(axiosConfig);
};

const getMethod = (url, data) => {
  const axiosConfig = {
    url: `${API_URL}${url}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-secret-key': SECRET_KEY,
    },
    params: data,
  };

  return axios(axiosConfig);
};

const postFormDataMethod = (url, data) => {
  const axiosConfig = {
    url: `${API_URL}${url}`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      'x-secret-key': SECRET_KEY,
      Authorization: `Bearer ${getAccessToken()}`,
    },
    data
  };

  return axios(axiosConfig);
};

const getFileResponse = (url) => {
  const axiosConfig = {
    url,
    method: 'get',
    responseType: 'blob',
  };

  return axios(axiosConfig);
};

export {getMethod,  postMethod, getFileResponse, postFormDataMethod, };
