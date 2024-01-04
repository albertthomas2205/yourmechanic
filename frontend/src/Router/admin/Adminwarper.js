import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Adminhome from '../../pages/Adminpages/Adminhome';
import Admin from '../../pages/Adminpages/Admin';
import Userpage from '../../pages/Adminpages/Userpage';
import Mechanicpage from '../../pages/Adminpages/Mechanicpage';
import Servicepage from '../../pages/Adminpages/Servicepage';
import AdminPrivateroute from './AdminPrivateroute';


const Adminwarper = () => {
  return (
    <div>
      <Routes>
      <Route element={<AdminPrivateroute />} >

        <Route path="users/*" element={<Userpage />} />
        <Route path="mechanics/*" element={<Mechanicpage />} />
        <Route path="services/*" element={<Servicepage />} />
        <Route path="adminhome/*" element={<Adminhome />} />
        <Route
          path="/*"
          element={
           
              <Admin />
          
          }
        />
        </Route>
      </Routes>
      
    </div>
  );
};

export default Adminwarper;
