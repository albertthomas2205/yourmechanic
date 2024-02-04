import React from "react";
import axios from "axios";
import{ useState, useEffect,useContext } from "react";
import { useSelector } from "react-redux";
import { formatDistance } from 'date-fns'



const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";
const baseURL = "http://127.0.0.1:8003";
const Message = (props) => {
  const authentication_user =useSelector((state) => state.persistedAuthReducer.authentication_user);
    const [time,setTime] = useState("")
    const [mechanicDetails, setMechanicDetails] = useState([]);
    const[userDetails,setUserDetails] = useState([])

    const fetchMechanicDetails = async (mechanic_id) => {
      console.log("aaaaaa",mechanic_id)
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/mechanic-profile/${mechanic_id}/`
        );
  
        if (response.status === 200) {
          console.log(response.data);
          setMechanicDetails(response.data);
        } else {
          console.error("Error fetching mechanic details:", response.status);
        }
      } catch (error) {
        console.error("An error occurred while fetching mechanic details:", error);
      }
    };
  
    const fetchUserDetails = async (user_id) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/userprofile/${user_id}/`
        );
  
        if (response.status === 200) {
          console.log(response.data);
          setUserDetails(response.data);
        } else {
          console.error("Error fetching mechanic details:", response.status);
        }
      } catch (error) {
        console.error("An error occurred while fetching mechanic details:", error);
      }
    };
  
    
useEffect(() => {
fetchMechanicDetails(props.mechanic_id)
fetchUserDetails(props.user_id)
getTime()
console.log(props.recieverimage)
}, [props.room]);
 
const getTime = () =>{
    let currentdate = new Date();
    let indian_date = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
    let m_date = props.time.toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'})
 
    var result = formatDistance(
        new Date(props.time), 
        new Date(indian_date),
        { includeSeconds: true }
      )
      setTime(result)
}
  return (

    <>

    { authentication_user.id != props.id?
    <div className="d-flex flex-row justify-content-start" style={{width:"90%", border:"75%"}}>
    <img
      src={mechanicDetails.profile_pic}
      
      alt="avatar 1"
      style={{ width: "45px",borderRadius: "100%" ,height:"45px"  }}
    />
    <div>
      <p
        className="small p-2 ms-3 mb-1 rounded-3"
        style={{ backgroundColor: "#f5f6f7" }}
      >
       {props.content}
      
   
      </p>
      <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
        {time}
      </p>
    </div>
  </div>
:
  <div className="d-flex flex-row justify-content-end pr-3" >
    <div>
      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
      {props.content}
    
      </p>
      <p className="small me-3 mb-3 rounded-3 text-muted">
      {time}
      </p>
    </div>
    <img
      src={userDetails.profile_pic}
      alt="avatar 1"
      style={{ width: "45px",borderRadius: "100%",height:"45px"  }}
    />
  </div> }              </>
  )
};

export default Message;
