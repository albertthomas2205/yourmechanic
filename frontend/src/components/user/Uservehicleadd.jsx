import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  SelectItem
} from '@material-tailwind/react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Select, Option } from "@material-tailwind/react";
import { admininstance, authentication } from '../axios/AxiosInstance';

export default function UserVehicleAdd(props) {
  const userId = useSelector((state) => state.persistedAuthReducer.authentication_user.id);

  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleData, setVehicleData] = useState({
    vehicle: '',
    brand: '',
    year_of_manufacture: '',
    registration_number: '',
    total_km: '',
    user: userId,
  });

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await admininstance.get('brand-name/');
        console.log(response.data)
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  },[]);

  const fetchVehicleName = async (brand_id) => {
    setVehicleData({ ...vehicleData, brand: brand_id});
    console.log("hahhaehwiads")
    console.log(brand_id)
    const data = {"brand_id": brand_id}
    try {
      const response = await admininstance.post('vehiclesname/',data);
      setVehicles(response.data);
      
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleOpen = () => setOpen(!open);

  const handleBrandSelect = (selectedBrandId) => {
    setVehicleData({ ...vehicleData, brand: selectedBrandId });
    fetchVehicleName(selectedBrandId);
  };

  const handleVehicleSelect = (selectedVehicleId) => {
    setVehicleData({ ...vehicleData, vehicle: selectedVehicleId });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(vehicleData);

    try {
      const response = await authentication.post('user-vehicles/', vehicleData);
      console.log(response.data);
      props.fetch();
      setOpen(false);
    } catch (error) {
      console.error('Error adding vehicle:', error);

      if (error.response && error.response.data) {
        const errorMessages = [];

        // Iterate over the error response and extract messages
        for (const field in error.response.data) {
          if (error.response.data.hasOwnProperty(field)) {
            errorMessages.push(`${field}: ${error.response.data[field].join(', ')}`);
          }
        }

        // Set the formatted error message
        setErrorMessage(errorMessages.join('\n'));

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else {
        // Set a generic error message
        setErrorMessage('Error adding vehicle. Please try again.');

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
  };
  
  return (
    <>
      <Button onClick={handleOpen}  color="green" variant="gradient" className='bg-green-300'>
        Add Vehicle
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        style={{ backdropFilter: 'blur(5px)' }}
      >
        <DialogHeader style={{ textAlign: 'center' }}>Add Vehicle</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="text-red-500 mt-2">
                <span>{errorMessage}</span>
              </div>
            )}
            <div className="mb-4">
              <Select label="Select Brand" onChange={(selectedValue) => fetchVehicleName(selectedValue)}>
                {brands.map((brand) => (
                  <Option key={brand.id} value={brand.id.toString()}>
                    {brand.brand_name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-4">
              <Select label="Select Vehicle" onChange={(e) => handleVehicleSelect(e)}>
                {vehicles.map((vehicle) => (
                  <Option key={vehicle.id} value={vehicle.id.toString()}>
                    {vehicle.vehicle_name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-4">
              <Input label="Year of Manufacture" type="text" name="year_of_manufacture" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <Input label="Registration Number" type="text" name="registration_number" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <Input label="Total Kilometers" type="text" name="total_km" onChange={handleChange} />
            </div>
            <DialogFooter>
              <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                Cancel
              </Button>
              <Button type="submit" variant="gradient" color="green">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
