import axios from 'axios';




const authentication = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
})
export {authentication}

// const instance = axios.create({
//   baseURL: 'http://127.0.0.1:8002/api/',  // Your base URL
// });

// export default instance;

const bookinginstance = axios.create({
  baseURL: 'http://127.0.0.1:8002/api/booking/',
});

export  {bookinginstance};

const admininstance =  axios.create({
  baseURL: 'http://127.0.0.1:8001/api/admin/',
})

export {admininstance}


const chatinstance = axios.create({
  baseURL: 'http://127.0.0.1:8003/api/chat/',
})

export {chatinstance}