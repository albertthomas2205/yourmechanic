import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Uservehicle = (props) => {
  const [brandName, setBrandName] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState({});

  useEffect(() => {
    // Fetch brand information using the provided API endpoint
    axios.get(`http://127.0.0.1:8001/api/brands/${props.brandid}/`)
      .then(response => {
        // Assuming the brand_name is available in the response
        const brandNameFromAPI = response.data.brand_name;
        setBrandName(brandNameFromAPI);
      })
      .catch(error => {
        console.error('Error fetching brand information:', error);
      });
  }, [props.brandid]);

  useEffect(() => {
    // Fetch vehicle information using the provided API endpoint
    axios.get(`http://127.0.0.1:8001/api/vehiclesdetails/${props.vehicle_id}/`)
      .then(response => {
        // Assuming the data structure of the vehicle details
        const vehicleFromAPI = response.data;
        setVehicleDetails(vehicleFromAPI);
      })
      .catch(error => {
        console.error('Error fetching vehicle information:', error);
      });
  }, [props.vehicle_id]);

  return (
    <div className='p-4'>
      <div className='bg-black h-[15rem] flex'>
        <div className='bg-green-300 h-[10rem] content-center m-4 z-1'>
          <img
            className="h-40 w-full fill rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
            src={`${vehicleDetails.image}1`}
            alt="nature image"
          />
        </div>
        <div className='flex-col'>
          <div className='m-4'>
            <h3>Brand name</h3>
          </div>
          <div className='m-4'>
            <h3>{brandName}</h3>
          </div>
        </div>
        <div className='flex-col'>
          <div className='m-4'>
            <h3>Vehicle Name {props.vehicle_id}</h3>
          </div>
          <div className='m-4'>
            <h3>{vehicleDetails.vehicle_name}</h3>
          </div>
        </div>
        <div className='flex-col'>
          <div className='m-4'>
            <h3>Registration No</h3>
          </div>
          <div className='m-4'>
            <h3>{props.registration_no}</h3>
          </div>
        </div>
        {/* Add other fields as needed */}
      </div>
    </div>
  );
};

export default Uservehicle;
