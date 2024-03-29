import React from 'react'
import HeaderUser from '../../components/user/Headeruser'
import UserSidebar from '../../components/user/UserSidebar'
import Sidebar from '../../components/admin/Sidebar';
import MechanicSidebar from '../../components/mechanic/MechanicSidebar';
import Mechanicheader from '../../components/mechanic/Mechanicheader';
import MechanicHeader from '../../components/mechanic/MehanicHeader';

import MechanicProfilecard from '../../components/mechanic/MechanicProfilecard';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';

const MechanicProfile = () => {
  return (
    <div  >
    <div className=" w-full z-30 fixed-top  ">
     <MechanicHeader/>
   </div>
     <div className='flex'>
       <div className='flex '>
       <MechanicSidebar/>
       </div>
       <div className='flex lg:w-[20rem]'></div>
       <div className='flex-grow pt-4'>
       <MechanicProfilecard/>
       </div>
   
 
     </div>
    
     
   


     
  



 </div>
  )
}

export default MechanicProfile