// OtpVerification.jsx
import React, { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderUser from "../../components/user/Headeruser";

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receivedOtp = location.state?.otp;
  const url = location.state?.url;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async () => {
    try {
      // Extract OTP from URL parameters
    //   const urlParams = new URLSearchParams(location.search);
    // //   const receivedOtp = urlParams.get('otp');

      // Check if entered OTP matches the received OTP
      if (otp === receivedOtp) {
        // OTP verification successful

        // Prepare user registration data
        const formData = location.state?.formData || {};
        const userData = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
        };

        // Send user registration data to the specified API
        const response = await axios.post(`http://127.0.0.1:8000/api/${url}`, userData);

        if (response.status === 201) {
          // Registration successful
          navigate('/');
        } else {
          console.error('Unexpected status code:', response.status);
        }
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while verifying OTP.');
    }
  };

  return (
    <>
      <HeaderUser />
      <div className="max-w-md mx-auto mt-5 bg-white p-4">
        <h2 className="text-2xl font-semibold mb-6">OTP Verification {url}</h2>

        <Typography color="blue-gray" className="text-center mb-4">
          Please enter the OTP 
        </Typography>

        <div className="mb-4">
          <label htmlFor="otp" className="text-blue-gray-500 text-sm">
            OTP
          </label>
          <Input
            type="text"
            color="blue"
            placeholder="Enter OTP"
            required
            value={otp}
            onChange={handleChange}
          />
          {error && <Typography color="red" className="mt-1">{error}</Typography>}
        </div>

        <Button
          onClick={handleVerifyOtp}
          color="blue"
          size="regular"
          ripple="light"
          className="w-full mb-4"
        >
          Verify OTP
        </Button>

        <Typography color="gray" className="text-center font-normal">
          Didn't receive OTP? <a href="#" className="font-medium text-blue-500">Resend OTP</a>
        </Typography>
      </div>
    </>
  );
};

export default OtpVerification;
