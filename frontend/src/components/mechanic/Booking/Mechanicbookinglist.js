import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Avatar,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
  Button,
} from "@material-tailwind/react";
import { useSelector } from 'react-redux';
import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import MenuDefault from './Menudefault';

// Function to format date and time
const formatDateTime = (dateTimeString) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };



  const formattedDateTime = new Date(dateTimeString);

  // Round up the minutes to the nearest hour
  if (formattedDateTime.getMinutes() === 30) {
    formattedDateTime.setHours(formattedDateTime.getHours() + 1, 0, 0, 0);
  } else {
    formattedDateTime.setMinutes(0, 0, 0);
  }

  return formattedDateTime.toLocaleString('en-US', options);
};

const TABLE_HEAD = ["Sl. No", "Vehicle", "Mechanic", "Service", "Amount", "Date", "Status"];

export default function Mechanicbookinglist() {
  const [bookingData, setBookingData] = useState([]);
  const [serviceDetailsList, setServiceDetailsList] = useState([]);
  const [mechanicDetailsList, setMechanicDetailsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const id = useSelector((state)=>state.persistedAuthReducer.authenication_mechanic.id)
  {id? console.log(id):console.log("notfound")}
  const fetchData = async () => {
    try {
      // Fetching the main booking data
      const bookingResponse = await axios.get(`http://127.0.0.1:8002/api/booking/bookingmechanic/${id}/`);
      setBookingData(bookingResponse.data);

      // Extracting service_id, vehicle_id, and mechanic_id for each item in bookingData
      const detailsPromises = bookingResponse.data.map(async ({ service_id, vehicle_id, user_id }) => {
        try {
          // Make API call for service details
          const serviceDetailsResponse = await axios.post('http://127.0.0.1:8001/api/get_details/', { service_id, vehicle_id });
          const serviceDetails = serviceDetailsResponse.data;

          // Make API call for mechanic details
          const mechanicDetailsResponse = await axios.post('http://127.0.0.1:8000/api/userdetails/', { user_id });
          const mechanicDetails = mechanicDetailsResponse.data;

          return [serviceDetails, mechanicDetails];
        } catch (error) {
          console.error(`Error fetching details for service_id: ${service_id}, vehicle_id: ${vehicle_id}, mechanic_id: ${user_id}`, error);
          return [null, null]; // Return null for both details if there's an error
        }
      });

      // Wait for all the API calls to complete
      const detailsResponses = await Promise.all(detailsPromises);

      // Extract service details and mechanic details
      const serviceDetails = detailsResponses.map(([serviceResponse]) => serviceResponse);
      const mechanicDetails = detailsResponses.map(([, mechanicResponse]) => mechanicResponse);

      // Set the lists of service details and mechanic details
      setServiceDetailsList(serviceDetails);
      setMechanicDetailsList(mechanicDetails);
    } catch (error) {
      console.error('Error fetching main booking data:', error);
    }
  };


  useEffect(() => {

    fetchData();
  }, []);


  // Calculate total pages based on the number of rows per page (5 in this case)
  const totalPages = Math.ceil(bookingData.length / 5);

  // Calculate the starting and ending indices for the current page
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;

  // Get the rows for the current page
  const currentPageRows = bookingData.slice(startIndex, endIndex);


  return (
    <div className="pt-5 h-full">
      <div className='m-3'>
        <Card className="h-full w-full p-5">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Booking History
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
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
                {currentPageRows.map(
                  ({
                    id,
                    status_display,
                    user_id,
                    mechanic_id,
                    service_id,
                    vehicle_id,
                    payment,
                    date_time,
                    created_at,
                    place,
                    status,
                  }, index) => {
                    const isLast = index === currentPageRows.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                    const serviceDetails = serviceDetailsList[startIndex + index] || {};
                    const mechanicDetails = mechanicDetailsList[startIndex + index] || {};

                    // Check if the vehicle_name exists in serviceDetails
                    if (serviceDetails.vehicle_details && serviceDetails.vehicle_details.vehicle_name) {
                      return (
                        <tr key={id}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {startIndex + index + 1}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                <Avatar
                                  src={serviceDetails.vehicle_details && serviceDetails.vehicle_details.image}
                                  size="sm"
                                  alt={place}
                                  variant="square"
                                  className="h-full w-full object-contain p-1"
                                />

                              </div>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal capitalize"
                                >
                                {serviceDetails.vehicle_details.vehicle_name}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {mechanicDetails.user_name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {serviceDetails.service_details && serviceDetails.service_details.name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {serviceDetails.service_details && `$${serviceDetails.service_details.price}`}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {formatDateTime(date_time)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                            <Chip
                size="sm"
                variant="ghost"
                value={status_display}
                color={
                    status_display === "Completed"
                    ? "green"
                    : status_display === "Canceled"
                    ? "amber"
                    : status_display === "Scheduled"
                    ? "blue"
                    : "red"
                }
                    />


                </div>
                          </td>
                          <td className={classes}>
                            {/* <Tooltip content="Cancel Booking">
                              <IconButton variant="text">
                                <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip> */}
                            <MenuDefault pk={id} fetchData={fetchData}/>
                          </td>
                        </tr>
                      );
                    } else {
                      return null; // Skip rendering the row if vehicle_name doesn't exist
                    }
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages).keys()].map((page) => (
                <Button
                  key={page + 1}
                  variant={currentPage === page + 1 ? "filled" : "outlined"}
                  size="sm"
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
