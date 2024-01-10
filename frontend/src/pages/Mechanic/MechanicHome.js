import React from 'react'
import HeaderUser from '../../components/user/Headeruser'
import UserSidebar from '../../components/user/UserSidebar'
import Sidebar from '../../components/admin/Sidebar';
import Profilecard from '../../components/user/Profilecard';
import MechanicSidebar from '../../components/mechanic/MechanicSidebar';
import Mechanicheader from '../../components/mechanic/Mechanicheader';

import MechanicProfilecard from '../../components/mechanic/MechanicProfilecard';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';
import MechaniSidebar from '../../components/mechanic/MechanicSidebar';
const Profile = () => {
  return (
    <div  >
       <div className=" w-full z-30  pt-4 fixed-top  bg-[#180e32]   ">
        <Mechanicheader/>
      </div>
        <div className='flex'>
          <div className='flex'>
          <MechaniSidebar/>
          </div>
          <div className='flex lg:w-[20rem]'></div>
          <div className='flex-grow pt-4'>
          <MechanicProfilecard/>
          </div>
      
    
        </div>
       
        
      
   

        
     



    </div>
  )
}

export default Profile