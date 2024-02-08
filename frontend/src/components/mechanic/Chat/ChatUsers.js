import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ChatuserList from "./small/ChatUserlist";
import { MDBContainer, MDBInputGroup, MDBIcon, MDBTypography } from "mdb-react-ui-kit";

const baseURL = "http://127.0.0.1:8003";

const ChatUsers = () => {
  const [selectedChat, setSelectedChat] = useState("");
  const authentication_user = useSelector(
    (state) => state.persistedAuthReducer.authentication_mechanic
  );
  const mechanic_id = useSelector((state)=>state.persistedAuthReducer.authenication_mechanic.id)
  const [chatRooms, setChatrooms] = useState([]);
  const [mechanicDetails, setMechanicDetails] = useState([]);
  const location = useLocation();
  const [newChat, setNewChat] = useState("");
  const datas = location.state;

  const fetchMechanicDetails = async (mechanicId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/userprofile/${mechanicId}/`
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

  const ChatroomList = async () => {
    try {

      const data = {mechanic_id:mechanic_id};
      console.log("haiiii",data)
      const res = await axios.post(baseURL + "/api/chat/chatroommechanic/", data);

      if (res.status === 200) {
        console.log(res.data);
        setChatrooms(res.data);

        // Assuming that res.data is an array of chat rooms
        for (const room of res.data) {
          console.log("jeeee");
          console.log(room.mechanic); // Assuming mechanic ID is available in room.mechanic

          // Fetch mechanic details
          await fetchMechanicDetails(room.user);
        }
      } else {
        console.log("Error on postlist");
      }
    } catch (error) {
      console.error("An error occurred while fetching chat rooms:", error);
    }
  };

  useEffect(() => {
    ChatroomList();
  }, []);

  return (
    <div >
      <MDBContainer md="6" lg="5" xl="4" className="mb-4 mb-md-0 border-right">
        <div className="p-3">
          
          <MDBTypography listUnStyled className="mt-[45px]">
    
            {chatRooms &&
              chatRooms.map((room) => (
                <ChatuserList
                  key={room.id}
                  mechanic_id = {room.user}
                  roomid = {room.id}
                  // img = {mechanicDetails.profile_pic}
                  // name={mechanicDetails.mechanic_name} 
                  online={room.is_online}
                />
              ))}
          </MDBTypography>
        </div>
      </MDBContainer>
    </div>
  );
};

export default ChatUsers;
