import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { authentication } from "../axios/AxiosInstance";

export default function Userdetailsedit(props) {
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    id: null,
    username: "",
    phone_number: "",
    place: "",
    pin: "",
    user: null,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const userId = useSelector((state) => state.persistedAuthReducer.authentication_user.id);
 
  useEffect(() => {
    authentication.get(`userprofile/${userId}/`)
      .then(response => {
        setProfileData({
          ...response.data,
        });
      })
      .catch(error => {
        console.error("There was an error!", error);
        setMessage("Error fetching profile data.");
        setMessageType("error");
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const validateForm = () => {
    const { username, phone_number, place, pin } = profileData;

    if (!username || !phone_number || !place || !pin) {
      setMessage("All fields are required.");
      setMessageType("error");
      return false;
    }

    // Validate phone number (10 digits)
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(phone_number)) {
      setMessage("Phone number must be 10 digits.");
      setMessageType("error");
      return false;
    }

    // Validate pin (6 digits)
    const pinRegex = /^\d{6}$/;
    if (!pinRegex.test(pin)) {
      setMessage("Pin must be 6 digits.");
      setMessageType("error");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    Object.keys(profileData).forEach(key => formData.append(key, profileData[key]));

    axios.patch('userprofile' ,formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log("Profile updated successfully", response.data);
      props.fetchUserProfile();
      setOpen(false);
      setMessage("Profile updated successfully.");
      setMessageType("success");
    }).catch(error => {
      console.error("Error updating profile", error);

      // Check if the error response contains a custom error message
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Error updating profile.");
      }

      setMessageType("error");
    });
  };

  return (
    <>
      <Button onClick={handleOpen} variant="text">
        Edit Profile
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader style={{ textAlign: 'center' }} className="flex justify-center">Edit Profile</DialogHeader>
        <DialogBody>
          {message && (
            <div className={`alert alert-${messageType}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input label="Username" type="text" name="username" value={profileData.username} onChange={handleInputChange} />
            </div>
            <div className="mb-4">
              <Input label="Phone Number" type="text" name="phone_number" value={profileData.phone_number} onChange={handleInputChange} />
            </div>
            <div className="mb-4">
              <Input label="Place" type="text" name="place" value={profileData.place} onChange={handleInputChange} />
            </div>
            <div className="mb-4">
              <Input label="Pincode" type="text" name="pin" value={profileData.pin} onChange={handleInputChange} />
            </div>
            <Button variant="gradient" color="green" type="submit">
              <span>Save</span>
            </Button>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
