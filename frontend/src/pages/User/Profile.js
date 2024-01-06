import React from 'react'
import HeaderUser from '../../components/user/Headeruser'
import UserSidebar from '../../components/user/UserSidebar'
import Sidebar from '../../components/admin/Sidebar';
import Profilecard from '../../components/user/Profilecard';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';
const Profile = () => {
  return (
    <div  >
        
        <HeaderUser/>
        <div className='flex'>
          <div className='flex'>
          <UserSidebar/>
          </div>
          <div className='flex w-[20rem]'></div>
          <div className='flex'>
          <Profilecard/>
          </div>
      
    
        </div>
       
        
      
   

        
     



    </div>
  )
}

export default Profile