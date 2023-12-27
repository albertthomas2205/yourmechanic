import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Typography } from "@material-tailwind/react";

export default function AddServiceForm() {
  const [formError, setFormError] = useState([]);

  const handleSubmit = async (event) => {
    console.log("haiiii")
    event.preventDefault();
    setFormError([]);

    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("price", event.target.price.value);
    formData.append("time", event.target.time.value);
    formData.append("description", event.target.description.value);
    formData.append("image", event.target.image.files[0]);

    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/services/`, formData);

      if (res.status >= 200 && res.status < 300) {
        // Handle success, e.g., redirect or show a success message
        console.log(res.data);
      }
    } catch (error) {
      if (error.response.status === 406) {
        console.log("error");
        console.log(error.response.data);
        setFormError(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div color="transparent" shadow={false} className='bg-white overflow-y-auto overflow-x-auto'>
      <Typography variant="h4" color="blue-gray">
        Add Service
      </Typography>
      <form className="flex flex-col items-center justify-center mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto my-auto" onSubmit={handleSubmit} method='POST'>
        <div className="mb-1 flex flex-col gap-6 w-full">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Service Name
          </Typography>
          <Input
            size="lg"
            placeholder="Service Name"
            name='name'
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
            name='price'
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
            name='time'
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
            name='description'
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
            name='image'
            className="!border-t-blue-gray-200 form-control focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Add Service
        </Button>
      </form>
    </div>
  );
}
