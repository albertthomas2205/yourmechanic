import React, { useState, useEffect, useContext, useRef } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBFile 
} from "mdb-react-ui-kit";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
// import webSocketService from "../../../Context/WebSocketService";
import { ChatSelectContextt } from "../../../Context/ChatSelectContext";
import Message from "./small/Message";
// import PulseCards from "../Home/Main/SkeltonHome";
import ReconnectingWebSocket from 'reconnecting-websocket';





const baseURL = "http://127.0.0.1:8003";
const REACT_APP_CLOUDINARY_CLOUD_NAME = "dvlpq6zex";

export default function ChatPage() {
  // console.log(val,"hhhhhhhhh")
  // const authentication_user = useSelector((state) => state.authentication_user);
  const authentication_user =useSelector((state) => state.persistedAuthReducer.authentication_user);
  //  const authentication_user = {"name":"albert"}
  // const {selectedChat,setSelectedChat}= useContext(ChatSelectContextt);
  const [selectedChat,setSelectedChat]= useState("")
  const [socket, setSocket] = useState(null);
  const [userId,setUserId] = useState("")
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const scrollRef = useRef();
  const [senderimage, setSenderImage] = useState("");
  const [recieverimage, setRecieverImage] = useState("");
  const fileInputRef = useRef(null);
  const handleIconClick = () => {
    if (fileInputRef.current) {
 
      fileInputRef.current.click();
    }
  };

  const [mechanics, setMechanics] = useState([]);
  useEffect(() => {
    // Fetch the user vehicles data from the API
    axios.get('http://127.0.0.1:8000/api/verify-mechaniclist/')
      .then(response => {
        console.log(response)
        setMechanics(response.data);
      })
      .catch(error => {
        console.error('Error fetching user vehicles:', error);
      });
  }, []);
  const handleFileChange = (e) => {
    // Handle the file selection logic here
    const selectedFile = e.target.files[0];
    console.log('Selected File:', selectedFile);
  };
  const getUserId = async ()=>{

        try {
            var data = { "username": authentication_user.first_name };
            const res = await axios.get( 
              baseURL + "/api/chat/getuser/", 
              { params: data } 
            );
        
            if (res.status === 202) {
              setUserId(res.data.id);
           
            }
          } catch (error) {
            console.error("Error fetching comments:", error);
          }
}
const mechanic = mechanics[0]
 
  useEffect(() => {
    console.log(selectedChat);
      GetRoom(); 

  }, []);

  const GetRoom = async () => {

    try {
      console.log("getrooom calledd...")
      // console.log(authentication_user.first_name)
      // console.log(mechanic.first_name)
      const k = authentication_user.id;
      const c = 17;
      
      var data = { user1:k, user2:c};
      console.log(data)
      const res = await axios.get(baseURL + "/api/chat/findrooms/", {
        params: data,
      });
    
      if (res.status === 200) {
        console.log(res.data)
        setRoom(res.data)
        console.log("haiii")
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
    };

  const SocketManagement = () => {
    if (authentication_user.first_name && room) {
      if (socket) {
        socket.close();
        console.log("Previous WebSocket disconnected");
      }
      const newSocket = new ReconnectingWebSocket(
        `ws://localhost:8003/ws/chat/${room.name}/`
      );
      setSocket(newSocket);
      newSocket.onopen = () => console.log("WebSocket connected");
      newSocket.onclose = () => {
        console.log("WebSocket disconnected");
      };   
      return () => {

        newSocket.close();

      };
    }
  };

  useEffect(() => {
    getSocketMessage();
  }, [socket]);

  const getSocketMessage = () => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.user_list) {
          setActiveUsers(data.user_list);
        } else {
          console.log(data);
          setMessages((prevMessages) => [...prevMessages, data]);
          const element = scrollRef.current;
          if (element) {
            element.scrollTop = element.scrollHeight;
          }
        }
      };
    }
  };
  const getRecieverImage = async () => {
    let baseURLL = "http://127.0.0.1:8001";
    try {
      var data = { username: selectedChat };
      const res = await axios.post(
        baseURLL + "/api/home/getprofilephoto/",
        data
      );

      if (res.status === 202) {
        setRecieverImage(res.data);
        console.log("eeeeeeeee", res.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const getSenderImage = async () => {
    let baseURLL = "http://127.0.0.1:8001";
    try {
      var data = { username: authentication_user.first_name };
      const res = await axios.post(
        baseURLL + "/api/home/getprofilephoto/",
        data
      );

      if (res.status === 202) {
        setSenderImage(res.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    SocketManagement(); 
  }, [room]);


  useEffect(() => {
    getSenderImage();
    getRecieverImage();
    getUserId() 
   
  }, [room]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message && socket) {
      const data = {
        message: message,
        username: authentication_user.first_name,
      };
      socket.send(JSON.stringify(data));
      setMessage("");
    } 
  };
  const GetMessages = async () => {
    if(room){
      try {
        const room_id =room.id
        var data = { roomid: room_id };
        const res = await axios.get(baseURL + "/api/chat/messagess/", {
          params: data,
        });
        console.log("heyyy")
        if (res.status <300) {
      
          console.log(res.data)
          setMessages(res.data);
        } else {
          console.error("Error fetching messages:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    
   
  };

  useEffect(() => {
    GetMessages();
  }, [room]);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages,message]);

  return (
    <div style={{ backgroundColor: "pink" }}>
    <MDBContainer fluid >
      <MDBRow >
        <MDBCol md="12" >
          <MDBCard
            id="chat3"
            style={{ borderRadius: "15px", marginTop: "60px",backgroundColor:"black" }}
          >
            <MDBCardBody>
              <text>{selectedChat}</text>
              <MDBRow style={{ height: "700px"}}>
                <div
                  className="container"
                  ref={scrollRef}
                  style={{
                    overflow: "auto",
                    maxHeight: "700px",
                    padding: "1%",
                    position: "absolute",
                    bottom: "3%",
                  }}
                >
                  {/* {!messages && <PulseCards />}
                  {messages && messages.length === 0 && <h1>empty</h1>} */}
                  {Array.isArray(messages)
                    ? messages.map((element) => {
                        return (
                          <Message
                            content={
                              element.content
                                ? element.content
                                : element.message
                            }
                            userId={userId}
                            uname={element.username}
                            time={element.timestamp}
                            seen={element.seen}
                            user={element.user}
                            room={element.room}
                            senderimage={senderimage}
                            recieverimage={recieverimage}
                          />
                        );
                      })
                    : ""}
                </div>
              
                <div
                  className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2"
                  style={{ bottom: 0, position: "absolute" }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                    alt="avatar 3"
                    style={{ width: "40px", height: "100%" }}
                  />
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleFormControlInput2"
                    placeholder="Type message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
               <div>
      <label htmlFor="formFileMultiple" className="ms-1 text-muted" onClick={handleIconClick}>
        <MDBIcon fas icon="paperclip" />
   
      </label>
      <MDBFile
        id="formFileMultiple"
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
    <div><h1>hellooooo   {room.id}</h1></div>
                 
                  <a className="ms-3 text-muted" href="#!">
                    <MDBIcon fas icon="smile" />
                  </a>
                  <a className="ms-3" href="#!">
                    <MDBIcon fas icon="paper-plane" onClick={handleSubmit} />
                  </a>
                </div>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
}
