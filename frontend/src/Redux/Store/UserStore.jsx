import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer, { set_Authentication, clear_Authentication } from '../user/AuthenticationSlice';
import registrationReducer from '../user/RegistrationSlice'

// Check for stored authentication data
const storedAuthData = JSON.parse(localStorage.getItem('authData')) || {};

const store = configureStore({
  reducer: {
    user_registration: registrationReducer,
    authentication_user: authenticationReducer,
  },
  preloadedState: {
    authentication_user: storedAuthData,
  },
});

// Subscribe to store changes and update localStorage
store.subscribe(() => {
  const state = store.getState().authentication_user;
  localStorage.setItem('authData', JSON.stringify(state));
});

export const dispatchSetAuthentication = (payload) => store.dispatch(set_Authentication(payload));
export const dispatchClearAuthentication = () => store.dispatch(clear_Authentication);

export default store;
