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
import Forbidden from "../admin/Forbidden";
const Userwarper = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Home/>} /> 
        <Route path="/otp" element={<Otp/>} /> 
        <Route path="/signin" element={<SigninUser/>} /> 
        <Route path="/service/" element = {<Service/>} />
        <Route path="/signup/" element = {<Signup/>} />
        <Route path="/ad/" element = {<Adminhome/>} />
        <Route path="/forbidden/"element={<Forbidden/>}/>

        {/* <Route path="/admin/" element = {<Admin/>} /> */}
        

        <Route path="/l" element={<Login/>}>
            <Route path="/l/signin" element = {<SignIn />} />
        </Route>
      </Routes>

    </div>
  )
}

export default Userwarper