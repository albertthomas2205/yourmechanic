import axios from 'axios';
import { selectUser } from '../../Redux/user/AuthenticationSlice';
import { useSelector } from 'react-redux';



const authentication = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
})

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


const chat = axios.create({
  baseURL: 'http://127.0.0.1:8003/api/',
})