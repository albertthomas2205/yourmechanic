import React from 'react'

import AddService from './Addservice'
import ServiceTable from './Service'
import Demo from '../../components/admin/demo'

import Header from '../../components/admin/Header'
import Sidebaradmin from '../../components/admin/Sidbaradmin'
import Mechanicdetails from '../../components/admin/Mechanicdetails';

const Adminhome = () => {
  return (
  
    <>
    <di>
   <Header/>
 
        <div className='flex'>
          <div >

          </div>
        <Sidebaradmin/>
         
          <div className='flex-grow p-3 ml-[20rem] mt-[4rem]'>
          <Mechanicdetails/>
          </div>
      
    
        </div>
       

        </di>
    
   
    </>

  )
}

export default Adminhome