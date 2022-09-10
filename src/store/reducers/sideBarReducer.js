import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: true,
};

export const sideBarSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    isSetOpened: (state) => {
      state.isOpened = !state.isOpened;
    },
  },
});

export const { isSetOpened } = sideBarSlice.actions;
export const getSidebarOpened = (state) => state.sideBar.isOpened;

export default sideBarSlice.reducer;
