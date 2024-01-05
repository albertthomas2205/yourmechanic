import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import HeaderUser from '../../components/user/Headeruser'
import FooterWithSocialLinks from '../../components/user/Footer'
import ServiceCard from '../../components/user/Servicecard'
import axios from "axios";
const Servicepage = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
      axios.get('http://127.0.0.1:8001/api/services/')
      .then(response=>{
        console.log(response.data)
        setServices(response.data)
      })
      .catch(error=>{
        console.log('error fetching the services')
      })
       
    }, []);

  return (
    <div>
        <HeaderUser/>

        <div className=' mt-[4rem]  min-h-screen min-w-screen  '>
        <div className='mt-[8rem] text-center text-white'><h4>Services pages</h4></div>
           
            <div className='flex justify-center gap-10 flex-wrap p-[5rem] '>
          
               {
                services.map((service)=>(
                    <ServiceCard name = {service.name} image= {service.image} description = {service.description} price={service.price} time={service.time_required}/>

                ))
               } 
               
              
                <div className='w-96'>
 888
                </div>
                <div className='w-96'>

</div>

           
       
           
            </div>
           

        </div>
       <div >
       <FooterWithSocialLinks/>
       </div>
       
        

    </div>
  )
}

export default Servicepage