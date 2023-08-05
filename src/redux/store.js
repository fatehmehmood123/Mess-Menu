import { configureStore } from '@reduxjs/toolkit';
import {menuReducer} from './menu.js'; 

export default configureStore({
  reducer: {
    menu: menuReducer
  }
});