import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: true,
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    setIsOpened: (state) => {
      state.isOpened = !state.isOpened;
    },
  },
});

export const { setIsOpened } = sideBarSlice.actions;
export const getSidebarOpened = (state) => state.sideBar.isOpened;

export default sideBarSlice.reducer;
