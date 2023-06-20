import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "",
  token: "",
  errorMessage: {},
  successMessage: {},
  profile: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = { ...action.payload };
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = { ...action.payload };
    },
    setProfile: (state, action) => {
      state.profile = { ...action.payload };
    },
  },
});

export const {
  setMode,
  setToken,
  setErrorMessage,
  setSuccessMessage,
  setProfile,
} = authSlice.actions;
export default authSlice.reducer;
