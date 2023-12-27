import React, { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUserRegistration } from "../../Redux/user/RegistrationSlice";
const Registration = (props) => {
const dispatch = useDispatch();
const navigate = useNavigate()

  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {

    try {
      const response = await axios.post('http://127.0.0.1:8000/accounts/otp/', {
        email: formData.email,
      });
      console.log("haiii")
      // Check the status code and handle accordingly
      if (response.status === 201) {
        console.log("helloo")
        console.log(response)
      
        const otp = response.data.otp;

        // Dispatch the action to update the Redux store with user details and OTP
        const userData = {
          first_name:formData.first_name,
          last_name:formData.last_name,
          email:formData.email,
          phone_number:formData.phone_number,
          password:formData.password,
          otp:otp,
          // Add any other user details you want to store in the Redux store
        };
        dispatch(setUserRegistration(userData));
        navigate('/service/')
        
        // Assuming signup logic is successful, navigate to "/"
      
      } else {
        console.error('Unexpected status code:', response.status);
        // Handle other status codes if needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
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
              name="confirmpassword"
              onChange={handleChange}
            />
          </div>
        </div>

        <Button
          type="submit"
          color="blue"
          size="regular"
          ripple="light"
          className="w-full mb-4"
          // onClick={()=>props.handlestate("o")}
        >
          Register
        </Button>

        {/* Continue with Google */}
     

        {/* Already have an account link */}
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </>
  );
};

export default Registration;
