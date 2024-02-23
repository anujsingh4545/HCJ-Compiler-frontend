import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/react";

interface User {
  _id: string;
  username: string;
  email: string;
  currentcode: string; // or specify the type of the array elements
  password: string;
  // other properties if applicable
}

export interface UserSliceStateType {
  user: User;
  loading: boolean;
  error: boolean;
}

const initialState: UserSliceStateType = {
  user: {
    _id: "",
    username: "",
    email: "",
    currentcode: "",
    password: "",
  },
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "User",

  initialState,

  reducers: {
    startCurrentuser: (state) => {
      state.loading = true;
    },

    updateCurrentuser: (state, action: PayloadAction<UserSliceStateType["user"]>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    },

    errorCurrentuser: (state) => {
      state.loading = false;
      state.error = true;
    },

    logoutUser: (state) => {
      state.user = {
        _id: "",
        username: "",
        email: "",
        currentcode: "",
        password: "",
      };
    },
  },
});

export default userSlice.reducer;

export const {startCurrentuser, updateCurrentuser, errorCurrentuser, logoutUser} = userSlice.actions;
