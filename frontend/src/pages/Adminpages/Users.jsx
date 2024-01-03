import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button } from '@material-tailwind/react';
import Pagination from '../../components/admin/Pagination';
const UsersRows = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
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
      const response = await axios.post('http://127.0.0.1:8000/api/block-user/', {
        user_id: userId,
      });

      if (response.status === 200) {
        // Update the user data after a successful block/unblock operation
        setUserData(prevData =>
          prevData.map(user =>
            user.id === userId ? { ...user, is_useractive: !isUserActive } : user
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

  const TABLE_HEAD = ['NO', 'ID', 'Name', 'Email', 'Action'];

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          User Details
        </Typography>
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
          {userData.map((user, index) => (
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
                    onClick={() => handleBlockUser(user.id, user.is_useractive)}
                    color={user.is_useractive ? 'black' : 'blue'}
                  >
                    {user.is_useractive ? 'Block' : 'Unblock'}
                  </Button>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default UsersRows;
