import axios from 'axios';

const baseURL = 'http://localhost:8080';

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});
