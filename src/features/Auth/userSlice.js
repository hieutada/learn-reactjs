import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/usersApi";
import StorageKeys from "../../constants/storage-keys";

// createAsyncThunk : giup tao ra async actions

export const register = createAsyncThunk("user/register", async (payload) => {
  // call API to register
  const data = await userApi.register(payload);

  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  // call API to register
  const data = await userApi.login(payload);

  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    setting: {},
  },
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      state.current = {};
    },
  },

  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload; // payload is data.user
    },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload; // payload is data.user
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
