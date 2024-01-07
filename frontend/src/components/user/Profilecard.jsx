import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography
} from 'mdb-react-ui-kit';
import Userdetailadd from './Userdetailadd';
import Userdetailsedit from './Userdetailsedit';

import { useSelector } from 'react-redux';

export default function Profilecard() {
  const [profileData, setProfileData] = useState(null);
  const id = useSelector((state)=>state.persistedAuthReducer.authentication_user.id);
 
  const first_name = useSelector((state) => state.persistedAuthReducer.authentication_user.first_name);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/userprofile/${id}/`)
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const defaultImageUrl = "https://i.pinimg.com/564x/20/c0/0f/20c00f0f135c950096a54b7b465e45cc.jpg";
  const profileImageUrl = profileData ? profileData.profile_pic : defaultImageUrl;
  const displayName = profileData ? profileData.username : first_name;

  return (
    <div className="gradient-custom-2 mt-[4rem] flex-grow min-h-screen" >
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-center items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row bg-cyan-900"  style={{ backgroundColor: '', height: '200px' }}>
              <div className="ms-4 mt-5 d-flex flex-col" style={{ width: '150px', height: '150px' }}>
  <MDBCardImage 
    src={profileImageUrl} 
    alt="Profile Picture" 
    className="mt-4 mb-2 img-thumbnail" 
    fluid 
    style={{ 
      width: '150px', 
      height: '150px', 
      zIndex: '1', 
      objectFit: 'cover' // Ensures the image covers the area and maintains aspect ratio
    }} 
  />
  <MDBCard>
    {profileData && profileData.username ? <Userdetailsedit /> : <Userdetailadd />}
  </MDBCard>
</div>

                {/* Dummy Data Section */}
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{displayName}</MDBTypography>
                  <MDBCardText>{profileData?profileData.place:""}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">23</MDBCardText>
                    <MDBCardText className="small text-muted mb-0"> Toal Booking</MDBCardText>
                  </div>
                  {/* <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div> */}
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                    <MDBCardText className="font-italic mb-1">Lives in {profileData?profileData.place:""}</MDBCardText>
                    <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent Booking</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
            
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
