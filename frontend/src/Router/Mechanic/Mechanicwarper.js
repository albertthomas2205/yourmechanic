import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MechanicProfile from '../../pages/Mechanic/MechanicProfile';
import MechanicRegisterPage from '../../pages/Mechanic/MechanicRegisterPage';
import Mechanicloginpage from '../../pages/Mechanic/Mechanicloginpage';
import MechanicBookingpage from '../../pages/Mechanic/MechanicBookingpage';
import ChatList from '../../pages/Mechanic/Chat/Chatlist';
import MechanicChatpage from '../../pages/Mechanic/MechanicChatpage';

import { ChatProvider } from "../../Context/ChatContext";
const Mechanicwarper = () => {
  return (
    <div>
      <ChatProvider>
      <Routes>
     
        <Route path="chat/" element={<MechanicChatpage/>} />
        <Route path="profile/" element={<MechanicProfile />} />
        <Route path="register/" element={<MechanicRegisterPage />} />
        <Route path="login/" element={<Mechanicloginpage />} />
        <Route path="bookinglist/" element={<MechanicBookingpage />} />
      
      
     
      </Routes>
      </ChatProvider>
    </div>
  );
};

export default Mechanicwarper;
