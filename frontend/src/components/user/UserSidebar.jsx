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
  import HeaderUser from "./Headeruser";
  import Slidebardrover from "./Sidebardrover";
  import { useNavigate } from "react-router-dom";
   
  export default function UserSidebar({ className }) {
    
   const navigate = useNavigate()
   const ProfileClick = ()=>{
     navigate("/userprofile")
   }

   const VehicleClick = ()=>{
    navigate("/uservehicle")
  }
    return (
    //     <div className=" relative self-stretch w-[20rem]">
    //     {/* <HeaderUser/> */}
    //  <div className="fixed top-[2rem] bottom-0 ">
      
    <div className="h-[calc(100vh-2rem)] bg-white w-full max-w-[20rem] p-4 fixed mt-[3rem] mb-[10rem] shadow-xl hidden lg:block shadow-blue-gray-900/5">

     

        <div className="mb-2 p-4" >
          <Typography variant="h5" color="blue-gray">
        
          </Typography>
        </div>
        <List>
        <ListItem onClick={ProfileClick}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem onClick={VehicleClick}>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
          Vehicles
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Booking
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
     
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          {/* <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem> */}
        </List>
      {/* </div> */}
      {/* <div style={{marginTop:"1rem"}} className="mt-6">
      <Slidebardrover />
      </div> */}
      
{/*     
      // </div> */}
      </div>
    );
  }