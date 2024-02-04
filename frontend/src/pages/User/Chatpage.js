import React from 'react'
import HeaderUser from '../../components/user/Headeruser'
import UserSidebar from '../../components/user/UserSidebar'
import Sidebar from '../../components/admin/Sidebar';
import ChatList from './Chat/Chatlist';



const Chatpage = () => {
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
          <div className='flex-grow pt-[5rem]'>
            <ChatList/>
         
          </div>
      
    
        </div>
       
        
      
   

        
     



    </div>
  )
}

export default Chatpage