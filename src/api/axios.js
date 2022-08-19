import axios from 'axios';
import { USER_TOKEN_KEY } from 'redux/contants';

const headers = { 'Content-Type': 'application/json' };
if (localStorage.getItem(USER_TOKEN_KEY)) {
  headers.Authorization = `Bearer ${localStorage.getItem(USER_TOKEN_KEY)}`;
}

const api = axios.create({
  baseURL: 'https://metatradas.herokuapp.com/api/',
  headers,
});

export default api;
