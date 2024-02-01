import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MechanicProfile from '../../pages/Mechanic/MechanicProfile';
import MechanicRegisterPage from '../../pages/Mechanic/MechanicRegisterPage';
import Mechanicloginpage from '../../pages/Mechanic/Mechanicloginpage';
import MechanicBookingpage from '../../pages/Mechanic/MechanicBookingpage';
import ChatList from '../../pages/Mechanic/Chat/Chatlist';
const Mechanicwarper = () => {
  return (
    <div>
      <Routes>
     
        <Route path="chat/" element={<ChatList />} />
        <Route path="profile/" element={<MechanicProfile />} />
        <Route path="register/" element={<MechanicRegisterPage />} />
        <Route path="login/" element={<Mechanicloginpage />} />
        <Route path="bookinglist/" element={<MechanicBookingpage />} />
      
      
     
      </Routes>
      
    </div>
  );
};

export default Mechanicwarper;
