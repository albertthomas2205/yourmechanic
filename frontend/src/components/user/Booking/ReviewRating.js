import React from "react";
import { Rating, Typography } from "@material-tailwind/react";
 
export default function ReviewRating(props) {
  const [rated, setRated] = React.useState(props.averagerating);
 
  return (
    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
     
      <div >
        <div className="flex">
          
         
        {props.averagerating === 1 && <Rating value={1} />}
      {props.averagerating === 2 && <Rating value={2} />}
      {props.averagerating === 3 && <Rating value={3} />}
      {props.averagerating === 4 && <Rating value={4} />}
      {props.averagerating === 5 && <Rating value={5} />}
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