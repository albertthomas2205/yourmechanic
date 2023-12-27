import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "user_registration",
  initialState: {
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    password: null,
    otp: null,
    url:null
  
  },
  reducers: {
    setUserRegistration: (state, action) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.phone_number = action.payload.phone_number;
      state.password = action.payload.password;
      state.otp = action.payload.otp;
      state.url = action.payload.url;
    },
  },
});

export const { setUserRegistration } = registrationSlice.actions;

export default registrationSlice.reducer;
