import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterReducer";
import sideBarReducer from "./reducers/sideBarReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sideBar: sideBarReducer,
    user: userReducer,
  },
});
