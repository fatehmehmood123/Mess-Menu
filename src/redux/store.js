import { configureStore } from "@reduxjs/toolkit";
import { menuReducer } from "./menu.js";
import { authReducer } from "./auth.js";
import { commentsReducer } from "./comments.js";

export default configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    comments: commentsReducer,
  },
});
