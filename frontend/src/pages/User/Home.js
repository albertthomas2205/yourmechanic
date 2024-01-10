import React from 'react'
import HeaderUser from '../../components/user/Headeruser'

import CarouselWithContent from '../../components/user/Carouselhome';
import Homedesign from '../../components/user/Homedesign';

import { useSelector } from 'react-redux';
import FooterWithSocialLinks from '../../components/user/Footer';
const Home = () => {
  const first_name = useSelector((state) => state.persistedAuthReducer.authentication_user.first_name);
  const id = useSelector((state)=>state.persistedAuthReducer.authentication_user.id);
  return (
    <>
    
    <div className=" w-full z-30  pt-4 fixed-top  bg-[#180e32]   ">
        <HeaderUser />
      </div>
    {/* <StickyNavbar/> */}
    {/* <div style={{marginTop:"5rem"}}> */}
    {/* <h1 className='text-white'> Welcome, {first_name?first_name:'Guest'}!</h1>
    <h1 className='text-white'> Welcome, {id?id:'haiii'}!</h1> */}
<div className='pt-4'>
{/* <CarouselWithContent/> */}
<Homedesign/>
</div>
    


    {/* </div> */}
  

    
      {/* Render other content of your Home component */}
      <FooterWithSocialLinks/>

    </>
  )
}

export default Home