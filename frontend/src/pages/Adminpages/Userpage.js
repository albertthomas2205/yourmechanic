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
import Sidebaradmin from '../../components/admin/Sidbaradmin';

const Userpage = () => {
  return (
    <>
    <div>
   <Header/>
 
        <div className='flex'>
          <div >

          </div>
        <Sidebaradmin/>
         
          <div className='flex-grow min-h-screen ml-[20rem] mt-[4rem]'>
          <UsersRows/>
          </div>
      
    
        </div>
       

        </div>
    
   
    </>
  );
};

export default Userpage;
