import { Route,Routes } from "react-router-dom";
import React from 'react'
import Adminhome from "../../pages/Adminpages/Adminhome";
import Admin from "../../pages/Adminpages/Admin";
import Userpage from "../../pages/Adminpages/Userpage";
import Mechanicpage from "../../pages/Adminpages/Mechanicpage";
import Servicepage from "../../pages/Adminpages/Servicepage";

;
const Adminwarper = () => {
  return (
    <div>
      <Routes>
        <Route path="home/" element={<Admin/>} /> 
        <Route path ='users/' element={<Userpage/>}/>
        <Route path ='mechanics/' element ={<Mechanicpage/>}/>
        <Route path ='services/' element ={<Servicepage/>}/>
    
      </Routes>

    </div>
  )
}

export default Adminwarper