import axios from 'axios';

const customApi = axios.create({
  baseURL: 'http://127.0.0.1:3000/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default customApi;
