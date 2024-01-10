import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import  {Login} from "./Login";
import { clear_Authentication } from "../../Redux/user/AuthenticationSlice";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

// export function MenuDefault() {
//   const navigate = useNavigate();
//   const [state, setstate] = useState("Mechanic");

//   const handleUserClick = () => {
    
//    setstate("user")

//     navigate('/signin', { state: { name: "user" } });
//   };
//   const handleMechanicClick = () => {
    
//     setstate("Mechanic")
 
//      navigate('/signin', { state: { name: "Mechanic" } });
//    };

//    const handleAdminClick = () => {
    
//     setstate("Mechanic")
 
//      navigate('/signin', { state: { name: "Admin" } });
//    };
 

//   return (
//     <Menu>
//       <MenuHandler>
//         <Button variant="gradient" size="sm"   > Log In</Button>
//       </MenuHandler>
//       <MenuList>
//         <MenuItem onClick={handleUserClick}>User</MenuItem>
//         <MenuItem onClick={handleMechanicClick}>Mechanic</MenuItem>
//         <MenuItem onClick={handleAdminClick}>Admin</MenuItem>
//       </MenuList>
//     </Menu>
//   );
// }

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderItems = navListMenuItems.map(({ icon, title, description }, key) => (
    <a href="#" key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg">
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
          {React.createElement(icon, {
            strokeWidth: 2,
            className: "h-6 text-gray-900 w-6",
          })}
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm font-bold"
          >
            {title}
          </Typography>
          <Typography
            variant="paragraph"
            className="text-xs !font-medium text-blue-gray-500"
          >
            {description}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ));

  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  );
}

function NavList() {
  const navigate =useNavigate()
  return (
    <List className="mt-4 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4" onClick={()=>(navigate("/userprofile/"))}>Profile</ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}

function HeaderUser() {
  const [openNav, setOpenNav] = useState(false);
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);
  const [openRight, setOpenRight] = React.useState(false);
  const [state, setstate] = useState("");
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.persistedAuthReducer.authentication_user.isAuthenticated);


  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);
 
  const handleLoginClick = () => {
    navigate("/signin")
  };
  const handleLogoutClick=() =>{
    dispatch(
      clear_Authentication()
      )

  }
  const handleRegisterClick = () => {
    setstate("r")
    setOpenRight(true);
    
  };
  const handleMechanicregister = () => {
   navigate("/mechanic/register")
  }
  const handleCloseLoginDrawer = () => {
    setOpenLoginDrawer(false);
  };


  const navigate = useNavigate()

  return (
    <>
    <Navbar className="   bg-white m-0 py-2.5 px-3 mx-auto ">
      <div className="flex  w-full items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          onClick={()=>(navigate("/"))}
        >
          Your Mechanic
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>

        <div className="hidden gap-2 lg:flex">
      
          </div>
       
        <div className="hidden gap-2 lg:flex">{
          isAuthenticated ? <Button variant="text" size="sm" color="blue-gray"     onClick={handleLogoutClick}>
          Log Out
        </Button>:""
        }
         
         <Button onClick={handleMechanicregister}>Become Mechanic</Button>
         <Button onClick={handleLoginClick}>login</Button>
                  
        

{/*           
          <MenuDefault /> */}
         
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
        <div className="hidden gap-2 lg:flex">
      
  
      </div>
   
          <Button variant="outlined" size="sm" color="blue-gray"   onClick={handleLoginClick}>
            Log In
          </Button>
          {/* <MenuDefault /> */}
        
        </div>
      </Collapse>
    </Navbar>
    {openRight && <Login openRight={openRight} setOpenRight={setOpenRight} state={state} setstate={setstate}  />}
  </>
  );
}

export default HeaderUser;
