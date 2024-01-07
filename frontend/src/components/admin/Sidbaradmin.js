import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

 
export default function Sidebaradmin({ className }) {
  const navigate = useNavigate()
  const MechanicClick = ()=>{
  navigate("/admin/adminhome/")
  }
  const ServicClick = ()=>{
    navigate("/admin/services/")
    }
    const UserClick = ()=>{
      navigate("/admin/adminhome/")
      }
  return (
  //     <div className=" relative self-stretch w-[20rem]">
  //     {/* <HeaderUser/> */}
  //  <div className="fixed top-[2rem] bottom-0 ">
  <Card className="   w-full max-w-[20rem] hidden lg:block fixed  h-screen  mt-[12rem] bg-white   p-4  shadow-xl shadow-blue-gray-900/5">

     

  <div className="mb-2 p-4" >
        <Typography variant="h5" color="blue-gray">
      
        </Typography>
      </div>
      <List>
      <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          UsersManagement
        </ListItem>
        <ListItem onClick={MechanicClick}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          MechanicsManagement
        </ListItem>
        <ListItem onClick={ServicClick}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Services
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          E-Commerce
        </ListItem>
       
        
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    {/* </div> */}
    {/* <div style={{marginTop:"1rem"}} className="mt-6">
    <Slidebardrover />
    </div> */}
    
{/*     
    // </div> */}
    </Card>
  );
}