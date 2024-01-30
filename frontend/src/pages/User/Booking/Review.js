import React, { useState } from "react";
import { Popover, PopoverHandler, PopoverContent, Button, Textarea } from "@material-tailwind/react";
import { Rating } from "@material-tailwind/react";
import axios from 'axios';
import { useSelector } from 'react-redux';
export default function Review(props) {
  const [openPopover, setOpenPopover] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const first_name = useSelector((state) => state.persistedAuthReducer.authentication_user.first_name);
  const handleRatingChange = (value) => {
    setRating(value);
  };
  
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Perform submission logic here
      console.log("Submitted:", { rating, review, booking_id: props.id, });

      // Make a POST request to the API endpoint
      const response = await axios.post('http://127.0.0.1:8002/api/booking/reviews/', {
        rating,
        review,
        mechanic_id:props.mechanic_id,
        service_name :props.service_name,
        user_name:first_name,
        booking_id: props.id,

      });

      // Handle the response if needed
      console.log("API Response:", response.data);

      // Close the popover after submission
      setOpenPopover(false);
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Popover
      open={openPopover}
      handler={setOpenPopover}
      placement="bottom-start"
      className="w-64" // Adjust width as needed
    >
      <PopoverHandler>
        <Button>Feed Back</Button>
      </PopoverHandler>
      <PopoverContent>
        <div className="p-2 w-[25rem]">
          <div className="flex items-center mb-4">
            <label htmlFor="rating" className="block mr-4 text-sm font-medium text-gray-700">
              Rating:
            </label>
            <Rating
              value={rating}
              onChange={handleRatingChange}
              size="large"
              className="h-4rem"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
              Review: {props.mechanic_id} {props.service_name}
            </label>
            <Textarea
              id="review"
              value={review}
              onChange={handleReviewChange}
              placeholder="Type your review here..."
              className="border rounded-md w-full"
            />
          </div>

          <Button onClick={handleSubmit} color="blue" className="mt-4">
            Submit
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
