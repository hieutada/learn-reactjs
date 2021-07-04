import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/usersApi";

// createAsyncThunk: giup tao ra async actions
export const register = createAsyncThunk("user/register", async (payload) => {
  // call API to register
  const data = await userApi.register(payload);

  // save data to local storage
  localStorage.setItem("access_token", data.jwt);
  localStorage.setItem("user", JSON.stringify(data.user));

  // return user data
  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
    setting: {},
  },
  reducers: {},

  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload; // payload is data.user
    },
  },
});

const { reducer } = userSlice;
export default reducer;
