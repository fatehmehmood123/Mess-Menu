/**
 * Menu Redux Store - API Integration
 *
 * Handles fetching and caching menu data from the backend API.
 * The app uses dynamic API data instead of hardcoded values.
 *
 * Features:
 * - Fetches today's menu and weekly menu from API
 * - 1-hour caching using localStorage (invalidates after 1 hour)
 * - Separate loading and error states per request
 * - Smart caching: only fetches if data doesn't exist or is stale
 * - skipCache option for force-refresh (e.g., after rating submission)
 *
 * API Endpoints:
 * - GET /api/v2/menu/today - Returns today's breakfast, lunch, dinner
 * - GET /api/v2/menu/week - Returns full week menu (Monday-Sunday)
 *
 * Caching policy:
 * - Keys: todayMenu, todayMenuTime, todayMenuDate, weeklyMenu, weeklyMenuTime, weeklyMenuDate
 * - TTL: 1 hour (3600000 milliseconds)
 * - Policy: cache is valid for 1 hour from last fetch AND same calendar day
 * - Invalidation: cache expires after 1 hour OR at midnight (day change)
 * - Smart loading: only fetches if data doesn't already exist in Redux state
 *
 * Developer Contact: taahabz@gmail.com
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebaseConfig";
import config from "../config";

// API Base URL - Update in src/config.js when deploying
const API_BASE_URL = config.API_BASE_URL;

// Cache TTL: 1 hour in milliseconds (reduced DB reads since menu doesn't change frequently)
const CACHE_TTL = 60 * 60 * 1000; // 3600000ms = 1 hour

// Versioned cache keys (bump if response shape changes to avoid stale data)
const TODAY_KEY = 'todayMenuV2';
const TODAY_TIME_KEY = 'todayMenuTimeV2';
const TODAY_DATE_KEY = 'todayMenuDateV2';
const WEEKLY_KEY = 'weeklyMenuV2';
const WEEKLY_TIME_KEY = 'weeklyMenuTimeV2';
const WEEKLY_DATE_KEY = 'weeklyMenuDateV2';

// Clean up old cache keys from previous versions
const legacyKeys = ['todayMenu', 'todayMenuTime', 'todayMenuDate', 'weeklyMenu', 'weeklyMenuTime', 'weeklyMenuDate'];
legacyKeys.forEach((k) => {
  try { localStorage.removeItem(k); } catch (_) { /* ignore */ }
});

/**
 * Fetch Today's Menu
 * Retrieves today's menu from API with caching (1-hour TTL + day change invalidation)
 * @param {boolean} skipCache - If true, bypass cache and fetch fresh data
 */
