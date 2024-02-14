import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Mechanicverify from "./Mechanicverify";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { admininstance } from "../axios/AxiosInstance";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

export default function Mechanicdetails() {
  const [mechanics, setMechanics] = useState([]);
  const onverify = ()=> {
    console.log("haiii")
   }

  useEffect(() => {
    // Fetch data from API when component mounts
    const fetchData = async () => {
      try {
        const response = await admininstance.get("mechanics/");
        const data = response.data;
        setMechanics(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 
//  const [mechanicprofile, setMechanicProfile] = useState([]);
   
//   useEffect(() => {
//     // Fetch the user vehicles data from the API
//     axios.get(`http://127.0.0.1:8000/api/mechanic-profiles/`)
//       .then(response => {
//         console.log(response.data)
//         setMechanicProfile(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user vehicles:', error);
//       });
//   }, []);


  return (
    <div className="h-full w-full bg-white">
      <div className="p-[4rem]" ><h5>Mechanic Verification Page</h5></div>
      <CardBody className="overflow-scroll p-[4rem]">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  Member <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                </Typography>
              </th>
              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  Phone Number <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                </Typography>
              </th>
              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  Status <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                </Typography>
              </th>
              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  Viewdetails <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                </Typography>
              </th>
              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  {/* Empty for the last column */}
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {mechanics.map(({ id, first_name, last_name, email, phone_number,is_verify,is_active }, index) => {
              const isLast = index === mechanics.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id} className="boader-2">
                  <td className={classes}>
                    <div className="flex items-center max-w-[160px] gap-3">
                      <Avatar src={`https://placekitten.com/100/100`} alt={`${first_name} ${last_name}`} size="sm" />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {`${first_name} ${last_name}`}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {email}
                        </Typography>
                      
                      </div>
                    </div>
                  </td>
                  {/* ... other columns ... */}
                  <td className={classes}>
                    {phone_number}
                  </td>
                  <td className={classes}>
                  <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={is_verify ? "verify" : "not verify"}
                          color={is_verify ? "green" : "red"}
                        />
                      </div>
                  </td>
                  <td className={classes}>
                    <div onClick={onverify()}>
                    <Mechanicverify id ={id}/>
                    </div>
                    {/* ... other columns ... */}
                  </td>
             
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter> */}
    </div>
  );
}
