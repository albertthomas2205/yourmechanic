import React, { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderUser from "../../components/user/Headeruser";
import { useLocation } from 'react-router-dom';
import {authentication} from "../../components/axios/AxiosInstance"

const AdminSignup = () => {
  const { state } = useLocation();
  const name = state && state.name;
  let url = name === "adminregister";
  const navigate = useNavigate();
  let check = name === "user" ? "check_useremail":"check_email"
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.first_name.trim()) {
      errors.first_name = 'First Name is required';
    }

    if (!formData.last_name.trim()) {
      errors.last_name = 'Last Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.phone_number.trim()) {
      errors.phone_number = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      errors.phone_number = 'Invalid phone number';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const emailCheckResponse = await authentication.post(`${check}/`, {
        email: formData.email,
      });

      if (emailCheckResponse.status === 200) {
        const response = await authentication.post('adminregister/', formData
          
        );

        if (response.status === 201) {
         
        console.log("heyyyyyy") 

          navigate('/');
        } else {
          console.error('Unexpected status code:', response.status);
        }
      } else if (emailCheckResponse.status === 406) {

        setEmailError("Email already exists...");
      } else {
        console.error('Unexpected status code for email check:', emailCheckResponse.status);
      }
    } catch (error) {
      setEmailError("Email already exists...");
      console.error('Error:', error);
    }
  };

  return (
    <>
      <HeaderUser />
      <div style={{ marginTop: "10rem" }}>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-5 bg-white p-4">
          <h2 className="text-2xl font-semibold mb-6">{name} Register</h2>

          <div className="grid grid-cols-1 gap-4 bg-white md:grid-cols-2 mb-4">
         
            {emailError && <Typography color="red">{emailError}</Typography>}
        
       
            <div>
              <label htmlFor="firstName" className="text-blue-gray-500 text-sm">
                First Name
              </label>
              <Input
                type="text"
                color="blue"
                placeholder="Enter your first name"
                required
                name="first_name"
                onChange={handleChange}
              />
              {errorMessages.first_name && <Typography color="red">{errorMessages.first_name}</Typography>}
            </div>
            <div>
              <label htmlFor="lastName" className="text-blue-gray-500 text-sm">
                Last Name
              </label>
              <Input
                type="text"
                color="blue"
                placeholder="Enter your last name"
                required
                name="last_name"
                onChange={handleChange}
              />
              {errorMessages.last_name && <Typography color="red">{errorMessages.last_name}</Typography>}
            </div>
            <div>
              <label htmlFor="email" className="text-blue-gray-500 text-sm">
                Email
              </label>
              <Input
                type="email"
                color="blue"
                placeholder="Enter your email"
                required
                name="email"
                onChange={handleChange}
              />
              {errorMessages.email && <Typography color="red">{errorMessages.email}</Typography>}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="text-blue-gray-500 text-sm">
                Phone Number
              </label>
              <Input
                type="tel"
                color="blue"
                placeholder="Enter your phone number"
                required
                name="phone_number"
                onChange={handleChange}
              />
              {errorMessages.phone_number && <Typography color="red">{errorMessages.phone_number}</Typography>}
            </div>
            <div>
              <label htmlFor="password" className="text-blue-gray-500 text-sm">
                Password
              </label>
              <Input
                type="password"
                color="blue"
                placeholder="Enter your password"
                required
                name="password"
                onChange={handleChange}
              />
              {errorMessages.password && <Typography color="red">{errorMessages.password}</Typography>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-blue-gray-500 text-sm">
                Confirm Password
              </label>
              <Input
                type="password"
                color="blue"
                placeholder="Confirm your password"
                required
                name="confirmPassword"
                onChange={handleChange}
              />
              {errorMessages.confirmPassword && <Typography color="red">{errorMessages.confirmPassword}</Typography>}
            </div>
          </div>

          <Button
            type="submit"
            color="blue"
            size="regular"
            ripple="light"
            className="w-full mb-4"
          >
            Register
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </form>
      </div>
    </>
  );
};

export default AdminSignup;