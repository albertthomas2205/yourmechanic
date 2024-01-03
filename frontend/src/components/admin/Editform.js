import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";

export default function Editform({ serviceId, onEdit }) {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState([]);
  const [serviceData, setServiceData] = useState({
    name: '',
    price: '',
    time_required: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    // Fetch service data when the component mounts
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8001/api/services/${serviceId}/`);
        setServiceData(response.data);
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    };

    fetchServiceData();
  }, [serviceId]);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError([]);

    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("price", event.target.price.value);
    formData.append("time_required", event.target.time_required.value);
    formData.append("description", event.target.description.value);

    // Check if a new image is selected
    if (event.target.image.files && event.target.image.files.length > 0) {
      formData.append("image", event.target.image.files[0]);
    } else {
      // If image is required, set an error
      setFormError(["Image is required."]);
      return;
    }

    // Basic form validation
    if (!formData.get("name") || !formData.get("price") || !formData.get("time_required") || !formData.get("description")) {
      setFormError(["All fields are required."]);
      return;
    }

    try {
      const res = await axios.put(`http://127.0.0.1:8001/api/services/${serviceId}/`, formData);

      if (res.status === 200) {
        // Handle success
        handleOpen();
        console.log(res.data);

        // Display alert box
        alert("Service updated successfully!");

        // Call the onEdit callback to update the parent component
        onEdit(res.data);

        // Close the dialog after a short delay (e.g., 1 second)
        setTimeout(() => {
          setOpen(false);
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("error");
        console.log(error.response.data);
        setFormError(error.response.data.name);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Button onClick={handleOpen} color="">
        Edit
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader />
          <CardBody className="flex flex-col gap-4">
            <form className="flex flex-col items-center justify-center mt-8 mb-2 w-full" onSubmit={handleSubmit}>
              <Typography variant="h4" color="blue-gray">
                Edit Service
              </Typography>
              {formError.length > 0 && (
                <Typography variant="p" color="red">
                  {formError.join(" ")}
                </Typography>
              )}
              <br />
              <div className="mb-1 flex flex-col gap-6 w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Service Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="Service Name"
                  name="name"
                  value={serviceData.name}
                  onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
                  className="!border-t-blue-gray-200 form-control focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Cost
                </Typography>
                <Input
                  size="lg"
                  placeholder="Cost"
                  name="price"
                  value={serviceData.price}
                  onChange={(e) => setServiceData({ ...serviceData, price: e.target.value })}
                  className="!border-t-blue-gray-200 form-control focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Time
                </Typography>
                <Input
                  size="lg"
                  placeholder="Time"
                  name="time_required"
                  value={serviceData.time_required}
                  onChange={(e) => setServiceData({ ...serviceData, time_required: e.target.value })}
                  className="!border-t-blue-gray-200 form-control focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Description
                </Typography>
                <Input
                  size="lg"
                  placeholder="Description"
                  name="description"
                  value={serviceData.description}
                  onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
                  className="!border-t-blue-gray-200 form-control focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Image
                </Typography>
                <Input
                  type="file"
                  size="lg"
                  name="image"
                  onChange={(e) => setServiceData({ ...serviceData, image: e.target.files[0] })}
                  className="!border-t-blue-gray-200 form-control focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div className="flex justify-between w-full">
                <Button type="submit" className="mt-6 w-1/2" color="green">
                  Update Service
                </Button>
                <Button className="mt-6 w-1/2" color="red" onClick={handleOpen}>
                  Close
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
