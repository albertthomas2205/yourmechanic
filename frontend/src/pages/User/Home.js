import React from 'react'
import HeaderUser from '../../components/user/Headeruser'


import { useSelector } from 'react-redux';
const Home = () => {
  const first_name = useSelector((state) => state.authentication_user.first_name);
  return (
    <>
    
    <HeaderUser/>
    <div style={{marginTop:"10rem"}}>
    <h1 className='text-white'> Welcome, {first_name?first_name:'Guest'}!</h1>

    </div>
  

    
      {/* Render other content of your Home component */}

    </>
  )
}

export default Home