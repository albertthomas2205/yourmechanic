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
import { Input, Button } from "@material-tailwind/react";
import { authentication } from '../../components/axios/AxiosInstance'

const Mechanicuserpage = () => {
  const [mechanics, setMechanics] = useState([]);
  const [searchmechanic,setSearchmechanic]=useState([]);
  const [place, setPlace] = useState('')
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

  const handleSearch = async () => {
    try {
      const data = { place: place };
  
      // Use an absolute URL or ensure that your relative URL is correct
      // const apiUrl = 'http://127.0.0.1:8000/api/mechanic-place-search/';
  
      const response = await authentication.post('mechanic-place-search/', data);
  
      // Check if the response has the expected structure before updating state
      if (response && response.data) {
        console.log('Search Response:', response.data);
        setSearchmechanic(response.data);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching mechanic places:', error.message);
    }
  };

  const location = useLocation();
  const { vehicleId, id, servicename, price } = location.state || {};
  console.log(vehicleId, id, servicename, price);


  return (
    <div>
    <HeaderUser/>

    <div className=' mt-[4rem]  min-h-screen min-w-screen  '>
    <div  className="flex justify-center items-center">
  <div className='text-center  text-white'><h4>Select Your Mechanic</h4></div>
  {/* <div className='ml-[4rem] flex'> <div> <Input onChange={(e) => setPlace(e.target.value)} placeholder="Search your place" /> </div> <div className='ml-3'><Button onClick={()=>handleSearch()}>serach</Button></div></div> */}
</div>
       
      <div className='flex justify-center gap-10 flex-wrap p-[5rem] '>
        {
          mechanics.map((mechanic) => (
            <MechanicBox key={mechanic.id} vehicleId ={vehicleId} id={mechanic.id} serviceid ={id} name={mechanic.first_name} servicename={servicename} price={price} searchmechanic={searchmechanic}/>
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