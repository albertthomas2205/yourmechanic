import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button } from '@material-tailwind/react';
import Pagination from '../../components/admin/Pagination';
import { authentication } from '../../components/axios/AxiosInstance';

const MechanicRows = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await authentication.get('mechanics/');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBlockUser = async (userId, isUserActive) => {
    // Show a confirmation alert
    const confirmed = window.confirm(`Are you sure you want to ${isUserActive ? 'block' : 'unblock'} this user?`);

    if (!confirmed) {
      return; // If the user cancels, do nothing
    }

    try {
      setLoading(true);

      // Send a POST request to block/unblock the user
      const response = await authentication.post('block-mechanic/', {
        user_id: userId,
      });

      if (response.status === 200) {
        // Update the user data after a successful block/unblock operation
        setUserData(prevData =>
          prevData.map(user =>
            user.id === userId ? { ...user, is_mechanicactive: !isUserActive } : user
          )
        );
        console.log(`User ${isUserActive ? 'blocked' : 'unblocked'} successfully`);
      }
    } catch (error) {
      console.error('Error blocking/unblocking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Mechanics Details
        </Typography>
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                NO
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                ID
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Name
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Email
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Action
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
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
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  <Button
                    onClick={() => handleBlockUser(user.id, user.is_mechanicactive)}
                    color={user.is_mechanicactive ? 'black' : 'blue'}
                  >
                    {user.is_mechanicactive ? 'Block' : 'Unblock'}
                  </Button>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userData.length > usersPerPage && (
        <div className="flex justify-center mt-4">
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={userData.length}
            currentPage={currentPage}
            onPageChange={paginate}
          />
        </div>
      )}
    </Card>
  );
};

export default MechanicRows;
