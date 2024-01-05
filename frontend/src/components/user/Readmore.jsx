import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Card,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

 

export default function Readmore(props) {

  const navigate = useNavigate()


  const clickbutton = () => {
    navigate("/mechanics");
  };
  const [openMenu, setOpenMenu] = React.useState(false);
  const menuItems = [
    {
      title: "@material-tailwind/html",
      description:
        "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
    },
    {
      title: "@material-tailwind/react",
      description:
        "Learn how to use @material-tailwind/react, packed with rich components for React.",
    },
    {
      title: "Material Tailwind PRO",
      description:
        "A complete set of UI Elements for building faster websites in less time.",
    },
  ];
   
  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
        >
          View More{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="hidden w-[27rem] gap-3 overflow-visible lg:grid">
       
        <ul className=" flex w-full flex-col p-5 ">
         
           
              <MenuItem>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Service Cost : {props.price}
                </Typography>
                <br />
                <Typography variant="h6" color="blue-gray" className="mb-1">
                Service Completion Time : {props.time} min
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                 
                  
                </Typography>
              </MenuItem>
           <Button onClick={clickbutton}>Book now</Button>
       
        </ul>
      </MenuList>
    </Menu>
  );
}