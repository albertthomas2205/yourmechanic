import React from 'react'
import MechanicHeader from '../../components/mechanic/MehanicHeader'
import  MechanicSidebar from '../../components/mechanic/MechanicSidebar'
import Mechanicbookinglist from '../../components/mechanic/Booking/Mechanicbookinglist'
import ChatList from './Chat/Chatlist'

const MechanicChatpage = () => {
  return (
    <div>
      <div className=" w-full z-30 fixed-top  ">
     <MechanicHeader/>
   </div>
     <div className='flex'>
       <div className='flex '>
       <MechanicSidebar/>
       </div>
       <div className='flex lg:w-[20rem]'></div>
       <div className='flex-grow pt-[4rem]'>
      <ChatList/>
       </div>
   
 
     </div>  

    </div>
  )
}

export default MechanicChatpage