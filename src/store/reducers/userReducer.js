import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userid: "",
  username: "",
  firstname: "",
  middlename: "",
  lastname: "",
  email: "",
  avatar: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.userid = payload.userid;
      state.username = payload.username;
      state.firstname = payload.firstname;
      state.middlename = payload.middlename;
      state.lastname = payload.lastname;
      state.email = payload.email;
      state.avatar = payload.avatar;
    },
  },
});

export const { setUser } = userSlice.actions;
export const getUser = (state) => state.user;

export default userSlice.reducer;
