import { configureStore } from "@reduxjs/toolkit";
import { menuReducer } from "./menu.js";
import { authReducer } from "./auth.js";

export default configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
  },
});
