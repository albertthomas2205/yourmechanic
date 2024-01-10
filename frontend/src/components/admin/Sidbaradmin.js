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
import { TruckIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
 
export function MenuDefault() {
  const navigate = useNavigate()
  const vehicleClick = ()=>{
    navigate("/admin/vehicles/")
  }
  const brandClick = ()=>{
    navigate("/admin/brands/")
  }
  return (
    <Menu>
      <MenuHandler>
    
      <ListItem >
          <ListItemPrefix >
          <TruckIcon className="h-5 w-5" />

          </ListItemPrefix>
          Vehicles
        </ListItem>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={brandClick}>Brands</MenuItem>
        <MenuItem onClick={vehicleClick}>Vehicle</MenuItem>
      
      </MenuList>
    </Menu>
  );
}
 
export default function Sidebaradmin({ className }) {
  const navigate = useNavigate()
  const MechanicClick = ()=>{
  navigate("/admin/adminhome/")
  }
  const ServicClick = ()=>{
    navigate("/admin/services/")
    }
    const UserClick = ()=>{
      navigate("/admin/users/")
      }
  return (
  //     <div className=" relative self-stretch w-[20rem]">
  //     {/* <HeaderUser/> */}
  //  <div className="fixed top-[2rem] bottom-0 ">
  <Card className="   w-full max-w-[20rem] hidden lg:block fixed  h-screen  mt-[7rem] bg-white   p-4  shadow-xl shadow-blue-gray-900/5">

     

  <div className="mb-2 p-4" >
        <Typography variant="h5" color="blue-gray">
      
        </Typography>
      </div>
      <List>
      <ListItem onClick={UserClick}>
          <ListItemPrefix >
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Users
        </ListItem>
        <ListItem onClick={MechanicClick}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Mechanics
        </ListItem>
        <ListItem onClick={ServicClick}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
           Services
        </ListItem>
      <MenuDefault/>
        
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