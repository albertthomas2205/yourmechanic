import React from "react";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import axios from "axios";

export default function MenuDefault(props) {
    const cancelBooking = async () => {
        try {
          const data = {
            pk: props.pk,
            action: 'cancel_booking'
          };
      
          const response = await axios.put('http://127.0.0.1:8002/api/booking/bookingcanceld/', data);
          console.log('Cancellation successful:', response.data);
      
          // Add any additional logic or state updates as needed
          if (response.data){
            props.fetchData();
          }
         

        } catch (error) {
          console.error('Error cancelling booking:', error);
          // Handle the error, show a message, or perform other actions
        }
      };

      const completedBooking = async () => {
        try {
          const data = {
            pk: props.pk,
            action: 'update_to_completed'
          };
      
          const response = await axios.put('http://127.0.0.1:8002/api/booking/bookingcanceld/', data);
          console.log('Cancellation successful:', response.data);
      
          // Add any additional logic or state updates as needed
          if (response.data){
            props.fetchData();
          }
         

        } catch (error) {
          console.error('Error cancelling booking:', error);
          // Handle the error, show a message, or perform other actions
        }
      };
  const handleCancelClick = () => {
    cancelBooking();
    
  };
  const handlecompletedClick = () => {
    completedBooking();
    
  };

  return (
    <Menu>
      <MenuHandler>
        <Button>Update</Button>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={handleCancelClick}>Cancel</MenuItem>
        <MenuItem onClick={handlecompletedClick}>Completed</MenuItem>
      </MenuList>
    </Menu>
  );
}
