import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from '@material-tailwind/react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Select, Option } from '@material-tailwind/react';

const UserVehicleEdit = (props) => {
  const userId = useSelector((state) => state.persistedAuthReducer.authentication_user.id);
  
  // State variables
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleData, setVehicleData] = useState({
    id: null,
    vehicle: '',
    brand: '',
    year_of_manufacture: '',
    registration_number: '',
    total_km: '',
    user: userId,
  });

  // Fetch brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8001/api/brand-name/`);
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  // Fetch vehicle details when the component receives a new ID
  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user-vehicle-update/${props.id}/`);
        setVehicleData(response.data);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    };

    if (props.id) {
      fetchVehicleDetails();
    }
  }, [props.id]);

  // Fetch vehicle names based on selected brand
  const fetchVehicleName = async (brand_id) => {
    setVehicleData({ ...vehicleData, brand: brand_id });
    const data = { brand_id: brand_id };
    
    try {
      const response = await axios.post('http://127.0.0.1:8001/api/vehiclesname/', data);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  // Event handlers
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

    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/user-vehicle-update/${props.id}/`, vehicleData);
      console.log(response.data);
      props.fetch();
      setOpen(false); // Close the dialog after successful update
    } catch (error) {
      console.error('Error updating vehicle:', error);

      if (error.response && error.response.data) {
        // Display the specific serializer errors from the backend
        alert(`${JSON.stringify(error.response.data)}`);
      } else {
        // Generic error message
        alert('Error updating vehicle. Please try again.');
      }
    }
  };

  return (
    <>
      <Button onClick={handleOpen} color="green" variant="gradient" className="bg-green-300">
        Edit Vehicle {props.id}
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
        <DialogHeader style={{ textAlign: 'center' }}>Edit Vehicle</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            {/* Select Brand */}
            <div className="mb-4">
              <Select label="Select Brand" onChange={(selectedValue) => fetchVehicleName(selectedValue)}>
                {brands.map((brand) => (
                  <Option key={brand.id} value={brand.id.toString()}>
                    {brand.brand_name}
                  </Option>
                ))}
              </Select>
            </div>
            
            {/* Select Vehicle */}
            <div className="mb-4">
              <Select label="Select Vehicle" onChange={(e) => handleVehicleSelect(e)}>
                {vehicles.map((vehicle) => (
                  <Option key={vehicle.id} value={vehicle.id.toString()}>
                    {vehicle.vehicle_name}
                  </Option>
                ))}
              </Select>
            </div>
            
            {/* Other input fields */}
            <div className="mb-4">
              <Input label="Year of Manufacture" type="text" name="year_of_manufacture" value={vehicleData.year_of_manufacture} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <Input label="Registration Number" type="text" name="registration_number" value={vehicleData.registration_number} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <Input label="Total Kilometers" type="text" name="total_km" value={vehicleData.total_km} onChange={handleChange} />
            </div>
            
            {/* Dialog footer with buttons */}
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
};

export default UserVehicleEdit;
