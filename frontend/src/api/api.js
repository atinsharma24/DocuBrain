import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return API.post('/upload', formData);
};

export const askQuery = (query) => {
  return API.post('/query', { query });
};

