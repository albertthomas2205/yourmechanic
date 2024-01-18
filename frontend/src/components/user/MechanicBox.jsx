import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckAvailability from './Checkavilability';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

   
  export  default function   MechanicBox(props) {
    const [profileData, setProfileData] = useState([]);

useEffect(() => {
  axios.get(`http://127.0.0.1:8000/api/mechanic-profile/${props.id}/`)
    .then(response => {
      console.log(response.data)
      setProfileData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, [props.id]);



    const navigate = useNavigate()
    const Clickbutton = () => {
      navigate("/userprofile");
    };
    return (
      <Card className="mt-6 w-96">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={profileData.profile_pic}
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {props.name}{props.id}{props.price}
          </Typography>
          <Typography>
            {props.serviceid}
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to &quot;Naviglio&quot; where you can enjoy the main
            night life in Barcelona.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
      <CheckAvailability id={props.id} serviceid ={props.serviceid} mechanic_id ={props.id} price={props.price} vehicleid ={props.vehicleId} servicename={props.servicename}/>
        </CardFooter>
      </Card>
    );
  }