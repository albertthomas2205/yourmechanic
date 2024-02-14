import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button, Input, Alert } from '@material-tailwind/react';
import Pagination from './Pagination';
import DialogWithForm from '../../pages/Adminpages/Dailogform';
import Editform from './Editform';
import { admininstance } from '../axios/AxiosInstance';

const Servicelist = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredServices, setFilteredServices] = useState([]);
  const [servicesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  

  const TABLE_HEAD = ['NO', 'Name', 'Description', 'Image', 'Price', 'Actions'];
  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  };


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await admininstance.get('services/');
        setServices(response.data);
        setFilteredServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  },[] );


  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    console.log(`Edit service with ID ${id}`);
    setEditingServiceId(id);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this service?')) {
        await admininstance.delete(`services/${id}/`);

        setServices((prevServices) => prevServices.filter((service) => service.id !== id));
        setFilteredServices((prevFilteredServices) =>
          prevFilteredServices.filter((service) => service.id !== id)
        );

        console.log(`Deleted service with ID ${id}`);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 1000);
      }
    } catch (error) {
      console.error(`Error deleting service with ID ${id}:`, error);
    }
  };

  const currentServices = () => {
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    return filteredServices.slice(indexOfFirstService, indexOfLastService);
  };

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-between p-4">
        <div>
          <Typography variant="h5" color="blue-gray">
            Service Details
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="pr-5">
            <DialogWithForm />
          </div>
          <div className="flex items-center">
            <Input
              placeholder="Search services"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Uncomment the onClick attribute for the "Search" button */}
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </div>
      {showSuccess && (
        <Alert color="green" className="mb-4" onClose={() => setShowSuccess(false)}>
          Service deleted successfully!
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
          {currentServices().map((service, index) => (
            <tr key={service.id} className={index % 2 === 0 ? 'even:bg-blue-gray-50/50' : ''}>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {index + 1}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {service.name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {service.description}
                </Typography>
              </td>
              <td className="p-4">
                <img src={service.image} alt={service.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {service.price}
                </Typography>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Editform serviceId={service.id} />
                  <Button color="red" onClick={() => handleDelete(service.id)}>
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
          totalPages={Math.ceil(filteredServices.length / servicesPerPage)}
          onPageChange={handlePaginationChange}
        />
      </div>
    </Card>
  );
};

export default Servicelist;