import React from 'react'
import Sidebar from '../../components/admin/Sidbar'
import AddService from './Addservice'
import ServiceTable from './Service'
import Demo from '../../components/admin/demo'
import Adminnav from '../../components/admin/Adminnav';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';

const Adminhome = () => {
  return (
    <ChakraProvider>
    <>
    <div className='bg-blue-gray-100'>

<Sidebar/>
 
  {/* <Adminnav/> */}
   {/* <Demo/> */}
   {/* <Sidebar/> */}
   {/* <div className='p-4'>
    <div className='p-4'>

    </div>
  <ServiceTable/>
   </div> */}
  
    {/* <div className='bg-black  p-4 h-full ml-12'>
      <div className='bg-white p-4 h-full ml-12'>
        <div className=' bg-blue-gray-200  p-4 h-full ml-12'>
         
        <h1>haiii</h1>
        <div className='bg-black w-full  col  ml-12'>
            <MembersTable/>
          </div>
        </div>
    
      </div>

    </div> */}
    
   
    </div>
    </>
    </ChakraProvider>
  )
}

export default Adminhome