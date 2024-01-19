import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  first_name: null,
  ismechanicAuthenticated: false,
  isMechanic: false,
  id:null,
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
      state.ismechanicAuthenticated = action.payload.ismechanicAuthenticated;
      state.isMechanic= action.payload.is_mechanic;
      state.id = action.payload.id;
      state.accessToken = action.payload.access_token;
  
      state.is_user = action.payload.is_user;

      // Store first name in local storage
      // localStorage.setItem('first_name', action.payload.first_name);
      // localStorage.setItem('id', action.payload.id);
      // localStorage.setItem('is_admin',action.payload.isAdmin)
    },
    clear_MechanicAuthentication: (state) => {
      // Clear the authentication state on logout
      state.first_name = null;
      state.ismechanicAuthenticated = false;
      state.isMechanic = false;
      state.id = false;
    

      // Remove first name from local storage on logout
      // localStorage.removeItem('first_name');
      // localStorage.removeItem('id');
    },
  },
});

export const { set_MechanicAuthentication, clear_MechanicAuthentication } = AuthenticationMechanicSlice.actions;

export const selectMechanic=(state) => state.persistedAuthReducer.authentication_mechanic.isMechanicAuthenticated

export default AuthenticationMechanicSlice.reducer;