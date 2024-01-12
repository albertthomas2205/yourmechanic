import { Route,Routes } from "react-router-dom";
import React from 'react'
import Home from "../../pages/User/Home";
import { Login } from "../../components/user/Login";
import SignIn from "../../components/user/Signin";
import Service from "../../pages/User/Service";
import SigninUser from "../../pages/User/SigninUser";
import Signup from "../../pages/User/Signup";
import Otp from "../../pages/User/Otp";
import Adminhome from "../../pages/Adminpages/Adminhome";
import Admin from "../../pages/Adminpages/Admin";
import Profile from "../../pages/User/Profile";
import Forbidden from "../admin/Forbidden";
import Vehicle from "../../pages/User/Vehicle";
import Servicepage from "../../pages/User/Servicepage";
import Mechanicuserpage from "../../pages/User/Mechanicuserpage";
import Mechaniccheck from "../../pages/User/Mechaniccheck";

import UserPrivaterouter from "./UserPrivaterouter";
const Userwarper = () => {
  return (
    <div>
      <Routes>
        

        <Route path="/" element={<Home/>} /> 
        <Route path="/otp" element={<Otp/>} /> 
        <Route path="/signin" element={<SigninUser/>} /> 
        <Route path="/signup" element={<Signup/>} /> 
        <Route path="/service" element={<Servicepage/>} /> 
        <Route path="/check" element={<Mechaniccheck/>} /> 
        <Route path="/mechanics" element={<Mechanicuserpage/>} /> 
        


        <Route element={<UserPrivaterouter/>}>
      
        <Route path="/userprofile/" element = {<Profile/>} />
        <Route path="/uservehicle/" element = {<Vehicle/>} />
        </Route>


        {/* <Route path="/admin/" element = {<Admin/>} /> */}
        

        <Route path="/l" element={<Login/>}>
            <Route path="/l/signin" element = {<SignIn />} />
        </Route>
      </Routes>

    </div>
  )
}

export default Userwarper