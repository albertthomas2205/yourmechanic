import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  first_name: null,
  isAuthenticated: false,
  isMechanic: false,
  accessToken:null,
  is_user:false,
  user:{}
};

export const AuthenticationMechanicSlice = createSlice({
  name: 'authentication_mechanic',
  initialState,
  reducers: {
    set_MechanicAuthentication: (state, action) => {
      console.log(action.payload)
      state.first_name = action.payload.first_name;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isMechanic= action.payload.is_mechanic;
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
    clear_MechanicAuthentication: (state) => {
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

export const { set_MechanicAuthentication, clear_MechanicAuthentication } = AuthenticationMechanicSlice.actions;

export const selectUser=(state) => state.persistedAuthReducer.authentication_user.user

export default AuthenticationMechanicSlice.reducer;