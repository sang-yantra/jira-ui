import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterReducer";
import rootReducer from "./reducers/rootReducer";
import sideBarReducer from "./reducers/sideBarReducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sideBar: sideBarReducer,
  },
});
