import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MechanicProfile from '../../pages/Mechanic/MechanicProfile';
import MechanicRegisterPage from '../../pages/Mechanic/MechanicRegisterPage';
import Mechanicloginpage from '../../pages/Mechanic/Mechanicloginpage';

const Mechanicwarper = () => {
  return (
    <div>
      <Routes>
     

        <Route path="profile/" element={<MechanicProfile />} />
        <Route path="register/" element={<MechanicRegisterPage />} />
        <Route path="login/" element={<Mechanicloginpage />} />
      
      
     
      </Routes>
      
    </div>
  );
};

export default Mechanicwarper;
