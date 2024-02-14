import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button, Input, Alert } from '@material-tailwind/react';
import Pagination from './Pagination';
import DialogWithForm from '../../pages/Adminpages/Dailogform';
import Editform from './Editform';
import AddBrand from './AddBrand';
import AddAdminVehicle from './AddadminVehicles';
import { admininstance } from '../axios/AxiosInstance';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [vehiclesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState(null);

  const TABLE_HEAD = ['NO', 'Vehicle Name', 'Description', 'Brand', 'Image', 'Actions'];

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    const filtered = vehicles.filter((vehicle) =>
      vehicle.vehicle_name.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
    );
    setFilteredVehicles(filtered);
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await admininstance.get('vehicles/');
        setVehicles(response.data);
        setFilteredVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    console.log(`Edit vehicle with ID ${id}`);
    setEditingVehicleId(id);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this vehicle?')) {
        await admininstance.delete(`vehicles/${id}/`);

        setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== id));
        setFilteredVehicles((prevFilteredVehicles) =>
          prevFilteredVehicles.filter((vehicle) => vehicle.id !== id)
        );

        console.log(`Deleted vehicle with ID ${id}`);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 1000);
      }
    } catch (error) {
      console.error(`Error deleting vehicle with ID ${id}:`, error);
    }
  };

  const currentVehicles = () => {
    const indexOfLastVehicle = currentPage * vehiclesPerPage;
    const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
    return filteredVehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);
  };

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-between p-4">
        <div>
          <Typography variant="h5" color="blue-gray">
            Vehicle Details
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="pr-5">
            <AddAdminVehicle />
          </div>
          <div className="flex items-center">
            <Input
              placeholder="Search vehicles"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </div>
      {showSuccess && (
        <Alert color="green" className="mb-4" onClose={() => setShowSuccess(false)}>
          Vehicle deleted successfully!
        </Alert>
      )}
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentVehicles().map((vehicle, index) => (
            <tr key={vehicle.id} className={index % 2 === 0 ? 'even:bg-blue-gray-50/50' : ''}>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {index + 1}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {vehicle.vehicle_name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {vehicle.description}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {vehicle.brand}
                </Typography>
              </td>
              <td className="p-4">
                <img
                  src={vehicle.image}
                  alt={vehicle.vehicle_name}
                  className="h-10 w-10 object-cover rounded-full"
                />
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Button color="red" onClick={() => handleDelete(vehicle.id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="items-center p-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredVehicles.length / vehiclesPerPage)}
          onPageChange={handlePaginationChange}
        />
      </div>
    </Card>
  );
};

export default VehicleList;
