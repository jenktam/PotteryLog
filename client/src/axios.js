import axios from 'axios';

export const makeRequest = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true, // Need because using cookies
});
