import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  language: "",
  referralCode: "",
  model: "",
  vehicleYear: "",
  licensePlate: "",
  color: "",
  
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const { setField, resetForm } = registrationSlice.actions;

export default registrationSlice.reducer;
