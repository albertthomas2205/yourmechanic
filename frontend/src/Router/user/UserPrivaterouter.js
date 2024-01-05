import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Redux/user/AuthenticationSlice'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const UserPrivaterouter = () => {

    const user=useSelector(selectUser)
    
  

  return (
   user?.is_user ? <Outlet/>:<Navigate to="/"/>
  )
}

export default UserPrivaterouter