import React, { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import HeaderUser from "./Headeruser";

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Here you can integrate with your authentication system
    // For example, using Firebase authentication
    // auth.signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     onSignIn(user);
    //   })
    //   .catch((error) => {
    //     // Handle errors
    //     console.error(error.message);
    //   });
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign In logic here
  };

  return (
  <>

    <div className="max-w-md mx-auto bg-white mt-8 border-s-orange-50 p-4">
      <Typography variant="h5" color="blue-gray" className="mb-4 font-bold text-center">
        Sign In
      </Typography>
      <div className="mb-4">
        <label htmlFor="email" className="text-blue-gray-500 text-sm mb-2 block">
          Email
        </label>
        <Input
          type="email"
          color="blue"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="text-blue-gray-500 text-sm mb-2 block">
          Password
        </label>
        <Input
          type="password"
          color="blue"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        color="gradient"
        size="sm"
        ripple="light"
        onClick={handleSignIn}
        className="w-full mb-2"
      >
        Sign In
      </Button>
      <Button
        color="blue"
        size="sm"
        ripple="light"
        // onClick={handleGoogleSignIn}
        className="w-full mb-2"
      >
        Continue with Google
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Don't have an account?{" "}
        <a href="#" className="font-medium text-gray-900">
          Sign Up
        </a>
      </Typography>
    </div>
    </>
  );
}

export default SignIn;
