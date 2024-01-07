import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/user/AuthenticationSlice';
import { Navigate, Outlet } from 'react-router-dom';

const UserPrivaterouter = () => {
  const [state, setstate] = useState('user');

  const user = useSelector(selectUser);

  return user?.is_user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ name: "user" }} />
  );
};

export default UserPrivaterouter;
