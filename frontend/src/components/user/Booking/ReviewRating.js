import React from "react";
import { Rating, Typography } from "@material-tailwind/react";
 
export default function ReviewRating(props) {
  const [rated, setRated] = React.useState(props.averagerating);
 
  return (
    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
     
      <div >
        <div className="flex">
         
        {props.averagerating}{<Rating value={4}  />}
        </div>
        <div className="flex">
        <Typography color="blue-gray" className="font-medium text-blue-gray-500">
        Based on {props.length} Reviews   
      </Typography>
        </div>
      </div>
     
   
    </div>
  );
}