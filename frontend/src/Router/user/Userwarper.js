import { Route,Routes } from "react-router-dom";
import React from 'react'
import UserPrivaterouter from "./UserPrivaterouter";
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
import Stripepage from "../../pages/User/Stripepage";
import UserVehiclePage from "../../pages/User/UserVehiclePage";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import BookingPage from "../../pages/User/Booking/BookingPage";
import Chat from "../../pages/User/Chat/Chat";
import ChatList from "../../pages/User/Chat/Chatlist";
import Mechanicprofilepage from "../../pages/User/Mechanicprofilepage";
import Chatpage from "../../pages/User/Chatpage";



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
        <Route path="/payment" element={<Stripepage/>} />
        <Route path="/userbooking" element={<BookingPage/>} />
        <Route path="/chatpage" element={<Chatpage/>} />
        <Route path="/chat" element={<ChatList/>} />
        <Route path="/mechanicprofile" element={<Mechanicprofilepage/>} />
        
        
 
        


        <Route element={<UserPrivaterouter/>}>
      
        <Route path="/userprofile/" element = {<Profile/>} />
        <Route path="/uservehicle/" element = {<Vehicle/>} />
        <Route path="/vehicle/" element={<UserVehiclePage/>} />
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