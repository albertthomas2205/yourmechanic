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
import axios from "axios";
const Profile = () => {

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch the user vehicles data from the API
    axios.get('http://127.0.0.1:8000/api/user-vehicles/')
      .then(response => {
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
 
  {
  isLargeScreen ? (
    <div className="bg-green-300 w-[20rem] h-screen">
      {/* Adjusted height to fill the screen */}
      {/* Content inside the green div */}
      <div className="p-4">
        <h1>Green Div Content</h1>
        {/* Add your content here */}
      </div>
    </div>
  ) : null
}

  <div className="flex-grow mt-[3rem]"> {/* Used flex-grow to make this div take up remaining space */}
    <div className="bg-blue-300 text-center  p-4">
      <h1 className="mt-4">user vehicles</h1>
      <UserVehicleAdd/>
    </div>
    <div>
     

    </div>

    <div>
      {/* Render Uservehicle components */}
      {vehicles.map((vehicle) => (
        <Uservehicle key={vehicle.vehicle_id} vehicle_id={vehicle.vehicle} brandid = {vehicle.brand} registration_no = {vehicle.registration_number} />
      ))}
    </div>
  </div>
</div>
      

        
     



    </div>
  )
}

export default Profile