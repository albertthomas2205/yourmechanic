import React from "react";
import { Drawer, Button, Typography, IconButton } from "@material-tailwind/react";
import RegistrationForm from './Registration.jsx';
import SignIn from "./Signin.jsx";
import Registration from "./Registration.jsx";
import OtpVerification from "./Otp.jsx";

export function Login({openRight, setOpenRight, state,setstate}) {
//   const [openRight, setOpenRight] = React.useState(false);

//   const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  const size = state === "r" ? 700 : 500;
  const handlestate =(event) =>{
    setstate(event)
  }

  // const k = setstate
  

  return (
    <React.Fragment>
      {/* <div className="flex flex-wrap gap-4">
        <Button onClick={openDrawerRight}>login</Button>
      </div> */}
      <Drawer

        size={size}
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-5 mt-5  bg-ligftfadeblue"
        overlay = {false}

       
      ><div className="p-4 m-4 bg-white overflow-hidden border-red" >
     
       
    {state === 's' ? <SignIn /> : state === 'o' ? <OtpVerification /> : <Registration state={state}   handlestate={handlestate} />}
  
    </div>
        
      </Drawer>
    </React.Fragment>
  );
}
