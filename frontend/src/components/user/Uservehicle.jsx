import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Uservehicle = (props) => {
  const cloudname = "drukcil8f"
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
  <div className='bg-black h-[15rem] flex items-center'>
    <div className='bg-green-300 h-[10rem] content-center m-4 z-1'>
      <img
        style={{
          width: '150px',
          height: '150px',
          zIndex: '1',
          objectFit: 'cover', // Ensures the image covers the area and maintains aspect ratio
        }}
        className="h-40 w-full fill rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
        src={vehicleDetails.image}
        alt="nature image"
      />
    </div>
    <div className='flex'>
      <div className='flex-col m-4'>
        <h5 style={{ fontWeight: 'bold' }}>Brand name</h5>
        <p className="text-lg">{brandName}</p>
      </div>
      <div className='flex-col m-4'>
        <h5 style={{ fontWeight: 'bold' }}>Vehicle Name {props.vehicle_id}</h5>
        <p className="text-lg">{vehicleDetails.vehicle_name}</p>
      </div>
      <div className='flex-col m-4'>
        <h5 style={{ fontWeight: 'bold' }}>Registration No</h5>
        <p className="text-lg">{props.registration_no}</p>
      </div>
      <div className='flex-col m-4'>
        <h5 style={{ fontWeight: 'bold' }}>Total KM</h5>
        {/* Replace 'totalKm' with the actual variable holding the total KM value */}
        <p className="text-lg"></p>
      </div>
      <div className='flex-col m-4'>
        <h5 style={{ fontWeight: 'bold' }}>Edit</h5>
        <button
          className='text-blue-500 hover:text-blue-700'
        >
          ✏️
        </button>
      </div>
      <div className='flex-col m-4'>
        <h5 style={{ fontWeight: 'bold' }}>Delete</h5>
        <button
          className='text-red-500 hover:text-red-700'
        >
          🗑️
        </button>
      </div>
      {/* Add other fields as needed */}
    </div>
  </div>
</div>


  );
};

export default Uservehicle;
