import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from '@material-tailwind/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { authentication } from '../axios/AxiosInstance';

export default function Userdetailadd(props) {
  const id = useSelector((state)=>state.persistedAuthReducer.authentication_user.id);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phone_number: '',
    place: '',
    pin: '',
    profile_pic: null,
    user:id,
  });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'profile_pic' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    try {
      const response = await authentication.post('profiles/', data);
      console.log(response.data);
      // Close dialog and reset form after successful submission
      props.fetchUserProfile()
      setOpen(false);
      setFormData({
        username: '',
        phone_number: '',
        place: '',
        pin: '',
        profile_pic: null,
      });
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="text">
        Add Profile
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        style={{ backdropFilter: 'blur(5px)' }}
      >
        <DialogHeader style={{ textAlign: 'center' }}>Add Profile</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input label="Username" type="text" name="username" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <Input label="Phone Number" type="text" name="phone_number" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <Input label="Place" type="text" name="place" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <Input label="Pincode" type="text" name="pin" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="profile_pic" className="block text-gray-700 text-sm font-bold mb-2">
                Profile Picture
              </label>
              <Input type="file" name="profile_pic" id="profile_pic" onChange={handleChange} />
            </div>
            <DialogFooter>
              <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                Cancel
              </Button>
              <Button type="submit" variant="gradient" color="green">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
