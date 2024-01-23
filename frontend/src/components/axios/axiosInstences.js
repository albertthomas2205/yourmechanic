import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8002/api/',  // Your base URL
});

export default instance;