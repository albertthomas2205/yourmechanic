import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { selectUser } from '../../Redux/user/AuthenticationSlice'
import { authentication } from '../axios/AxiosInstance';

export default function MechanicdetailsAdd() {

 const id = useSelector((state)=>state.persistedAuthReducer.authenication_mechanic.id);
//  const first_name = useSelector((state) => state.persistedAuthReducer.authenication_mechanic.first_name)

   

  const mid = 21
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    place: '',
    pin: '',
    experience: '',
    description: '',
    profile_pic: '',
    mechanic_id: id,
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleOpen = () => {
    setOpen(!open);
    setSuccessMessage(null);
    setErrorMessage(null); // Reset error message when opening the dialog
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'profile_pic' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      console.log(data)
      const response = await authentication.post('mechanic-profiles/', data);
      
      console.log(response.data);

      setSuccessMessage('Profile added successfully!');
      setOpen(false);
      setFormData({
        place: '',
        pin: '',
        experience: '',
        description: '',
        profile_pic:null,
      });
    } catch (error) {
      console.error('Error adding profile:', error);

      if (error.response && error.response.data) {
        console.log(error.response.data)
        // Check if error.response and error.response.data are defined
        setErrorMessage(error.response.data.detail || 'An error occurred while adding the profile.');
      } else {
        // Handle other types of errors
        setErrorMessage('An unexpected error occurred while adding the profile.');
      }
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
        <DialogHeader style={{ textAlign: 'center' }}>Add Your Profile</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input label="Place" type="text" name="place" onChange={handleChange} value={formData.place} />
            </div>
            <div className="mb-4">
              <Input label="Pincode" type="text" name="pin" onChange={handleChange} value={formData.pin} />
            </div>
            <div className="mb-4">
              <Input label="Experience" type="text" name="experience" onChange={handleChange} value={formData.experience} />
            </div>
            <div className="mb-4">
              <Input label="Description" type="text" name="description" onChange={handleChange} value={formData.description} />
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
          {errorMessage && (
            <div className="mt-4 text-red-600">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="mt-4 text-green-600">{successMessage}</div>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}
