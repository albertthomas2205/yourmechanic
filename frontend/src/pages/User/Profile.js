import React from 'react'
import HeaderUser from '../../components/user/Headeruser'
import UserSidebar from '../../components/user/UserSidebar'
import Sidebar from '../../components/admin/Sidebar';
import Profilecard from '../../components/user/Profilecard';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';
const Profile = () => {
  return (
    <div  >
       <div className=" w-full z-30  fixed-top  bg-[#180e32]   ">
        <HeaderUser />
      </div>
        <div className='flex'>
          <div className='flex'>
          <UserSidebar/>
          </div>
          <div className='flex lg:w-[20rem]'></div>
          <div className='flex-grow pt-4'>
          <Profilecard/>
          </div>
      
    
        </div>
       
        
      
   

        
     



    </div>
  )
}

export default Profile