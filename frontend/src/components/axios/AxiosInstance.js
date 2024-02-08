import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/user/AuthenticationSlice';

const AxiosInstance = () => {
  const user = useSelector(selectUser);
  const refreshToken = user.refresh;
  const accessToken = user.access;

  const commonHeaders = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8002/api/',
    headers: commonHeaders,
  });

  const bookingInstance = axios.create({
    baseURL: 'http://127.0.0.1:8002/api/',
    headers: commonHeaders,
  });

  const serviceInstance = axios.create({
    baseURL: 'http://127.0.0.1:8001/api/',
   
  });

  const chatInstance = axios.create({
    baseURL: 'http://127.0.0.1:8003/api/',
    headers: commonHeaders,
  });

  const checkInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/token/refresh',
    headers: commonHeaders,
  });

  const authenticationInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: commonHeaders,
  });

  return {
    axiosInstance,
    bookingInstance,
    serviceInstance,
    chatInstance,
    checkInstance,
    authenticationInstance,
  };
};

export default AxiosInstance;
