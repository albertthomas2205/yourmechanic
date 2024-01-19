import React from 'react'
import MechanicHeader from '../../components/mechanic/MehanicHeader'
import  MechanicSidebar from '../../components/mechanic/MechanicSidebar'
import Mechanicbookinglist from '../../components/mechanic/Booking/Mechanicbookinglist'

const MechanicBookingpage = () => {
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
       <div className='flex-grow pt-4'>
      <Mechanicbookinglist/>
       </div>
   
 
     </div>  

    </div>
  )
}

export default MechanicBookingpage