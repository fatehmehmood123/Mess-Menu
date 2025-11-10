import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";

// API Base URL - Update in src/config.js when deploying
const API_BASE_URL = config.API_BASE_URL;

// Async thunk to fetch today's menu
export const fetchTodayMenu = createAsyncThunk(
  "menu/fetchToday",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🔵 Fetching today's menu from:", `${API_BASE_URL}/api/menu/today`);
      const response = await fetch(`${API_BASE_URL}/api/menu/today`);
      console.log("🔵 Response status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to fetch today's menu");
      }
      const data = await response.json();
      console.log("✅ Today's menu data:", data);
      return data;
    } catch (error) {
      console.error("❌ Error fetching today's menu:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch weekly menu
export const fetchWeeklyMenu = createAsyncThunk(
  "menu/fetchWeekly",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🔵 Fetching weekly menu from:", `${API_BASE_URL}/api/menu/week`);
      const response = await fetch(`${API_BASE_URL}/api/menu/week`);
      console.log("🔵 Response status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to fetch weekly menu");
      }
      const data = await response.json();
      console.log("✅ Weekly menu data:", data);
      return data;
    } catch (error) {
      console.error("❌ Error fetching weekly menu:", error);
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
