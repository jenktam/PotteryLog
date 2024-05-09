import axios from 'axios';

// can prevent making repeat calls to axios using this method
export const makeRequest = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true, // need because using cookies
});
