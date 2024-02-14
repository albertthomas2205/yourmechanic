import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button, Input, Alert, Chip } from '@material-tailwind/react';
import Pagination from './Pagination';
import DialogWithForm from '../../pages/Adminpages/Dailogform';
import Mechanicdetails from './Mechanicdetails';
import Mechanicverify from './Mechanicverify';
import { authentication } from '../axios/AxiosInstance';


const Mechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMechanics, setFilteredMechanics] = useState([]);
  const [mechanicsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingMechanicId, setEditingMechanicId] = useState(null);
  

  const TABLE_HEAD = ['NO', 'First Name', 'Email', 'Phone Number', 'Verify', 'Actions'];

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    const filtered = mechanics.filter((mechanic) =>
      mechanic.first_name.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
    );
    setFilteredMechanics(filtered);
  };

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await authentication.get('http://127.0.0.1:8000/api/mechanics/');
        setMechanics(response.data);
        setFilteredMechanics(response.data);
      } catch (error) {
        console.error('Error fetching mechanics:', error);
      }
    };

    fetchMechanics();
  }, []);

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    console.log(`Edit mechanic with ID ${id}`);
    setEditingMechanicId(id);
  };

  return (
    <Card className="h-full w-full overflow-scroll p-[3rem]]">
      <div className="flex justify-between p-4">
        <div>
          <Typography variant="h5" color="blue-gray">
            Mechanics Details
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="pr-5">
         
          </div>
          <div className="flex items-center">
            <Input
              placeholder="Search mechanics"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </div>
      {showSuccess && (
        <Alert color="green" className="mb-4" onClose={() => setShowSuccess(false)}>
          Mechanic deleted successfully!
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
          {filteredMechanics.slice((currentPage - 1) * mechanicsPerPage, currentPage * mechanicsPerPage).map((mechanic, index) => (
            <tr key={mechanic.id} className={index % 2 === 0 ? 'even:bg-blue-gray-50/50' : ''}>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {index + 1}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {mechanic.first_name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {mechanic.email}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {mechanic.phone_number}
                </Typography>
              </td>
              <td className="p-4">
                <Chip color={mechanic.is_verify ? 'green' : 'red'}
                     value={mechanic.is_verify ? "verify" : "not verify"}
                     variant="ghost"
                     size="sm"
                   
                />
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                   <Mechanicverify id ={mechanic.id}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="items-center p-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredMechanics.length / mechanicsPerPage)}
          onPageChange={handlePaginationChange}
        />
      </div>
    </Card>
  );
};

export default Mechanics;
