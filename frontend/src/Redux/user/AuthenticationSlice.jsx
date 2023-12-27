// authenticationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  first_name: null,
  isAuthenticated: false,
  isAdmin: false,
};

export const AuthenticationSlice = createSlice({
  name: 'authentication_user',
  initialState,
  reducers: {
    set_Authentication: (state, action) => {
      state.first_name = action.payload.first_name;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isAdmin = action.payload.isAdmin;

      // Store first name in local storage
      localStorage.setItem('first_name', action.payload.first_name);
    },
    clear_Authentication: (state) => {
      // Clear the authentication state on logout
      state.first_name = null;
      state.isAuthenticated = false;
      state.isAdmin = false;

      // Remove first name from local storage on logout
      localStorage.removeItem('first_name');
    },
  },
});

export const { set_Authentication, clear_Authentication } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
