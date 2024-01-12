import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import Vehiclereadmore from "./Vechiclereadmore";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { background } from "@chakra-ui/react";

export default function VehicleCard(props) {
  const [brandName, setBrandName] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState({});

  useEffect(() => {
    // Fetch brand information using the provided API endpoint
    axios
      .get(`http://127.0.0.1:8001/api/brands/${props.brandid}/`)
      .then((response) => {
        // Assuming the brand_name is available in the response
        const brandNameFromAPI = response.data.brand_name;
        setBrandName(brandNameFromAPI);
      })
      .catch((error) => {
        console.error("Error fetching brand information:", error);
      });
  }, [props.brandid]);

  useEffect(() => {
    // Fetch vehicle information using the provided API endpoint
    axios
      .get(`http://127.0.0.1:8001/api/vehiclesdetails/${props.vehicle_id}/`)
      .then((response) => {
        // Assuming the data structure of the vehicle details
        const vehicleFromAPI = response.data;
        setVehicleDetails(vehicleFromAPI);
      })
      .catch((error) => {
        console.error("Error fetching vehicle information:", error);
      });
  }, [props.vehicle_id]);

  return (
    <>
      {vehicleDetails.image ? (
        <Card className="mt-6 w-96 ">
          {/* style={{backgroundImage:`url('${vehicleDetails.image}')` ,minHeight:100,}}  */}
          <CardHeader color="bg-black" className=" relative h-56 bg-cover ">
            <div>
              <img
                className="object-cover"
                src={vehicleDetails.image}
                alt="card-image"
              />
            </div>
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {vehicleDetails.vehicle_name}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            {/* <Button>Read More</Button> */}
            <Vehiclereadmore
              brandname={brandName}
              registration_no={props.registration_no}
              brand_id={props.brand_id}
              vehicle_id={props.vehicle_id}
              id={props.id}
              km={props.total_km}
              fetch={props.fetch}
              year={props.manufacture}
            />
          </CardFooter>
        </Card>
      ) : (
        ""
      )}
    </>
  );
}
