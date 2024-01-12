import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Time from "./Time";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import axios from 'axios';

export default function CheckAvailability() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [statusColor, setStatusColor] = useState(null);

  const morningSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
  ];
  const afternoonSlots = [
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
  ];

  const handleOpen = () => setOpen(!open);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selectedTime when the date changes
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const CustomInput = ({ value, onClick }) => (
    <div className="w-72" onClick={onClick}>
      <Input label="Select date" value={value} readOnly />
    </div>
  );

  const handleConfirm = () => {
    // Perform any additional actions when confirming, if needed
    handleOpen();
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <div style={{ backgroundColor: statusColor }}>
        <Dialog open={open} handler={handleOpen}>
          <div className="flex justify-center">
            <DialogHeader>Check Availability</DialogHeader>
          </div>
          <DialogBody>
            <div className="flex m-4">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
                className="border border-gray-300 p-2 w-full mb-4"
                customInput={<CustomInput />}
              />
            </div>
            {selectedDate && (
              <>
                <div className="flex flex-wrap m-4 gap-2">
                  {morningSlots.map((slot, index) => (
                    <Time
                      key={index}
                      time={slot}
                      date={selectedDate}
                      selectedTime={selectedTime}
                      onTimeChange={handleTimeChange}
                      handleTimeChange={handleTimeChange}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap m-4 gap-2">
                  {afternoonSlots.map((slot, index) => (
                    <Time
                      key={index}
                      time={slot}
                      date={selectedDate}
                      selectedTime={selectedTime}
                      onTimeChange={handleTimeChange}

                    />
                  ))}
                </div>
              </>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleConfirm}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
}
