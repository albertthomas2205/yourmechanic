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
  Button,
} from "@material-tailwind/react";
import { useSelector } from 'react-redux';
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import instance from '../../axios/axiosInstences';
import Review from '../../../pages/User/Booking/Review';

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

  if (formattedDateTime.getMinutes() === 30) {
    formattedDateTime.setHours(formattedDateTime.getHours() + 1, 0, 0, 0);
  } else {
    formattedDateTime.setMinutes(0, 0, 0);
  }

  return formattedDateTime.toLocaleString('en-US', options);
};

const TABLE_HEAD = ["Sl. No", "Vehicle", "Mechanic", "Service", "Amount", "Date", "Status","",""];

const Userbooking = () => {
  const id = useSelector((state)=>state.persistedAuthReducer.authentication_user.id);
  const [bookingData, setBookingData] = useState([]);
  const [serviceDetailsList, setServiceDetailsList] = useState([]);
  const [mechanicDetailsList, setMechanicDetailsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCancelBooking = async (id) => {
    const data = {
     pk:id,
     action:'cancel_booking'
    }
   try {
     const response = await instance.put('/booking/bookingcanceld/',data);
     console.log(response.data);
     fetchData(); // Log the response from the server

     // Update the bookingData state or perform any other necessary actions
     // ...
   } catch (error) {
     console.error('Error canceling booking:', error);
   }
 };

 const fetchData = async () => {
  try {
    const bookingResponse = await instance.get(`/booking/bookinguser/${id}`);
    setBookingData(bookingResponse.data);

    const detailsPromises = bookingResponse.data.map(async ({ service_id, vehicle_id, mechanic_id }) => {
      try {
        const serviceDetailsResponse = await axios.post('http://127.0.0.1:8001/api/get_details/', { service_id, vehicle_id });
        const serviceDetails = serviceDetailsResponse.data;

        const mechanicDetailsResponse = await axios.post('http://127.0.0.1:8000/api/details/', { mechanic_id });
        const mechanicDetails = mechanicDetailsResponse.data;

        return [serviceDetails, mechanicDetails];
      } catch (error) {
        console.error(`Error fetching details for service_id: ${service_id}, vehicle_id: ${vehicle_id}, mechanic_id: ${mechanic_id}`, error);
        return [null, null];
      }
    });

    const detailsResponses = await Promise.all(detailsPromises);

    const serviceDetails = detailsResponses.map(([serviceResponse]) => serviceResponse);
    const mechanicDetails = detailsResponses.map(([, mechanicResponse]) => mechanicResponse);

    setServiceDetailsList(serviceDetails);
    setMechanicDetailsList(mechanicDetails);
  } catch (error) {
    console.error('Error fetching main booking data:', error);
  }
};

  useEffect(() => {

    fetchData();
  }, []);

  const totalPages = Math.ceil(bookingData.length / 5);
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
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
                              {mechanicDetails.mechanic_name}
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
                            <Chip
                              size="sm"
                              variant="ghost"
                              value={status_display}
                              color={
                                status_display === "Completed"
                                  ? "green"
                                  : status_display === "Canceled"
                                  ? "red"
                                  : status_display === "Scheduled"
                                  ? "blue"
                                  : "red"
                              }
                            />
                          </td>
                          <td className={classes}>
                                            {status_display === "Completed" ? (
                    <Review id={id} mechanic_id ={mechanic_id} service_name = {serviceDetails.service_details.name}/>
                  ) : status_display === "Canceled" ? (
                    // Render something specific for "Cancel"
                    <span></span>
                  ) : (
                    <Button
                      variant="outlined"
                      color="red"
                      size="sm"
                      onClick={() => handleCancelBooking(id)}
                    >
                      Cancel
                    </Button>
                  )}
                                            
                   
                          </td>
                          <td className={classes}>
                           
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
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
};

export default Userbooking;
