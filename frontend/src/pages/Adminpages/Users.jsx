import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button } from '@material-tailwind/react';
import Pagination from '../../components/admin/Pagination';
import { authentication } from '../../components/axios/AxiosInstance';

const UsersRows = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await authentication.get('users/');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to filter user data based on search input
  const filterUserData = () => {
    const filteredData = userData.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(filteredData);
  };

  useEffect(() => {
    filterUserData();
  }, [searchInput, userData]);

  const handleBlockUser = async (userId, isUserActive) => {
    // ... (previous code)

    // Update the user data after a successful block/unblock operation
    setUserData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, is_useractive: !isUserActive } : user
      )
    );

    // Update search results as well
    setSearchResults((prevResults) =>
      prevResults.map((user) =>
        user.id === userId ? { ...user, is_useractive: !isUserActive } : user
      )
    );

    console.log(`User ${isUserActive ? 'blocked' : 'unblocked'} successfully`);
  };

  const TABLE_HEAD = ['NO', 'ID', 'Name', 'Email', 'Action'];

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-between p-4">
        <div>
          <Typography variant="h5" color="blue-gray">
            User Details
          </Typography>
        </div>
        {/* Search input field */}
        <div>
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {searchResults.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'even:bg-blue-gray-50/50' : ''}>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {index + 1}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {user.id}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {user.first_name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {user.email}
                </Typography>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleBlockUser(user.id, user.is_useractive)}
                    color={user.is_useractive ? 'black' : 'blue'}
                  >
                    {user.is_useractive ? 'Block' : 'Unblock'}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default UsersRows;
