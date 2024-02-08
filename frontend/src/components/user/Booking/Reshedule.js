import React, { useState } from "react";
import {useEffect} from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import Time from "../Time";
import { Alert } from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Input, Select } from "@material-tailwind/react";
import RazerPay from "../Payment/RzerPay";
import axios from 'axios';
import Registration from "../Registration";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

export default function Reshedule(props) {
  const [open, setOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [statusColor, setStatusColor] = useState(null);
  const [service, setService] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [vehicless, setVehicless] = useState([]);
  const [datetime, setDatetime]= useState();
  const [sample, setSample]= useState("a");
  const [error,setError]=useState()
  console.log(typeof(props.price))
  const convertedPrice = Number(props.price); // or parseFloat(props.price)

  const [amount, setAmount] = useState(isNaN(convertedPrice) ? 0 : convertedPrice);
 


 const navigate = useNavigate()
  const afterpayment = ()=>{
    navigate("/userprofile/")
  }
  const id = useSelector((state)=>state.persistedAuthReducer.authentication_user.id);



  useEffect(() => {
   
  },[]);



  const handleSubmitform = async (e) => {
    e.preventDefault();
    if ( !datetime ) {
      setError('Place and time required');
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    if (!datetime){
      setError('Please Select your timeslot');
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

  
    // Validate form data before submitting

   // Prepare data object to be sent to the API
    const formData = {
     
      user_id: props.user_id,
      mechanic_id:props.mechanic_id,
      service_id: props.serviceid,
      vehicle_id: props.vehicleid,  // Adjust as needed
      date_time: datetime,
      status:true,
      place:props.place,
      status: 's',  // Adjust as needed
    };
    console.log(formData)
    try {
      // Make a POST request to the API endpoint
      const response = await axios.patch(`http://127.0.0.1:8002/api/booking/bookings/${props.booking_id}/`, formData);
       console.log(response.data)
      console.log('Booking update successful:', response.data.id);
      if (response.status === 200){
        setShowSuccessAlert(true)
        setTimeout(()=>{
            setShowSuccessAlert(false)
            handleOpen()
        },3000
        )
       
        
        const booking_id = response.data.id
     
  
      }
  
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
    // console.log('Place:', place);
    console.log('Service:', service);
    console.log('Vehicle:', vehicle);
    // Add your logic for handling form data, such as making an API call with axios
  };


  //   // P



  
  return (
    <>
      <Button   variant="outlined"
                      color="blue"
                      size="sm" onClick={handleOpen}
                      style={{ width: "120px" }} >
       Reshedule 
      </Button>
      <div style={{ backgroundColor: statusColor }}>
        <Dialog open={open} handler={handleOpen}>
          <div className="flex justify-center">
            <DialogHeader>Booking Form</DialogHeader>
          </div>
          {showSuccessAlert && (
        <Alert variant="filled" color="green">
          <span>Booking Reshedule successfully.</span>
        </Alert>
      )}
          <DialogBody>
            <div className="flex m-4 w-full">
            <DatePicker
  selected={selectedDate}
  onChange={handleDateChange}
  dateFormat="yyyy/MM/dd"
  minDate={new Date()} // Set minimum date to today
  className="border border-gray-300 p-2 w-full mb-4"
  customInput={<CustomInput />}
  style={{ width: "100%" }}
/>
            </div>
            <div className="m-4">
    
        
            <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-500 mt-2">
                <span>{error}</span>
              </div>
            )}
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
                  value={props.service_name}
                 
                />
              </div>

              <div>
                <Input
                  type="text"
                  id="service"
                  name="service"
                  label="service"
                  placeholder="vehicle name"
                  value={props.vehicle_name}
                //   onChange={(e) => setPlace(e.target.value)}
                />
              </div>

                        
            <div>
                <Input
                  type="text"
                  id="cost"
                  name="cost"
                  placeholder=""
                  value={props.price}
                //   onChange={(e) => setPlace(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="text"
                  id="place"
                  label="Place"
                  name="place"
                  placeholder="Place"
                  value={props.place}
                //   onChange={(e) => setPlace(e.target.value)}
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
                        mechanic_id = {props.mechanic_id}
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
                        mechanic_id = {props.mechanic_id}
                      />
                    ))}
                </div>

              </>
            )}
          </DialogBody>
        
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" onClick={handleSubmitform} color="green">
              <span>Confirm</span>
            </Button>
           
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
}
