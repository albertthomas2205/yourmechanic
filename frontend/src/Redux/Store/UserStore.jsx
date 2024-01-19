import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authenticationReducer, { set_Authentication, clear_Authentication } from '../user/AuthenticationSlice';
import authenicationadminReducer,{set_AdminAuthentication, clear_AdminAuthentication} from '../Admin/AdminAuthenticationSlice'
import authenticationmechanicReducer,{set_MechanicAuthentication,clear_MechanicAuthentication} from '../Mechanic/MechanicAuthentication'
import registrationReducer from '../user/RegistrationSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore}  from 'redux-persist'


const persistconfig ={
  key:"root",
  storage

}

const rootReducer = combineReducers({
  authentication_user: authenticationReducer,
  authentication_admin: authenicationadminReducer,
  authenication_mechanic:  authenticationmechanicReducer,
})

const persistedAuthReducer = persistReducer(persistconfig,rootReducer)
// // Check for stored authentication data
// const storedAuthData = JSON.parse(localStorage.getItem('authData')) || {};

const store = configureStore({
  reducer: {
    user_registration: registrationReducer,
    // authentication_user: authenticationReducer,
    persistedAuthReducer:persistedAuthReducer
  },
  // preloadedState: {
  //   authentication_user: storedAuthData,
  // },
});

// Subscribe to store changes and update localStorage
store.subscribe(() => {
  const state = store.getState().authentication_user;
  localStorage.setItem('authData', JSON.stringify(state));
});

export const dispatchSetAuthentication = (payload) => store.dispatch(set_Authentication(payload));
export const dispatchClearAuthentication = () => store.dispatch(clear_Authentication);
export const persistor = persistStore(store)
export default store;
