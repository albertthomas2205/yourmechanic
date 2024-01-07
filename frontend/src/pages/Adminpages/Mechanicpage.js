import React from 'react'

import AddService from './Addservice'
import ServiceTable from './Service'
import Demo from '../../components/admin/demo'
import Mechanics from '../../components/admin/Mechanics'

import Header from '../../components/admin/Header'
import Sidebaradmin from '../../components/admin/Sidbaradmin'
import Mechanicdetails from '../../components/admin/Mechanicdetails';

const Mechanicpage= () => {
  return (
  
    <>
     <Header/>
 
    <div>
  
        <div className='flex'>
          <div className='hidden'>
          <Sidebaradmin/>
          </div>
 {/* <div className='flex lg:w-[20rem]'></div> */}
       
        
{/*          
          <div className='flex-grow min-h-screen  mt-[4rem] border-2 border-deep-orange-800'> */}
            {/* <Mechanics/> */}
          {/* <Mechanicdetails/> */}
          {/* </div> */}
      
    
        </div>
       

        </div>
    
   
    </>

  )
}

export default Mechanicpage