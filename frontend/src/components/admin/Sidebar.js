import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Button
  } from "@material-tailwind/react";
  
  import logoImage from '../../images/20231114_135440.png'
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";

  
  export default function Sidebar() {
    return (
        <>
  
      <div className="w-6/12 sm:w-3/12 md:w-3/12 z-20 bg-white p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
        <Typography  color="black" >
          {/* <img src={logoImage} alt="Logo" className="h-20 w-auto mb-2" /> */}
          ADMIN PANEL
          </Typography>
         
        </div>
        <div className="mb-2 ">
          <Typography  color="blue-gray">
          <Button variant="text" className="flex items-center  space-x-2">
          <UserCircleIcon className="h-5 w-5" />
          <span>  Users</span>

          </Button>
       
          </Typography>
        </div>
 
        <div className="mb-2 ">
          <Typography  color="blue-gray">
          <Button variant="text" className="flex items-center  space-x-2">
          <UserCircleIcon className="h-5 w-5" />
          <span>  Mechanic</span>

          </Button>
       
          </Typography>
        </div>
        <div className="mb-2 ">
          <Typography  color="blue-gray">
          <Button variant="text" className="flex items-center  space-x-2">
          <Cog6ToothIcon className="h-5 w-5" />
          <span>  Service</span>

          </Button>
       
          </Typography>
        </div>
        <div className="mb-2 ">
          <Typography  color="blue-gray">
          <Button variant="text" className="flex items-center  space-x-2">
          <PowerIcon className="h-5 w-5" />
          <span>  logOut</span>

          </Button>
       
          </Typography>
        </div>
        <List className="mb-2 p-2">
          <ListItem className="whitespace-normal">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem className="whitespace-normal">
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5 overflow-hidden" />
            </ListItemPrefix>
            E-Commerce
          </ListItem>
          <ListItem className="whitespace-normal">
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem className="whitespace-normal">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem className="whitespace-normal">
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem className="whitespace-normal">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </div>
      </>
    );
  }
  