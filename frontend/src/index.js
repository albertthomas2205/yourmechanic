import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-tailwind/react";
import userStore, { persistor } from "./Redux/Store/UserStore";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
const theme = {
  navbar: {
    styles: {
      base: {
        navbar: {
          initial: {
            display: "block",
            width: "w-full",
            maxWidth: "max-w-[95%]",
            borderRadius: "rounded-xl",
            py: "py-4",
            px: "px-8",
          },
          shadow: {
            boxShadow: "shadow-md",
          },
          blurred: {
            backdropFilter: "backdrop-saturate-200 backdrop-blur-2xl",
            bgOpacity: "bg-opacity-80",
            borderWidth: "border",
            borderColor: "border-white/80",
          },
          fullWidth: {
            width: "w-full",
            maxWidth: "max-w-full",
            rounded: "rounded-none",
            px: "px-4",
          },
        },
        mobileNav: {
          display: "block",
          width: "w-full",
          basis: "basis-full",
          overflow: "overflow-hidden",
        },
      },
      variants: {
        filled: {
          transparent: {
            backgroud: "bg-transparent",
            color: "text-white",
            boxShadow: "shadow-none",
          },
          white: {
            backgroud: "bg-white",
            color: "text-white",
          },
          "blue-gray": {
            backgroud: "bg-blue-gray-500",
            color: "text-white",
          },
          gray: {
            backgroud: "bg-gray-500",
            color: "text-white",
          },
          brown: {
            backgroud: "bg-brown-500",
            color: "text-white",
          },
          "deep-orange": {
            backgroud: "bg-deep-orange-500",
            color: "text-white",
          },
          orange: {
            backgroud: "bg-orange-500",
            color: "text-white",
          },
          amber: {
            backgroud: "bg-amber-500",
            color: "text-black",
          },
          yellow: {
            backgroud: "bg-yellow-500",
            color: "text-black",
          },
          lime: {
            backgroud: "bg-lime-500",
            color: "text-black",
          },
          "light-green": {
            backgroud: "bg-light-green-500",
            color: "text-white",
          },
          green: {
            backgroud: "bg-green-500",
            color: "text-white",
          },
          teal: {
            backgroud: "bg-teal-500",
            color: "text-white",
          },
          cyan: {
            backgroud: "bg-cyan-500",
            color: "text-white",
          },
          "light-blue": {
            backgroud: "bg-light-blue-500",
            color: "text-white",
          },
          blue: {
            backgroud: "bg-blue-500",
            color: "text-white",
          },
          indigo: {
            backgroud: "bg-indigo-500",
            color: "text-white",
          },
          "deep-purple": {
            backgroud: "bg-deep-purple-500",
            color: "text-white",
          },
          purple: {
            backgroud: "bg-purple-500",
            color: "text-white",
          },
          pink: {
            backgroud: "bg-pink-500",
            color: "text-white",
          },
          red: {
            backgroud: "bg-red-500",
            color: "text-white",
          },
        },
        gradient: {
          transparent: {
            backgroud: "bg-transparent",
            color: "text-blue-gray-900",
            boxShadow: "shadow-none",
          },
          white: {
            backgroud: "bg-white",
            color: "text-blue-gray-900",
          },
          "blue-gray": {
            backgroud: "bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400",
            color: "text-white",
          },
          gray: {
            backgroud: "bg-gradient-to-tr from-gray-600 to-gray-400",
            color: "text-white",
          },
          brown: {
            backgroud: "bg-gradient-to-tr from-brown-600 to-brown-400",
            color: "text-white",
          },
          "deep-orange": {
            backgroud: "bg-gradient-to-tr from-deep-orange-600 to-deep-orange-400",
            color: "text-white",
          },
          orange: {
            backgroud: "bg-gradient-to-tr from-orange-600 to-orange-400",
            color: "text-white",
          },
          amber: {
            backgroud: "bg-gradient-to-tr from-amber-600 to-amber-400",
            color: "text-black",
          },
          yellow: {
            backgroud: "bg-gradient-to-tr from-yellow-600 to-yellow-400",
            color: "text-black",
          },
          lime: {
            backgroud: "bg-gradient-to-tr from-lime-600 to-lime-400",
            color: "text-black",
          },
          "light-green": {
            backgroud: "bg-gradient-to-tr from-light-green-600 to-light-green-400",
            color: "text-white",
          },
          green: {
            backgroud: "bg-gradient-to-tr from-green-600 to-green-400",
            color: "text-white",
          },
          teal: {
            backgroud: "bg-gradient-to-tr from-teal-600 to-teal-400",
            color: "text-white",
          },
          cyan: {
            backgroud: "bg-gradient-to-tr from-cyan-600 to-cyan-400",
            color: "text-white",
          },
          "light-blue": {
            backgroud: "bg-gradient-to-tr from-light-blue-600 to-light-blue-400",
            color: "text-white",
          },
          blue: {
            backgroud: "bg-gradient-to-tr from-blue-600 to-blue-400",
            color: "text-white",
          },
          indigo: {
            backgroud: "bg-gradient-to-tr from-indigo-600 to-indigo-400",
            color: "text-white",
          },
          "deep-purple": {
            backgroud: "bg-gradient-to-tr from-deep-purple-600 to-deep-purple-400",
            color: "text-white",
          },
          purple: {
            backgroud: "bg-gradient-to-tr from-purple-600 to-purple-400",
            color: "text-white",
          },
          pink: {
            backgroud: "bg-gradient-to-tr from-pink-600 to-pink-400",
            color: "text-white",
          },
          red: {
            backgroud: "bg-gradient-to-tr from-red-600 to-red-400",
            color: "text-white",
          },
        },
      },
    },
  },

  dialog: {
    defaultProps: {
      size: "md",
      dismiss: {},
      animate: {
        unmount: {},
        mount: {},
      },
      className: "",
    },
    valid: {
      sizes: ["xs", "sm", "md", "lg", "xl", "xxl"],
    },
    styles: {
      base: {
        backdrop: {
          display: "grid",
          placeItems: "place-items-center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "w-screen",
          height: "h-screen",
          backgroundColor: "bg-black",
          backgroundOpacity: "bg-opacity-10",
          backdropFilter: "backdrop-blur-sm",
        },
        container: {
          position: "relative",
          bg: "bg-white",
          m: "m-4",
          borderRadius: "rounded-lg",
          boxShadow: "shadow-2xl",
          color: "text-blue-gray-500",
          fontSmoothing: "antialiased",
          fontFamily: "font-sans",
          fontSize: "text-base",
          fontWeight: "font-light",
          lineHeight: "leading-relaxed",
        },
      },
      sizes: {
        xs: {
          width: "w-full md:w-3/5 lg:w-2/5 2xl:w-1/4",
          minWidth: "min-w-[80%] md:min-w-[60%] lg:min-w-[40%] 2xl:min-w-[25%]",
          maxWidth: "max-w-[80%] md:max-w-[60%] lg:max-w-[40%] 2xl:max-w-[25%]",
        },
        sm: {
          width: "w-full md:w-2/3 lg:w-2/4 2xl:w-1/3",
          minWidth: "min-w-[80%] md:min-w-[66.666667%] lg:min-w-[50%] 2xl:min-w-[33.333333%]",
          maxWidth: "max-w-[80%] md:max-w-[66.666667%] lg:max-w-[50%] 2xl:max-w-[33.333333%]",
        },
        md: {
          width: "w-full md:w-3/4 lg:w-3/5 2xl:w-2/5",
          minWidth: "min-w-[90%] md:min-w-[75%] lg:min-w-[60%] 2xl:min-w-[40%]",
          maxWidth: "max-w-[90%] md:max-w-[75%] lg:max-w-[60%] 2xl:max-w-[40%]",
        },
        lg: {
          width: "w-full md:w-5/6 lg:w-3/4 2xl:w-3/5",
          minWidth: "min-w-[90%] md:min-w-[83.333333%] lg:min-w-[75%] 2xl:min-w-[60%]",
          maxWidth: "max-w-[90%] md:max-w-[83.333333%] lg:max-w-[75%] 2xl:max-w-[60%]",
        },
        xl: {
          width: "w-full md:w-5/6 2xl:w-3/4",
          minWidth: "min-w-[95%] md:min-w-[83.333333%] 2xl:min-w-[75%]",
          maxWidth: "max-w-[95%] md:max-w-[83.333333%] 2xl:max-w-[75%]",
        },
        xxl: {
          display: "flex",
          flexDirection: "flex-col",
          width: "w-screen",
          minWidth: "min-w-[100vw]",
          maxWidth: "max-w-[100vw]",
          height: "h-screen",
          minHeight: "min-h-[100vh]",
          maxHeight: "max-h-[100vh]",
          m: "m-0",
          borderRadius: "rounded-none",
        },
      },
    },
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <GoogleOAuthProvider clientId="71500294553-u6le4ugdlbonld1htn7ejei3i8gj9n1n.apps.googleusercontent.com">
    <ThemeProvider value={theme}>
    <Provider store={userStore}>
      <PersistGate loading={null} persistor={persistor}>
     <App />
     </PersistGate>
     </Provider>
    </ThemeProvider>
    </GoogleOAuthProvider>
 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
