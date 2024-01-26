import React from "react";
import {
  Button,
  Dialog,

} from "@material-tailwind/react";

 import Chatmodel from "./Chatmodel";
export default function Chatmodal() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <Chatmodel/>
        
      </Dialog>
    </>
  );
}