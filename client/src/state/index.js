import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    updateUserField: (state, action) => {
      state.user = {...state.user, ...action.payload}
    },
  },
});

export const { updateUserField } = registrationSlice.actions;

export default registrationSlice.reducer;
