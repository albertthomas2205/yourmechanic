import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import UserVehicleEdit from "./Uservehicleedit";
import axios from 'axios';

export default function Vehiclereadmore(props) {
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/user-vehicle-update/${props.id}/`);

      if (response.status === 204) {
        // If the delete request is successful, call the fetch function to update the list
        props.fetch();
      } else {
        console.error('Failed to delete user vehicle');
      }
    } catch (error) {
      console.error('Error deleting user vehicle:', error);
    }
  };

  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
        >
          View More{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="hidden w-[27rem] gap-3 overflow-visible lg:grid">
        <ul className="flex w-full flex-col p-5">
          <MenuItem>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Brand: {props.brandname} {props.id}
            </Typography>
            <br />
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Total kilometers: {props.registration_no}
            </Typography>
            <br />
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Total kilometers: {props.km}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {/* Additional details */}
            </Typography>
          </MenuItem>
        </ul>
      </MenuList>
      {/* <div className="flex">
      <div className="p-4 flex">  <UserVehicleEdit id={props.id} fetch={props.fetch} /></div>
      <div className="p-4 flex">     <Button onClick={handleDelete} color="red">
        Delete
      </Button></div>
      </div>
     */}
    
  
    </Menu>
  );
}
