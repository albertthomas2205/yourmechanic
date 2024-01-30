// MechanicProfile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import { Rating } from "@material-tailwind/react";  // Import the correct Rating component
import { useLocation } from "react-router-dom";
import UserReviews from './Booking/UserReviews';
import ReviewRating from './Booking/ReviewRating';

export default function MechanicProfile() {
  const location = useLocation();
  const { state } = location;
  const id = state?.mechanicId || null;
  const name = state?.name || null;
  const [profileData, setProfileData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [lengthreviews,setLengthReviews] = useState();
  const [averageRating, setAverageRating] = useState();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/mechanic-profile/${id}/`)
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    axios.get(`http://127.0.0.1:8002/api/booking/reviews/${id}/`)
      .then(response => {
        setLengthReviews(response.data.length)
        
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });

    axios.get(`http://127.0.0.1:8002/api/booking/averagerating/${id}/`)
      .then(response => {
        console.log(typeof response.data.average_rating);
        setAverageRating(response.data.average_rating);
      })
      .catch(error => {
        console.error('Error fetching average rating:', error);
      });
  }, [id]);

  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: 'cyan', height: '250px' }}>
                <div className="ms-4 mt-3 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage
                    src={profileData.profile_pic}
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{
                      width: '150px',
                      height: '150px',
                      zIndex: '1',
                      objectFit: 'cover' // Ensures the image covers the area and maintains aspect ratio
                    }}
                  />
                  <div className=''>
                  </div>
                </div>
                <div className=" flex mt-3" style={{ padding: '50px', marginLeft: "100px", color: 'black' }}>
                  <div>
                    <MDBTypography tag="h5">{name}</MDBTypography>
                    <div>
                      {/* <Rating value={averageRating ? averageRating : 0} /> */}
                      {
                        lengthreviews ?   <ReviewRating averagerating  = {averageRating} length ={lengthreviews}/>:""
                      }
                 
                     
                    </div>
                    <MDBCardText>{profileData.place} </MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black pl-4">
                {
                  lengthreviews?   <div className="mb-5">
                  <p className="lead fw-normal mb-1">Recent Reviews</p>
                  <UserReviews reviews={reviews} />
                </div>:    <p className="lead fw-normal mb-1">No Reviews for the mechanic</p>
                }
             
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
