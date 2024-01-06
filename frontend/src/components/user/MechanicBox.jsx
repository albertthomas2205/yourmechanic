import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";


   
  export  default function   MechanicBox(props) {


    const navigate = useNavigate()
    const Clickbutton = () => {
      navigate("/userprofile");
    };
    return (
      <Card className="mt-6 w-96">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src="https://www.autotrainingcentre.com/wp-content/uploads/2019/09/Sept-27-automotive-technology-training.jpg"
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {props.name}
          </Typography>
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to &quot;Naviglio&quot; where you can enjoy the main
            night life in Barcelona.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={Clickbutton}>Select</Button>
        </CardFooter>
      </Card>
    );
  }