import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Footer from '../../components/admin/Footer';
import StickyNavbar from '../../components/admin/StickyNavbar';
import Header from '../../components/admin/Header';
import Registration from '../../components/user/Registration';
import ServiceTable from './ServiceTable';
import AddServiceForm from './AddServiceForm';
import DialogWithForm from './Dailogform';
import UsersRows from './Users';
import MechanicsRows from './Mechanics';
import Servicelist from '../../components/admin/Services';

const Admin = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header />

   

        {/* Main Content */}
        <main className="flex-1 overflow-x-auto overflow-y-auto bg-gray-200 p-4">
          {/* Your content goes here */}
          {/* Add routes and components for different sections/pages */}
          {/* <DialogWithForm/>
       
         <AddServiceForm/> */}
         {/* <MechanicsRows/> */}
         <Servicelist/>
        </main>

        {/* Footer */}
       
      </div>
    </div>
  );
};

export default Admin;
