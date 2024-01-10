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

export default function AddAdminVehicle() {
  const [open, setOpen] = React.useState(false);
  const [formError, setFormError] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/api/brands/');
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError([]);

    const formData = new FormData();
    formData.append("vehicle_name", event.target.name.value);
    formData.append("description", event.target.description.value);

    const selectedBrandName = event.target.brand.value;
    const selectedBrand = brands.find((brand) => brand.brand_name === selectedBrandName);

    if (!formData.get("vehicle_name") || !formData.get("description") || !selectedBrand) {
      setFormError(["All fields are required."]);
      return;
    }

    formData.append("brand", selectedBrand.id);

    // Add image file if provided
    const imageInput = event.target.image;
    if (imageInput.files.length > 0) {
      formData.append("image", imageInput.files[0]);
    }

    try {
      console.log(formData);
      const res = await axios.post('http://127.0.0.1:8001/api/vehicles/', formData);

      if (res.status === 201) {
        handleOpen();
        console.log(res.data);

        alert("Vehicle added successfully!");

        setTimeout(() => {
          setOpen(false);
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("error");
        console.log(error.response.data);
        setFormError(error.response.data.vehicle_name || error.response.data.description || error.response.data.brand);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Button onClick={handleOpen} color="green">
        Add Vehicle
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
                Add Vehicle
              </Typography>
              {formError.length > 0 && (
                  <Typography variant="p" color="red">
                    {formError.join(" ")}
                  </Typography>
                )}
              <br />
              <div className="mb-1 flex flex-col gap-6 w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Vehicle Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="Vehicle Name"
                  name="name"
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
                  className="!border-t-blue-gray-200 form-control focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Brand
                </Typography>
                <select
                  name="brand"
                  className="!border-t-blue-gray-200 form-control focus:!border-t-gray-900"
                >
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.brand_name}>
                      {brand.brand_name}
                    </option>
                  ))}
                </select>
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Image
                </Typography>
                <Input
                  type="file"
                  size="lg"
                  placeholder="Upload Image"
                  name="image"
                  className="!border-t-blue-gray-200 form-control focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div className="flex justify-between w-full">
                <Button type="submit" className="mt-6 w-1/2" color="green">
                  Add Vehicle
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
