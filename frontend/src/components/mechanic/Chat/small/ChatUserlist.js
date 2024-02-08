import React, { useState, useEffect } from "react";
import axios from "axios";
import {useChatContext} from "../../../../Context/ChatContext";

const baseURL = "http://127.0.0.1:8003";

const ChatuserList = (props) => {
  const [mechanicDetails, setMechanicDetails] = useState({});
  const [lastMessage, setLastMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState("");
  const { setUserIdToContext} = useChatContext();

  const fetchMechanicDetails = async (mechanic_id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/userprofile/${mechanic_id}/`
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

  useEffect(() => {
    fetchMechanicDetails(props.mechanic_id);
  }, [props.mechanic_id]);

  const getLastMessage = async () => {
    try {
      const room_id =props.roomid
      const data = { roomid: room_id };
      const res = await axios.get(baseURL + "/api/chat/lastmessage/", {
        params: data,
      });

      if (res.status === 200) {
        console.log(res.data)
        // setLastMessage(res.data);
      } else {
        console.error("Error fetching messages:", res.status);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    getLastMessage();
  }, []);

  const handleChat = () => {
    console.log("idddddd",props.mechanic_id)
    setUserIdToContext(props.mechanic_id)
    setSelectedChat(props.mechanic_id)
    setTimeout(() => {
      setSelectedChat(null);
    }, 3000);
    
  };

  return (
    <li
      className="p-2 m-2 mt-3 border-bottom"
      onClick={handleChat}
      style={
        selectedChat === props.mechanic_id
          ? {
              backgroundColor: "grey",
              color: "white",
              fontWeight: "bold",
              borderRadius: "15px",
            }
          : { borderRadius: "15px", backgroundColor: "black" }
      }
    >
      <a href="#!" className="d-flex justify-content-between">
        <div className="d-flex flex-row">
          <div>
            <img
              style={{ width: "45px",borderRadius: "100%",height:"45px"  }}
              src={mechanicDetails.profile_pic}
              alt="avatar"
              className="d-flex align-self-center me-3"
              width="60"
            />
            <span className="badge bg-success badge-dot"></span>
          </div>
          <div className="pt-1">
            <p className="fW-bold mb-0">{mechanicDetails.username}</p>
            <p className="small " style={{ color: "white" }}>
              {lastMessage}
            </p>
          </div>
        </div>
        <div className="pt-1">
          <p className="small mb-1" style={{ color: "white" }}>
           
            Just now
          </p>
          <span className="badge bg-danger rounded-pill float-end">3</span>
        </div>
      </a>
    </li>
  );
};

export default ChatuserList;
