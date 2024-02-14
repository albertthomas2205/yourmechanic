import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Adminhome from '../../pages/Adminpages/Adminhome';
import Admin from '../../pages/Adminpages/Admin';
import Userpage from '../../pages/Adminpages/Userpage';
import Mechanicpage from '../../pages/Adminpages/Mechanicpage';
import Servicepage from '../../pages/Adminpages/Servicepage';
import AdminPrivateroute from './AdminPrivateroute';
import Brandpage from '../../pages/Adminpages/Brandpage';
import VehiclesPage from '../../pages/Adminpages/VechilesPage';

const Adminwarper = () => {
  return (
    <div>
      <Routes>
{/*       
      <Route element={<AdminPrivateroute />} > */}

        <Route path="users/*" element={<Userpage />} />
        <Route path="mechanics/*" element={<Mechanicpage />} />
        <Route path="services/*" element={<Servicepage />} />
        <Route path="adminhome/*" element={<Adminhome />} />
        <Route path="brands/*" element={<Brandpage />} />
        <Route path="vehicles/*" element={<VehiclesPage />} />
        <Route
          path="/*"
          element={
           
              <Adminhome />
          
          }
        />
        {/* </Route> */}
      </Routes>
      
    </div>
  );
};

export default Adminwarper;
