/**
 * Menu Redux Store - API Integration
 *
 * Handles fetching and caching menu data from the backend API.
 * The app uses dynamic API data instead of hardcoded values.
 *
 * Features:
 * - Fetches today's menu and weekly menu from API
 * - Same-day caching using localStorage (invalidates on date change)
 * - Separate loading and error states per request
 *
 * API Endpoints:
 * - GET /api/menu/today - Returns today's breakfast, lunch, dinner
 * - GET /api/menu/week - Returns full week menu (Monday-Sunday)
 *
 * Caching policy:
 * - Keys: todayMenu, todayMenuDate, weeklyMenu, weeklyMenuDate
 * - Policy: cache is considered valid for the current calendar day only
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
    todayLoading: false,
    weeklyLoading: false,
    todayError: null,
    weeklyError: null,
  },
  reducers: {
    clearError: (state) => {
      state.todayError = null;
      state.weeklyError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchTodayMenu
      .addCase(fetchTodayMenu.pending, (state) => {
        state.todayLoading = true;
        state.todayError = null;
      })
      .addCase(fetchTodayMenu.fulfilled, (state, action) => {
        state.todayLoading = false;
        state.todayMenu = action.payload;
      })
      .addCase(fetchTodayMenu.rejected, (state, action) => {
        state.todayLoading = false;
        state.todayError = action.payload;
      })
      // Handle fetchWeeklyMenu
      .addCase(fetchWeeklyMenu.pending, (state) => {
        state.weeklyLoading = true;
        state.weeklyError = null;
      })
      .addCase(fetchWeeklyMenu.fulfilled, (state, action) => {
        state.weeklyLoading = false;
        state.weeklyMenu = action.payload;
      })
      .addCase(fetchWeeklyMenu.rejected, (state, action) => {
        state.weeklyLoading = false;
        state.weeklyError = action.payload;
      });
  },
});

export const { clearError } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
