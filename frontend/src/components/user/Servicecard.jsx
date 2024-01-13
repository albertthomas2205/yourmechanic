import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import Readmore from "./Readmore";
   
  export default function ServiceCard(props) {
    return (
      <Card className="mt-6 w-96 ">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={props.image}
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.name}
          </Typography>
          <Typography>
          {props.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
            <Readmore price = {props.price} servicename={props.name} id={props.id} time = {props.time}/>
          {/* <Button>Read More</Button> */}
        </CardFooter>
      </Card>

    );
  }