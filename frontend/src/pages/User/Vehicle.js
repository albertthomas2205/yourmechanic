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
const Profile = () => {

  const [vehicles, setVehicles] = useState([]);
  const id = useSelector((state)=>state.persistedAuthReducer.authentication_user.id);


  useEffect(() => {
    // Fetch the user vehicles data from the API
    axios.get(`http://127.0.0.1:8000/api/user-vehicles/${id}/`)
      .then(response => {
        console.log(response.data)
        setVehicles(response.data);
      })
      .catch(error => {
        console.error('Error fetching user vehicles:', error);
      });
  }, []);

  const isLargeScreen = useMediaQuery({ minWidth: 992 });
  return (
    <div  >
        
      <HeaderUser/>
     
     
      <div className="flex">
  <UserSidebar />
 
  <div className="flex lg:w-[20rem]">

  </div>


  <div className="flex-grow mt-[3rem]"> {/* Used flex-grow to make this div take up remaining space */}
    <div className=" text-center  pt-[5rem]">
      <div className>
      <h2 className="mt-4 text-white">Your vehicles</h2>
      </div>
  
      
  
     
 
    </div>
    <div>
     

    </div>
    <div className=" flex justify-end p-5">
     <UserVehicleAdd/>
     </div>

    <div className='flex justify-center gap-10 flex-wrap p-[5rem] '>
    
      {/* Render Uservehicle components */}
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.vehicle_id} vehicle_id={vehicle.vehicle} brandid = {vehicle.brand} registration_no = {vehicle.registration_number} total_km = {vehicle.total_km} manufacture = {vehicle.year_of_manufacture} />
      ))}
    </div>
  </div>

  </div>

      

        
     



    </div>
  )
}

export default Profile