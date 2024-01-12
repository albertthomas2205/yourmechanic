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

export default function MechanicDetailsEdit(props) {
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    id: null,
    place: "",
    pin: "",
    experience: null,
    description: "",
    profile_pic: null, // Use null for file input
    is_verify: false,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const mechanicId = useSelector((state) => state.persistedAuthReducer.authentication_user.id);
  const apiUrl = `http://127.0.0.1:8000/api/mechanic-profile-detail/${mechanicId}/`;

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        console.log(response.data)
        setProfileData(response.data);
      })
      .catch(error => {
        console.error("There was an error!", error);
        setMessage("Error fetching profile data.");
        setMessageType("error");
      });
  }, [apiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profile_pic: file });
  };

  const handleOpen = () => setOpen(!open);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Additional validations...

    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
      formData.append(key, profileData[key]);
    });

    axios.patch(apiUrl, formData)
      .then(response => {
        console.log("Profile updated successfully", response.data);
        setOpen(false);
        props.fetch();
        setMessage("Profile updated successfully.");
        setMessageType("success");
      })
      .catch(error => {
        console.error("Error updating profile", error);
        setMessage("Error updating profile.");
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
              <Input label="Place" type="text" name="place" value={profileData.place} onChange={handleInputChange} />
            </div>
            <div className="mb-4">
              <Input label="Pincode" type="text" name="pin" value={profileData.pin} onChange={handleInputChange} />
            </div>
            <div className="mb-4">
              <Input label="Experience" type="number" name="experience" value={profileData.experience} onChange={handleInputChange} />
            </div>
            <div className="mb-4">
              <Input label="Description" type="text" name="description" value={profileData.description} onChange={handleInputChange} />
            </div>
            <div className="mb-4">
              <Input label="Profile Picture" type="file" name="profile_pic" onChange={handleFileChange} />
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
