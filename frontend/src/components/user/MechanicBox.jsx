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
import { authentication } from '../axios/AxiosInstance';

   
  export  default function   MechanicBox(props) {
    const [profileData, setProfileData] = useState([]);

useEffect(() => {
  authentication.get(`mechanic-profile/${props.id}/`)
    .then(response => {
      console.log(response.data)
      setProfileData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  // setProfileData(props.searchmechanic)
}, [props.id]);



    const navigate = useNavigate()
    const Clickbutton = () => {
      const mechanicId = props.id;
      const name = props.name;
      navigate("/mechanicprofile", { state: { mechanicId ,name} });
    };
    return (
      <Card className="mt-6 w-96">
        <CardHeader onClick={Clickbutton} color="blue-gray" className="relative h-56">
          <img
            src={profileData.profile_pic}
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {props.name}
          </Typography>
          <Typography>
            {props.serviceid}
            Place :     {profileData.place}  
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