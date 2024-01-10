import React from 'react'
import { useSelector } from 'react-redux'
// import { selectUser } from '../../Redux/user/AuthenticationSlice'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { selectAdmin } from '../../Redux/Admin/AdminAuthenticationSlice'

const AdminPrivateroute = () => {

    const admin=useSelector(selectAdmin)
  
 

  return (
   admin   ? <Outlet/>:<Navigate to="/"/>
  )
}

export default AdminPrivateroute