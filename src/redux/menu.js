/**
 * Menu Redux Store - API Integration
 * 
 * This file handles fetching and caching menu data from the backend API.
 * The app now uses dynamic menu data instead of hardcoded values.
 * 
 * Features:
 * - Fetches today's menu and weekly menu from API
 * - Caches responses in localStorage for 1 hour
 * - Handles loading and error states
 * 
 * API Endpoints:
 * - GET /api/menu/today - Returns today's breakfast, lunch, dinner
 * - GET /api/menu/week - Returns full week menu (Monday-Sunday)
 * 
 * Developer Contact: taahabz@gmail.com
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";

// API Base URL - Update in src/config.js when deploying
const API_BASE_URL = config.API_BASE_URL;

/**
 * Fetch Today's Menu
 * Retrieves today's menu from API with caching (invalidates on day change)
 */
export const fetchTodayMenu = createAsyncThunk(
  "menu/fetchToday",
  async (_, { rejectWithValue }) => {
    try {
      // Check localStorage cache
      const cachedData = localStorage.getItem('todayMenu');
      const cachedDate = localStorage.getItem('todayMenuDate');
      const today = new Date().toDateString(); // Current date as string
      
      // Use cache only if it's from today
      if (cachedData && cachedDate === today) {
        return JSON.parse(cachedData);
      }

      // Fetch fresh data from API
      const response = await fetch(`${API_BASE_URL}/api/menu/today`);
      if (!response.ok) {
        throw new Error("Failed to fetch today's menu");
      }
      const data = await response.json();
      
      // Store in cache with today's date
      localStorage.setItem('todayMenu', JSON.stringify(data));
      localStorage.setItem('todayMenuDate', today);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Fetch Weekly Menu
 * Retrieves full week menu from API with caching (invalidates on day change)
 */
export const fetchWeeklyMenu = createAsyncThunk(
  "menu/fetchWeekly",
  async (_, { rejectWithValue }) => {
    try {
      // Check localStorage cache
      const cachedData = localStorage.getItem('weeklyMenu');
      const cachedDate = localStorage.getItem('weeklyMenuDate');
      const today = new Date().toDateString(); // Current date as string
      
      // Use cache only if it's from today
      if (cachedData && cachedDate === today) {
        return JSON.parse(cachedData);
      }

      // Fetch fresh data from API
      const response = await fetch(`${API_BASE_URL}/api/menu/week`);
      if (!response.ok) {
        throw new Error("Failed to fetch weekly menu");
      }
      const data = await response.json();
      
      // Store in cache with today's date
      localStorage.setItem('weeklyMenu', JSON.stringify(data));
      localStorage.setItem('weeklyMenuDate', today);
      
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
