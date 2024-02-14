import React, { useState, useEffect } from "react";
import HeaderUser from '../../components/user/Headeruser'
import UserSidebar from '../../components/user/UserSidebar'
import Sidebar from '../../components/admin/Sidebar';
import Profilecard from '../../components/user/Profilecard';
import Uservehicle from '../../components/user/Uservehicle';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';
import Header from "../../components/admin/Header";
import { useMediaQuery } from "react-responsive";
import UserVehicleAdd from "../../components/user/Uservehicleadd";
import { useSelector } from "react-redux";
import VehicleCard from "../../components/user/Vechlecard";
import axios from "axios";
import {authentication} from "../../components/axios/AxiosInstance"

const Profile = () => {

  const [vehicles, setVehicles] = useState([]);
  const id = useSelector((state)=>state.persistedAuthReducer.authentication_user.id);

  const fetchUserVehicles = async () => {
    try {
      const response = await authentication.get(`user-vehicles/${id}/`);
      console.log(response.data);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching user vehicles:', error);
    }
  };

  useEffect(() => {
    fetchUserVehicles();
  }, [id]);

  const isLargeScreen = useMediaQuery({ minWidth: 992 });
  return (
    <div  >
     <div className=" w-full z-30  fixed-top  bg-[#180e32]   ">
        <HeaderUser />
      </div>
        
 
     
     
      <div className="flex">
  <UserSidebar />
 
  {/* <div className="flex lg:w-[30rem]">

  </div> */}


  <div className="flex-grow mt-[3rem] lg:ml-[20rem]"> {/* Used flex-grow to make this div take up remaining space */}
    <div className=" text-center  pt-[3rem]">
      <div className="flex justify-around items-center">
        <div></div>
      <h2 className="mt-4 text-white">Your vehicles</h2>

      <div className=" flex justify-end p-5">
     <UserVehicleAdd fetch = {fetchUserVehicles}/>
     </div>

      </div>
  
      
  
     
 
    </div>
   
 
    <div className='flex  justify-center gap-12 flex-wrap py-[5rem]  '>
    
      {/* Render Uservehicle components */}
      {vehicles.map((vehicle) => (
        vehicle.vehicle?
        <VehicleCard key={vehicle.vehicle_id} id={vehicle.id} vehicle_id={vehicle.vehicle} brandid = {vehicle.brand} registration_no = {vehicle.registration_number} total_km = {vehicle.total_km} manufacture = {vehicle.year_of_manufacture}  fetch = {fetchUserVehicles}/>:""
      ))}
    </div>
  </div>

  </div>

      

        
     



    </div>
  )
}

export default Profile