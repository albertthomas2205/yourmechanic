import React, { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";

const OtpVerification = ({ onOtpVerification }) => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = () => {
    // Add your OTP verification logic here
    onOtpVerification(otp);
  };

  return (
    <>
      <form className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6">OTP Verification</h2>

        <div className="mb-4">
          <label htmlFor="otp" className="text-blue-gray-500 text-sm">
            Enter OTP
          </label>
          <Input
            type="text"
            color="blue"
            placeholder="Enter OTP"
            required
            name="otp"
            value={otp}
            onChange={handleChange}
          />
        </div>

        <Button
          type="button"
          color="blue"
          size="regular"
          ripple="light"
          className="w-full mb-4"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </Button>

        {/* Resend OTP */}
        <Typography color="gray" className="text-center font-normal">
          Didn't receive OTP?{" "}
          <a href="#" className="font-medium text-gray-900">
            Resend OTP
          </a>
        </Typography>
      </form>
    </>
  );
};

export default OtpVerification;
