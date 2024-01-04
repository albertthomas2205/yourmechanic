import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Redux/user/AuthenticationSlice'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const AdminPrivateroute = () => {

    const user=useSelector(selectUser)
  
    console.log(user)

  return (
   user.isAdmin   ? <Outlet/>:<Navigate to="/"/>
  )
}

export default AdminPrivateroute