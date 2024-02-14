import React, { useState } from "react";
import {useEffect} from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import useRazorpay from "react-razorpay";
import Time from "./Time";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Input, Select } from "@material-tailwind/react";
import RazerPay from "./Payment/RzerPay";
import axios from 'axios';
import Registration from "./Registration";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { admininstance, authentication, bookinginstance, chatinstance } from "../axios/AxiosInstance";

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
  const [error,setError]=useState()
  console.log(typeof(props.price))
  const convertedPrice = Number(props.price); // or parseFloat(props.price)

  const [amount, setAmount] = useState(isNaN(convertedPrice) ? 0 : convertedPrice);
 


 const navigate = useNavigate()
  const afterpayment = ()=>{
    navigate("/userprofile/")
  }
  const id = useSelector((state)=>state.persistedAuthReducer.authentication_user.id);

  const fetchUserVehicles = async () => {
    try {
      const response = await authentication.get(`user-vehicles/${id}/`);
      console.log(response.data);
      setVehicless(response.data);
    } catch (error) {
      console.error('Error fetching user vehicles:', error);
    }
  };

  useEffect(() => {
    fetchUserVehicles();
  },[]);
  useEffect(() => {
    // Fetch vehicle information using the provided API endpoint
   admininstance
      .get(`vehiclesdetails/${props.vehicleid}/`)
      .then((response) => {
        // Assuming the data structure of the vehicle details
       console.log(response.data)
       setVehicle(response.data.vehicle_name)
   
      })
      .catch((error) => {
        console.error("Error fetching vehicle information:", error);
      });
  }, [props.vehicle_id]);



  const handleSubmitform = async (e) => {
    e.preventDefault();
    if (!place || !datetime ) {
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
      id:props.id,
      user_id:id,
      mechanic_id:props.mechanic_id,
      service_id: props.serviceid,
      vehicle_id: props.vehicleid,
      payment:'true',  // Adjust as needed
      date_time: datetime,
      place:place,
      status: 'p',  // Adjust as needed
    };
    console.log(formData)
    try {
      // Make a POST request to the API endpoint
      const response = await bookinginstance.post('bookings/', formData);
       console.log(response.data)
      console.log('Booking successful:', response.data.id);
      if (response.status === 201){
        const booking_id = response.data.id
        paymentHandler(booking_id)
        GetRoom();
      }
  
      // Add any additional logic or state updates after a successful booking
    } catch (error) {
      console.error('Error booking:', error);
      // Handle error, display error message, or take appropriate action
    }
  };


// const baseURL='http://127.0.0.1:8003'

// const getUserId = async ()=>{

//     try {

//      const data = 6
     
//         const res = await chatinstance.get( 
//         "getuserid/", 
//           { params: data } 
//         );
    
//         if (res.status === 202) {
// console.log("haiii")
       
//         }
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
// }


useEffect(() => {

  GetRoom(); 

}, []);

const GetRoom = async () => {

try {
  console.log("getrooom calledd...")
  // console.log(authentication_user.first_name)
  // console.log(mechanic.first_name)
  const k = parseInt(id);
  const c = props.mechanic_id;
  
  var data = { user1:k, user2:c};
  console.log(data)
  const res = await chatinstance.get("findrooms/", {
    params: data,
  });

  if (res.status === 200) {
 
    console.log("haiii")
  }
} catch (error) {
  console.error("Error fetching comments:", error);
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
  
  const handleVehicleSelect = (selectedVehicleId) => {
    setVehicle(selectedVehicleId);
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





  const [Razorpay] = useRazorpay();
  

  // const amount = parseInt(props.amount, 10);
 

  const currency = "INR";
  const receiptId = "qwsaq1";
  const server = "http://127.0.0.1:8002"
  const amounts = 100
  const paymentHandler = async (e) => {
    let bodyData = {"amount":amounts,"name":props.servicename ,"booking_id":e}
    const response = await axios({
        url: `${server}/api/booking/pay/`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: bodyData,
      })
    const order = await response.data.order
    console.log('uyyyyyyyyyyyyyyy',order);
 

    var options = {
      key: "rzp_test_I7m6Q9rCGvlC2t", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.order_payment_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {

        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)


        const body = response
  console.log(body)
        const validateRes = await fetch(
          `${server}/api/booking/process-payment-response/`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },

          }
        );

        const jsonRes = await validateRes.json();
        afterpayment()
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);

    // var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  
  };
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Check Avilability
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
                  value={props.servicename}
                 
                />
              </div>

              <div>
                <Input
                  type="text"
                  id="service"
                  name="service"
                  label="service"
                  placeholder="vehicle name"
                  value={vehicle}
                  onChange={(e) => setPlace(e.target.value)}
                />
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
              <div>
                <Input
                  type="text"
                  id="place"
                  label="Place"
                  name="place"
                  placeholder="Place"
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