export const fetchTodayMenu = createAsyncThunk(
  "menu/fetchToday",
  async (skipCache = false, { rejectWithValue, getState }) => {
    try {
      const now = Date.now();
      const today = new Date().toDateString();
      
      // Check localStorage cache (skip if skipCache is true)
      if (!skipCache) {
        const cachedData = localStorage.getItem(TODAY_KEY);
        const cachedTime = localStorage.getItem(TODAY_TIME_KEY);
        const cachedDate = localStorage.getItem(TODAY_DATE_KEY);
        
        // Use cache only if:
        // 1. It's less than 1 hour old AND
        // 2. It's from the same calendar day
        if (cachedData && cachedTime && cachedDate === today && 
            (now - parseInt(cachedTime) < CACHE_TTL)) {
          return JSON.parse(cachedData);
        }
      }

      // Get auth token if user is logged in
      const state = getState();
      const user = state.auth?.user;
      const headers = { 'Content-Type': 'application/json' };
      
      if (user && auth.currentUser) {
        try {
          const idToken = await auth.currentUser.getIdToken();
          headers['Authorization'] = `Bearer ${idToken}`;
        } catch (authError) {
          console.log('Failed to get auth token, continuing without it');
        }
      }

      // Fetch fresh data from V2 API (meal-based)
      const response = await fetch(`${API_BASE_URL}/api/v2/menu/today`, { headers });
      if (!response.ok) {
        throw new Error("Failed to fetch today's menu");
      }
      const data = await response.json();
      
      // Store in cache with current timestamp and date
      localStorage.setItem(TODAY_KEY, JSON.stringify(data));
      localStorage.setItem(TODAY_TIME_KEY, now.toString());
      localStorage.setItem(TODAY_DATE_KEY, today);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Fetch Weekly Menu
 * Retrieves full week menu from API with caching (1-hour TTL + day change invalidation)
 * @param {boolean} skipCache - If true, bypass cache and fetch fresh data
 */
export const fetchWeeklyMenu = createAsyncThunk(
  "menu/fetchWeekly",
  async (skipCache = false, { rejectWithValue, getState }) => {
    try {
      const now = Date.now();
      const today = new Date().toDateString();
      
      // Check localStorage cache (skip if skipCache is true)
      if (!skipCache) {
        const cachedData = localStorage.getItem(WEEKLY_KEY);
        const cachedTime = localStorage.getItem(WEEKLY_TIME_KEY);
        const cachedDate = localStorage.getItem(WEEKLY_DATE_KEY);
        
        // Use cache only if:
        // 1. It's less than 1 hour old AND
        // 2. It's from the same calendar day
        if (cachedData && cachedTime && cachedDate === today && 
            (now - parseInt(cachedTime) < CACHE_TTL)) {
          return JSON.parse(cachedData);
        }
      }

      // Get auth token if user is logged in
      const state = getState();
      const user = state.auth?.user;
      const headers = { 'Content-Type': 'application/json' };
      
      if (user && auth.currentUser) {
        try {
          const idToken = await auth.currentUser.getIdToken();
          headers['Authorization'] = `Bearer ${idToken}`;
        } catch (authError) {
          console.log('Failed to get auth token, continuing without it');
        }
      }

      // Fetch fresh data from V2 API (meal-based)
      const response = await fetch(`${API_BASE_URL}/api/v2/menu/week`, { headers });
      if (!response.ok) {
        throw new Error("Failed to fetch weekly menu");
      }
      const data = await response.json();
      
      // Store in cache with current timestamp and date
      localStorage.setItem(WEEKLY_KEY, JSON.stringify(data));
      localStorage.setItem(WEEKLY_TIME_KEY, now.toString());
      localStorage.setItem(WEEKLY_DATE_KEY, today);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Submit rating for a meal (V2 - meal-based rating)
 * @param {string} mealId - The meal ID to rate
 * @param {number} rating - Rating from 1-10
 * @param {string} comment - Optional comment
 */
export const submitMealRating = createAsyncThunk(
  "menu/submitMealRating",
  async ({ mealId, rating, comment }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const user = state.auth?.user;

      if (!user) {
        throw new Error('Must be logged in to rate');
      }

      const idToken = await auth.currentUser.getIdToken();

      const response = await fetch(`${API_BASE_URL}/api/ratings/meal/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          mealId,
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit rating');
      }

      const data = await response.json();

      // Clear menu cache to fetch updated ratings
      localStorage.removeItem('todayMenu');
      localStorage.removeItem('todayMenuTime');
      localStorage.removeItem('weeklyMenu');
      localStorage.removeItem('weeklyMenuTime');

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
    ratingsLoading: false,
    ratingsError: null,
  },
  reducers: {
    clearError: (state) => {
      state.todayError = null;
      state.weeklyError = null;
      state.ratingsError = null;
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
      })
      // Handle submitMealRating (V2)
      .addCase(submitMealRating.pending, (state) => {
        state.ratingsLoading = true;
        state.ratingsError = null;
      })
      .addCase(submitMealRating.fulfilled, (state) => {
        state.ratingsLoading = false;
      })
      .addCase(submitMealRating.rejected, (state, action) => {
        state.ratingsLoading = false;
        state.ratingsError = action.payload;
      });
  },
});

export const { clearError } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
