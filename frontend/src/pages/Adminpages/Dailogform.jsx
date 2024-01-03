import React, { useState } from 'react';
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

export default function DialogWithForm() {

  const [open, setOpen] = React.useState(false);
  const [formError, setFormError] = useState([]);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError([]);

    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("price", event.target.price.value);
    formData.append("time_required", event.target.time_required.value);
    formData.append("description", event.target.description.value);
    formData.append("image", event.target.image.files[0]);

    // Basic form validation
    if (!formData.get("name") || !formData.get("price") || !formData.get("time_required") || !formData.get("description") || !formData.get("image")) {
      setFormError(["All fields are required."]);
      return;
    }

    try {
      const res = await axios.post(`http://127.0.0.1:8001/api/services/`, formData);

      if (res.status === 201) {

        // Handle success
        handleOpen()
        console.log(res.data);

        // Display alert box
        alert("Service added successfully!");

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
      <Button onClick={handleOpen} color="green">
        Add Services
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
                Add Service
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
                  Image
                </Typography>
                <Input
                  type="file"
                  size="lg"
                  name="image"
                  className="!border-t-blue-gray-200 form-control focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
               
              </div>
              <div className="flex justify-between w-full">
                <Button type="submit" className="mt-6 w-1/2" color="green">
                  Add Service
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


