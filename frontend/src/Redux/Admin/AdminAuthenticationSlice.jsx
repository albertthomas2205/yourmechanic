import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 
  isAdminAuthenticated: false,
  isAdmin: false,
//   user:{}
};

export const AuthenticationAdminSlice = createSlice({
    name: 'authentication_admin',
    initialState,
    reducers: {
      set_AdminAuthentication: (state, action) => {
        console.log(action.payload);
       
        state.isAdmin = action.payload.isAdmin;
        state.isAdminAuthenticated = action.payload.isAdminAuthenticated;
        // state.user = action.payload.user;
      },
      clear_AdminAuthentication: (state) => {
        // Clear the authentication state on logout
        state.first_name = null;
        state.isAdminAuthenticated = false;
      
        // state.user = null;
      },
    },
  });
  

export const { set_AdminAuthentication, clear_AdminAuthentication } = AuthenticationAdminSlice.actions;

export const selectAdmin=(state) => state.persistedAuthReducer.authentication_admin.isAdminAuthenticated

export default AuthenticationAdminSlice.reducer;