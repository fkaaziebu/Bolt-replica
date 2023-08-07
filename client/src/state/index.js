import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "",
  userEmail: "",
  token: "",
  errorMessage: {},
  successMessage: {},
  profile: {},
  user: {},
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
    setEmail: (state, action) => {
      state.userEmail = action.payload;
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
    updateUserField: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const {
  setMode,
  setToken,
  setEmail,
  setErrorMessage,
  setSuccessMessage,
  setProfile,
  updateUserField
} = authSlice.actions;
export default authSlice.reducer;
