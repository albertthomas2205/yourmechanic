import React, { useState, useEffect } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { GoogleLogin } from '@react-oauth/google';
import { set_Authentication } from "../../Redux/user/AuthenticationSlice"; // Update the path
import { set_AdminAuthentication } from "../../Redux/Admin/AdminAuthenticationSlice";

import HeaderUser from "../../components/user/Headeruser";

const Mechanicloginpage = () => {

  const name  ="Mechanic"
  {  
    if (name === "user"){
        var url = "login/"
    }
   
    else if (name === "Mechanic"){
      url = "mechaniclogin/"
    }
    else{
      url = "adminlogin/"
    }
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState([]);
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogin = async (event) => {
    event.preventDefault();
    setFormError([]);

    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/${url}`, { email, password });
      if (res.status === 200) {
        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
        console.log(res.data);
        dispatch(
          set_Authentication({
            first_name: res.data.first_name,
            isAuthenticated: true,
            id : res.data.id,
            isAdmin:res.data.is_admin,
            is_user: res.data.is_user,
            accessToken: res.data.access,
            user:res.data

          })
        );
        {
          if (res.data.is_admin){
            console.log(res.data.is_admin)
              dispatch(
              set_AdminAuthentication({
                isAdminAuthenticated:res.data.is_admin,
                isAdmin: true,
              
              })

              )
              navigate('/admin/');
        return res;
          }else if (res.data.is_user){
            navigate('/');
          }
          else{
            navigate('/mechanic/profile/')
          }
        }
      
      }
    } catch (error) {
      console.log("Error in login:", error);

      if (error.response && error.response.status > 300) {
        console.log("Server error:", error.response.data);
        setFormError([error.response.data.detail]);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };
  const handleregister = ()=>{
    navigate('/signup/',{state:{name}})
  }
  const handlegoogleLogin = async () => {
    setFormError([]);
  
    try {
      if (profile && profile.email && profile.name) {
        const res = await axios.post('http://127.0.0.1:8000/api/googlelogin/', {
          email: profile.email,
          password: profile.name,
          first_name: profile.name
        });
  
        if (res.status === 200) {
          localStorage.setItem('access', res.data.access);
          localStorage.setItem('refresh', res.data.refresh);
          console.log(res.data);
          
          console.log(res.data.is_admin,res.data.access,res.data.id,res.data.is_user)
          dispatch(
            set_Authentication({
              first_name: res.data.first_name,
              isAuthenticated: true,
              id: res.data.id,
              is_user: res.data.is_user,
              accessToken: res.data.access,
            })
          );
          navigate('/');
          return res;
        }
      } else {
        console.log('Profile or its properties are missing.');
      }
    } catch (error) {
      console.log("Error in Google login:", error);

      if (error.response && error.response.status === 401) {
        console.log("Google login failed:", error.response.data);
        setFormError([error.response.data.detail]);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          console.log(res.data.name);
          setProfile(res.data);
          handlegoogleLogin();
        })
        .catch((err) => console.log(err));
    }
  }, );

  const responseMessage = (response) => {
    console.log(response);
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (

    <>
      <HeaderUser />
   
      <div style={{ marginTop: '10rem', }}
className="max-w-md mx-auto bg-white  p-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">  Sign In </h2>
        {formError.length > 0 && (
          <div className="text-red-500 text-center mb-3">
            {formError.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="text-blue-gray-500 text-sm">
              Email
            </label>
            <Input
              type="email"
              color="blue"
              placeholder="Enter your email"
              required
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-blue-gray-500 text-sm">
              Password
            </label>
            <Input
              type="password"
              color="blue"
              placeholder="Enter your password"
              required
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            color="blue"
            size="regular"
            ripple="light"
            className="w-full mb-4"
          >
            Sign In
          </Button>
         
          <div>
          { name === 'user' ? (
    <button onClick={() => login()}>Sign in with Google 🚀 </button>
  ) : null}
          </div>
     
        </form>
        <br/>
        {name === 'Mechanic' || name === 'user' ? (
        <div style={{ cursor: 'pointer' }}>

          Don't have an account?
          <a onClick={handleregister}>Register</a>
        </div>):null}
      </div>
    
    </>
  
  );
};

export default Mechanicloginpage;
