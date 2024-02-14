import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button, Input, Alert } from '@material-tailwind/react';
import Pagination from './Pagination';
import DialogWithForm from '../../pages/Adminpages/Dailogform';
import Editform from './Editform';
import AddBrand from './AddBrand';
import { admininstance } from '../axios/AxiosInstance';


const Brandlist = () => {
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [brandsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState(null);

  const TABLE_HEAD = ['NO', 'Brand Name', 'Description', 'Actions'];
  
  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    const filtered = brands.filter((brand) =>
      brand.brand_name.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
    );
    setFilteredBrands(filtered);
  };
  const fetchBrands = async () => {
    try {
      const response = await admininstance.get('brands/');
      setBrands(response.data);
      setFilteredBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };
  useEffect(() => {


    fetchBrands();
  }, []);

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    console.log(`Edit brand with ID ${id}`);
    setEditingBrandId(id);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this brand?')) {
        await admininstance.delete(`brands/${id}/`);

        setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== id));
        setFilteredBrands((prevFilteredBrands) =>
          prevFilteredBrands.filter((brand) => brand.id !== id)
        );

        console.log(`Deleted brand with ID ${id}`);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 1000);
      }
    } catch (error) {
      console.error(`Error deleting brand with ID ${id}:`, error);
    }
  };

  const currentBrands = () => {
    const indexOfLastBrand = currentPage * brandsPerPage;
    const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
    return filteredBrands.slice(indexOfFirstBrand, indexOfLastBrand);
  };

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-between p-4">
        <div>
          <Typography variant="h5" color="blue-gray">
            Brand Details
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="pr-5">
           <AddBrand fetchBrands={fetchBrands}/>
          
          </div>
          <div className="flex items-center">
            <Input
              placeholder="Search brands"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </div>
      {showSuccess && (
        <Alert color="green" className="mb-4" onClose={() => setShowSuccess(false)}>
          Brand deleted successfully!
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
          {currentBrands().map((brand, index) => (
            <tr key={brand.id} className={index % 2 === 0 ? 'even:bg-blue-gray-50/50' : ''}>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {index + 1}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {brand.brand_name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {brand.description}
                </Typography>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Button color="red" onClick={() => handleDelete(brand.id)}>
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
          totalPages={Math.ceil(filteredBrands.length / brandsPerPage)}
          onPageChange={handlePaginationChange}
        />
      </div>
    </Card>
  );
};

export default Brandlist;
