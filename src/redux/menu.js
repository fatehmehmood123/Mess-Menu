import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";

// API Base URL - Update in src/config.js when deploying
const API_BASE_URL = config.API_BASE_URL;

// Async thunk to fetch today's menu
export const fetchTodayMenu = createAsyncThunk(
  "menu/fetchToday",
  async (_, { rejectWithValue }) => {
    try {
      // Check cache first
      const cachedData = localStorage.getItem('todayMenu');
      const cacheTime = localStorage.getItem('todayMenuTime');
      const now = Date.now();
      
      // Use cache if less than 1 hour old
      if (cachedData && cacheTime && (now - parseInt(cacheTime)) < 3600000) {
        return JSON.parse(cachedData);
      }

      const response = await fetch(`${API_BASE_URL}/api/menu/today`);
      if (!response.ok) {
        throw new Error("Failed to fetch today's menu");
      }
      const data = await response.json();
      
      // Cache the data
      localStorage.setItem('todayMenu', JSON.stringify(data));
      localStorage.setItem('todayMenuTime', now.toString());
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch weekly menu
export const fetchWeeklyMenu = createAsyncThunk(
  "menu/fetchWeekly",
  async (_, { rejectWithValue }) => {
    try {
      // Check cache first
      const cachedData = localStorage.getItem('weeklyMenu');
      const cacheTime = localStorage.getItem('weeklyMenuTime');
      const now = Date.now();
      
      // Use cache if less than 1 hour old
      if (cachedData && cacheTime && (now - parseInt(cacheTime)) < 3600000) {
        return JSON.parse(cachedData);
      }

      const response = await fetch(`${API_BASE_URL}/api/menu/week`);
      if (!response.ok) {
        throw new Error("Failed to fetch weekly menu");
      }
      const data = await response.json();
      
      // Cache the data
      localStorage.setItem('weeklyMenu', JSON.stringify(data));
      localStorage.setItem('weeklyMenuTime', now.toString());
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    todayMenu: null,
    weeklyMenu: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchTodayMenu
      .addCase(fetchTodayMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodayMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.todayMenu = action.payload;
      })
      .addCase(fetchTodayMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchWeeklyMenu
      .addCase(fetchWeeklyMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeeklyMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyMenu = action.payload;
      })
      .addCase(fetchWeeklyMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
