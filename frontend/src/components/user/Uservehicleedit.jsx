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
import { admininstance, authentication } from '../axios/AxiosInstance';
const UserVehicleEdit = (props) => {
  const userId = useSelector((state) => state.persistedAuthReducer.authentication_user.id);

  // State variables
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
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
        const response = await admininstance.get(`brand-name/`);
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
        const response = await authentication.get(`user-vehicle-update/${props.id}/`);
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
      const response = await admininstance.post('vehiclesname/', data);
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
    // Clear validation error when user starts typing
    updateValidationErrors(name, null);
  };

  const updateValidationErrors = (field, error) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authentication.patch(`user-vehicle-update/${props.id}/`, vehicleData);
      console.log(response.data);
      props.fetch();
      setOpen(false); // Close the dialog after successful update
    } catch (error) {
      console.error('Error updating vehicle:', error);

      if (error.response && error.response.data) {
        // Display the specific serializer errors from the backend
        const backendErrors = error.response.data;
        Object.keys(backendErrors).forEach((field) => {
          updateValidationErrors(field, backendErrors[field][0]);
        });
      }
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="text" className="bg-green-700">
        Edit Vehicle
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
            <div className="mb-4">
              <Input
                label="Year of Manufacture"
                type="text"
                name="year_of_manufacture"
                value={vehicleData.year_of_manufacture}
                onChange={handleChange}
              />
              {validationErrors.year_of_manufacture && (
                <span className="text-red-500">{validationErrors.year_of_manufacture}</span>
              )}
            </div>
            <div className="mb-4">
              <Input
                label="Registration Number"
                type="text"
                name="registration_number"
                value={vehicleData.registration_number}
                onChange={handleChange}
              />
              {validationErrors.registration_number && (
                <span className="text-red-500">{validationErrors.registration_number}</span>
              )}
            </div>
            <div className="mb-4">
              <Input
                label="Total Kilometers"
                type="text"
                name="total_km"
                value={vehicleData.total_km}
                onChange={handleChange}
              />
              {validationErrors.total_km && (
                <span className="text-red-500">{validationErrors.total_km}</span>
              )}
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
