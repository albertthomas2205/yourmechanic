import React, { useState } from "react";
import {useEffect} from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import Time from "./Time";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Input, Select } from "@material-tailwind/react";
import axios from 'axios';
import Registration from "./Registration";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckAvailability(props) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [statusColor, setStatusColor] = useState(null);
  const [place, setPlace] = useState('');
  const [service, setService] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [vehicless, setVehicless] = useState([]);
  const [datetime, setDatetime]= useState();
  const [sample, setSample]= useState("a");
  console.log(typeof(props.price))
  const convertedPrice = Number(props.price); // or parseFloat(props.price)

  const [amount, setAmount] = useState(isNaN(convertedPrice) ? 0 : convertedPrice);
 
  const handleConfirm = async (e) => {
    e.preventDefault();
  
    // Use the state callback to get the updated value
    // setAmount((e) => {
    //   // Update the amount to 2000
    
    //   return props.price
    // });
  
    try {
      console.log("haiiiii");
  
      // Make the Axios POST request to your API
      const response = await axios.post('http://127.0.0.1:8002/api/booking/checkout-session/', {
        amount: amount,
        // You may include other form data here if needed
      });
  
      console.log(response.data);
  
      // Load Stripe and redirect to Checkout
      const stripe = await loadStripe('pk_test_51OXe9USH9jcXERVDaJZF7e63GH54Q3QsZjHtTyv5DkKHWZqZgY1gr4GC8QEKYBwIrQUzrpGbgVwfbnGFtNUL5PoI00zTkaauUo');
  
      stripe.redirectToCheckout({
        sessionId: response.data.checkoutSessionId,
      });
  
      // Reset the form after submission (optional)
  
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
    }
  };




  const id = useSelector((state)=>state.persistedAuthReducer.authentication_user.id);

  const fetchUserVehicles = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user-vehicles/${id}/`);
      console.log(response.data);
      setVehicless(response.data);
    } catch (error) {
      console.error('Error fetching user vehicles:', error);
    }
  };

  useEffect(() => {
    fetchUserVehicles();
  },[]);

  const handleSubmitform = async (e) => {
    e.preventDefault();
  
    // Validate form data before submitting
    if (!place || !service || !vehicle || !selectedDate || !selectedTime) {
      console.error('Please fill in all required fields.');
      return;
    }
  
    // Prepare data object to be sent to the API
    const formData = {
      user_id: id,
      mechanic_id:props.mechanic_id,
      service_id: props.serviceid,
      vehicle_id: vehicle,
      payment: false,  // Adjust as needed
      date_time: `${selectedDate.toISOString().split('T')[0]}T${selectedTime}:00:00Z`,
      status: 'p',  // Adjust as needed
    };
  
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post('http://127.0.0.1:8002/api/booking/bookings/', formData);
  
      console.log('Booking successful:', response.data);
  
      // Add any additional logic or state updates after a successful booking
    } catch (error) {
      console.error('Error booking:', error);
      // Handle error, display error message, or take appropriate action
    }
  };

  const morningSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
  ];
  const afternoonSlots = [
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
  ];

  const services = ["Service 1", "Service 2", "Service 3"]; // Replace with your actual service options
  const vehicles = ["Vehicle 1", "Vehicle 2", "Vehicle 3"]; // Replace with your actual vehicle options

  const handleOpen = () => setOpen(!open);

  const handleDateChange = async (date) => {
    setSelectedDate(date);

    setSample("b")
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const CustomInput = ({ value, onClick }) => (
    <div className="w-72" onClick={onClick}>
      <Input label="Select date" value={value} readOnly />
    </div>
  );

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const currentDateTime = getCurrentTime();
  console.log(currentDateTime);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Place:', place);
    console.log('Service:', service);
    console.log('Vehicle:', vehicle);
    // Add your logic for handling form data, such as making an API call with axios
  };

  // const handleConfirm = () => {
  //   // Perform any additional actions when confirming, if needed
  //   handleOpen();
  // };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <div style={{ backgroundColor: statusColor }}>
        <Dialog open={open} handler={handleOpen}>
          <div className="flex justify-center">
            <DialogHeader>Booking Form</DialogHeader>
          </div>
          <DialogBody>
            <div className="flex m-4 w-full">
            <DatePicker
  selected={selectedDate}
  onChange={handleDateChange}
  dateFormat="yyyy/MM/dd"
  // minDate={new Date()} // Set minimum date to today
  className="border border-gray-300 p-2 w-full mb-4"
  customInput={<CustomInput />}
  style={{ width: "100%" }}
/>
            </div>
            <div className="m-4">
            {props.id},{props.serviceid}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* <div>
                <Input
                  type="text"
                  id="place"
                  name="place"
                  label="Place"
                  placeholder="Enter your place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </div> */}
              <div>
                <Input
                  type="text"
                  id="service"
                  name="service"
                  label="service"
                  placeholder="Service Name"
                  value={props.servicename}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </div>

                          
                            <div>
                <Select
                  id="vehicle"
                  name="vehicle"
                  label="Select your vehicle"
                  value={vehicle}
                  onChange={(option) => setVehicle(option.id)}  // Use option.id instead of e.target.value
                >
                  {vehicless.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.registration_number}
                    </option>
                  ))}
                </Select>
              </div>
            <div>
                <Input
                  type="text"
                  id="cost"
                  name="cost"
                  placeholder=""
                  value={props.price}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </div>

          
            </form>
            </div>

            {selectedDate && (
              <>
                <div className="flex flex-wrap m-4 gap-2">
                  {morningSlots
                    .filter((slot) => `${selectedDate} ${slot}` > currentDateTime)
                    .map((slot, index) => (
                      <Time
                        key={index}
                        time={slot}
                        date={selectedDate}
                        selectedTime={selectedTime}
                        onTimeChange={handleTimeChange}
                        setDatetime={setDatetime}
                      />
                    ))}
                </div>
                <div className="flex flex-wrap m-4 gap-2">
                  {afternoonSlots
                    .filter((slot) => `${selectedDate} ${slot}` > currentDateTime)
                    .map((slot, index) => (
                      <Time
                        key={index}
                        time={slot}
                        date={selectedDate}
                        no 
                        selectedTime={selectedTime}
                        onTimeChange={handleTimeChange}
                        setDatetime={setDatetime}
                      />
                    ))}
                </div>
              </>
            )}
          </DialogBody>
          {datetime?datetime:""}
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleConfirm}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
}
