import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import HeaderUser from '../../components/user/Headeruser'
import FooterWithSocialLinks from '../../components/user/Footer'
import ServiceCard from '../../components/user/Servicecard'
import Mechaniccard from '../../components/user/Mechaniccard'
import axios from "axios";
import MechanicBox from '../../components/user/MechanicBox'
import { useLocation } from 'react-router-dom';

const Mechanicuserpage = () => {
  const [mechanics, setMechanics] = useState([]);
  useEffect(() => {
    // Fetch the user vehicles data from the API
    axios.get('http://127.0.0.1:8000/api/verify-mechaniclist/')
      .then(response => {
        setMechanics(response.data);
      })
      .catch(error => {
        console.error('Error fetching user vehicles:', error);
      });
  }, []);
  const location = useLocation();
  const { id, servicename, price } = location.state || {};


  return (
    <div>
    <HeaderUser/>

    <div className=' mt-[4rem]  min-h-screen min-w-screen  '>
      <div className='mt-[8rem] text-center text-white'><h4>Select Your Mechanic</h4></div>
       
      <div className='flex justify-center gap-10 flex-wrap p-[5rem] '>
        {
          mechanics.map((mechanic) => (
            <MechanicBox key={mechanic.id} id={mechanic.id} serviceid ={id} name={mechanic.first_name} servicename={servicename} price={price}/>
          ))
        }
      </div>
    </div>

    <div>
      <FooterWithSocialLinks/>
    </div>
  </div>
  )
}

export default Mechanicuserpage