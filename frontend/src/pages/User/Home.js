import React from 'react'
import HeaderUser from '../../components/user/Headeruser'

import CarouselWithContent from '../../components/user/Carouselhome';

import { useSelector } from 'react-redux';
import FooterWithSocialLinks from '../../components/user/Footer';
const Home = () => {
  const first_name = useSelector((state) => state.persistedAuthReducer.authentication_user.first_name);
  const id = useSelector((state)=>state.persistedAuthReducer.authentication_user.id);
  return (
    <>
    
    <HeaderUser/>
    {/* <StickyNavbar/> */}
    <div style={{marginTop:"5rem"}}>
    {/* <h1 className='text-white'> Welcome, {first_name?first_name:'Guest'}!</h1>
    <h1 className='text-white'> Welcome, {id?id:'haiii'}!</h1> */}

    
<CarouselWithContent/>

    </div>
  

    
      {/* Render other content of your Home component */}
      <FooterWithSocialLinks/>

    </>
  )
}

export default Home