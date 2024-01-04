import React from 'react'
import HeaderUser from '../../components/user/Headeruser'
import UserSidebar from '../../components/user/UserSidebar'
import Sidebar from '../../components/admin/Sidebar';
import Profilecard from '../../components/user/Profilecard';
import MechanicProfilecard from '../../components/mechanic/MechanicProfilecard';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';
const MechanicProfile = () => {
  return (
    <div  >
        
        <HeaderUser/>
        <div className='flex'>
          <div className='flex-grow'>
          <UserSidebar/>
          </div>
          <div className='flex-grow'>
          <MechanicProfilecard/>
          </div>
      
    
        </div>
       
        
      
   

        
     



    </div>
  )
}

export default MechanicProfile