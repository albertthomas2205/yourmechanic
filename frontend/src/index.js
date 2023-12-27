import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-tailwind/react";
import userStore from "./Redux/Store/UserStore";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
const theme = {
  component: {

    styles: {backgroundColor:"red"}
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <GoogleOAuthProvider clientId="71500294553-u6le4ugdlbonld1htn7ejei3i8gj9n1n.apps.googleusercontent.com">
    <ThemeProvider>
    <Provider store={userStore}>
     <App />
     </Provider>
    </ThemeProvider>
    </GoogleOAuthProvider>
 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
