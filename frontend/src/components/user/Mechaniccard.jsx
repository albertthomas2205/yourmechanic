import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Chip,
  Button,
} from '@material-tailwind/react';
import axios from 'axios';


export default function Mechaniccard(props) {
  const [profile, setProfile] = useState({
    id: null,
    place: '',
    pin: '',
    experience: 0,
    is_verify: false,
    mechanic_id: null,
    description: '',
    profile_pic: '',
   
  });

  const handlverification = async () => {
    const data = { mechanic_id: props.id };
  
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/verify-mechanic/`, data);
  
      if (response.status === 200) {
        alert("Succesfully updated the status"); // Display the response message in an alert box
      } else {
        alert('Verification failed. Please try again.'); // You can customize this message based on your API response structure
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error verifying mechanic. Please try again.'); // Display an error message if there's an issue with the request
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/mechanic-profile/${props.id}/`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.id,handlverification]);

  



 

  if (profile.id === null) {

    
 
  
    return (
       <div>
        
          <Typography variant="h6" color="red">
            No details submitted by the mechanic.
          </Typography>
          </div>
    
    );
  }


  return (

    
    
    <div>
    

   <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={profile.profile_pic}
          alt="card-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </CardHeader>
      <CardBody>
        <div className="mb-4">
          <Typography variant="h5" color="blue-gray">
            Mechanic Details
          </Typography>
        </div>
        <div className="mb-2">
          <Typography>
            <strong>Description:</strong> {profile.description}
          </Typography>
        </div>
        <div className="mb-2">
          <Typography>
            <strong>Place:</strong> {profile.place}
          </Typography>
        </div>
        <div className="mb-2">
          <Typography>
            <strong>Pin:</strong> {profile.pin}
          </Typography>
        </div>
        <div className="mb-2">
          <Typography>
            <strong>Experience:</strong> {profile.experience} years
          </Typography>

          <Button
  onClick={handlverification}
  color={profile.is_verify ? 'green' : 'red'}
>
  {profile.is_verify ? 'Mechanic Verified' : 'Verify Mechanic'}
</Button>
        </div>
        <div className="mb-2">
        </div>
        
      </CardBody>
      <CardFooter className="pt-0">
  
      </CardFooter>
    </Card>
    </div>
  );
}
