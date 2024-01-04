import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MechanicProfile from '../../pages/Mechanic/MechanicProfile';


const Mechanicwarper = () => {
  return (
    <div>
      <Routes>
     

        <Route path="profile/" element={<MechanicProfile />} />
      
      
     
      </Routes>
      
    </div>
  );
};

export default Mechanicwarper;
