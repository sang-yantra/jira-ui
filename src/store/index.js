import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterReducer";
import rootReducer from "./reducers/rootReducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
