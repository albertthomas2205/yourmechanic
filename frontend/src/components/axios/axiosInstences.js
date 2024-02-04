import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8002/api/',  // Your base URL
});

export default instance;

const booking = axios.create({
  baseURL: 'http://127.0.0.1:8002/api/',
});

export  {booking};

const service =  axios.create({
  baseURL: 'http://127.0.0.1:8001/api/',
})

export {service}

const user = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
})

const chat = axios.create({
  baseURL: 'http://127.0.0.1:8003/api/',
})