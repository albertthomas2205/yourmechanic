import { Carousel, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import mechanicImage from '../../images/mechanic.png';
 
export default function Homedesign() {
    const navigate =useNavigate()
    const ServiceClick = () =>{
      navigate("/service/")
    }

    const MechanicClick = () =>{
      navigate("/mechanics/")

    }
  return (
    <Carousel className="rounded-xl">
      <div className="relative h-full pt-[3rem] w-full">
        <img
         src={mechanicImage}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center  bg-black/75">
        <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32  mt-[4rem] ">
            <Typography
              variant="h1"
              color="white"
              className="mb-4  ml-4 text-3xl md:text-4xl lg:text-5xl"
            >
            Driving Confidence Starts Here 
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-6 opacity-80"
            >
              Book Your Mechanic with Ease
            Experience peace of mind on the road 
             effortless mechanic bookings, guaranteed satisfaction Feel free to tailor these suggestions to better match the tone and specific features of your mechanic booking websit
            </Typography>
            <div className="flex justify-center gap-2">
              <Button onClick={ServiceClick} size="lg" color="white">
            Services
              </Button>
              <Button size="lg" onClick={MechanicClick} color="white" variant="text">
       Mechanics
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="white">
                Services
              </Button>
              <Button size="lg" color="white" variant="text">
                Mechanics
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}