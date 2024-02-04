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
  import { useDispatch,useSelector } from "react-redux";
  // import { clear_Authentication } from "../../Redux/user/AuthenticationSlice";
  import { clear_MechanicAuthentication } from "../../Redux/Mechanic/MechanicAuthentication";
import { useNavigate } from "react-router-dom";
 
   
  export default function MechaniSidebar({ className }) {
    const navigate = useNavigate()


    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.persistedAuthReducer.authenication_mechanic.ismechanicAuthenticated);
    const handleLogoutClick=() =>{
      dispatch(
        clear_MechanicAuthentication()
        )
        navigate('/')
  
    }
    const bookingClick=() =>{
   
        navigate('/mechanic/bookinglist/')
    }
    // }
    // const profileClick=() =>{
    //   dispatch(
    //     clear_MechanicAuthentication()
    //     )
    //     navigate('/mechanic/profile/')
  
    // }
 
    return (
    //     <div className=" relative self-stretch w-[20rem]">
    //     {/* <HeaderUser/> */}
    //  <div className="fixed top-[2rem] bottom-0 ">
      
    <div className="h-[calc(100vh-2rem)] bg-blue-gray-50 hidden lg:block fixed w-full max-w-[20rem] p-4  shadow-xl mt-[4rem]  shadow-blue-gray-900/5">

     

        <div className="mb-2 p-4" >
          <Typography variant="h5" color="blue-gray">
        
          </Typography>
        </div>
        <List>

        <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profileeeeeee
          </ListItem>
          <ListItem onClick={bookingClick} >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Booking
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            E-Commerce
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
          <ListItem onClick={handleLogoutClick}>
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
      </div>
    );
  }