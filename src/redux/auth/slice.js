import { createSlice } from "@reduxjs/toolkit";
import { logIn, register, logOut, refreshUser, updateUser } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    accessToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    loading: false,
    error: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state) => {
        state.user = {};
        state.accessToken = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        console.log(
          "Payload:",
          action.payload,
          "accessToken",
          action.payload.accessToken
        );
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, (state) => {
        state.user = {};
        state.accessToken = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
        };
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        // state.isLoggedIn = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        console.log("action.payload", action.payload);
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log(state.user);
        state.isLoggedIn = true;
        state.isRefreshing = false;
      }),
});

export default authSlice.reducer;
