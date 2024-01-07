import React from 'react'
import HeaderUser from '../../components/user/Headeruser'
import UserSidebar from '../../components/user/UserSidebar'
import Sidebar from '../../components/admin/Sidebar';

import MechanicProfilecard from '../../components/mechanic/MechanicProfilecard';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';
const MechanicProfile = () => {
  return (
    <div  >
        
        <HeaderUser/>
        <div className='flex'>
          <div className='flex'>
          <UserSidebar/>
          </div>
         
          <div className='flex-grow lg:ml-[20rem]'>
          <MechanicProfilecard/>
          </div>
      
    
        </div>
       
        
      
   

        
     



    </div>
  )
}

export default MechanicProfile