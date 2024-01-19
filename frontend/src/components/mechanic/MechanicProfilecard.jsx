import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { Input } from '@material-tailwind/react';

import MechanicdetailsAdd from './MechanicdetailsAdd';
import MechanicDetailsEdit from './MechanicProfileEdit';

import { useSelector } from 'react-redux';

export default function MechanicProfilecard() {
  const [profileData, setProfileData] = useState([]);
  const [isEditingProfilePic, setIsEditingProfilePic] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for the file input
  // const id = useSelector((state) => state.persistedAuthReducer.authentication_user.id);
  const id = useSelector((state)=>state.persistedAuthReducer.authenication_mechanic.id)

  const first_name = useSelector((state) => state.persistedAuthReducer.authenication_mechanic.first_name);

  const fetchProfileData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/mechanic-profile/${id}/`)
      .then((response) => {
        console.log(response.data);
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
  fetchProfileData()

  }, [id]);

  const defaultImageUrl =
    'https://i.pinimg.com/564x/20/c0/0f/20c00f0f135c950096a54b7b465e45cc.jpg';
  const profileImageUrl = profileData ? profileData.profile_pic : defaultImageUrl;
  const displayName = first_name;

  const handleImageClick = () => {
    // Trigger the click event on the file input
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    // Handle the file input change event here
    console.log('Selected file:', event.target.files[0]);
  };

  return (
    <div className="gradient-custom-2 mt-[5rem] flex-grow min-h-screen">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-center items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: '#000', height: '200px' }}
                
              >
                <div
                  className="ms-4 mt-5 d-flex flex-col"
                  style={{ width: '150px', height: '150px' }}
                >
                  <MDBCardImage
                  onClick={handleImageClick}
                    src={profileImageUrl}
                    alt="Profile Picture"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{
                      width: '150px',
                      height: '150px',
                      zIndex: '1',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="profile_picture"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                  />
                  <MDBCard>
                    {profileData && profileData.place ? (
                      <MechanicDetailsEdit fetch = {fetchProfileData} />
                    ) : (
                      <MechanicdetailsAdd  fetch = {fetchProfileData}  />
                    )}
                  </MDBCard>
                </div>

                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{displayName}</MDBTypography>
                  <MDBCardText> {profileData ? profileData.place : ''}</MDBCardText>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">Bookings</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">3</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div
                    className="p-4"
                    style={{ backgroundColor: '#f8f9fa' }}
                  >
                    <MDBCardText className="font-italic mb-1">
                      {profileData ? profileData.experience : ''} Years of Experience
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-1">
                      Lives in {profileData ? profileData.place : ''}
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-0">Mechanic</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent Booking</MDBCardText>
                  <MDBCardText className="mb-0">
                    <a href="#!" className="text-muted">
                      Show all
                    </a>
                  </MDBCardText>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
