import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  first_name: null,
  isAuthenticated: false,
  isAdmin: false,
  accessToken:null,
  is_user:false,
  user:{}
};

export const AuthenticationSlice = createSlice({
  name: 'authentication_user',
  initialState,
  reducers: {
    set_Authentication: (state, action) => {
      console.log(action.payload)
      state.first_name = action.payload.first_name;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isAdmin = action.payload.is_admin;
      state.id = action.payload.id;
      state.accessToken = action.payload.access_token;
      state.is_user = action.payload.is_user;
      state.user=action.payload.user
      // state.is_user = action.payload.is_user;

      // Store first name in local storage
      // localStorage.setItem('first_name', action.payload.first_name);
      // localStorage.setItem('id', action.payload.id);
      // localStorage.setItem('is_admin',action.payload.isAdmin)
    },
    clear_Authentication: (state) => {
      // Clear the authentication state on logout
      state.first_name = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.id = false;
      state.user = null;

      // Remove first name from local storage on logout
      // localStorage.removeItem('first_name');
      // localStorage.removeItem('id');
    },
  },
});

export const { set_Authentication, clear_Authentication } = AuthenticationSlice.actions;

export const selectUser=(state) => state.persistedAuthReducer.authentication_user.user

export default AuthenticationSlice.reducer;