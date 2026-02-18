/**
 * Menu Redux Store - Static Ramzan Menu
 *
 * Contains hardcoded Ramzan mess menu for Feb/Mar 2026.
 * Both Week 1 and Week 2 use the same menu.
 *
 * Meal Timings (Ramzan):
 * - Sehri: 02:45 onward
 * - Iftari: Iftar time
 * - Dinner: 19:30 - 21:00
 *
 * Developer Contact: taahabz@gmail.com
 */

import { createSlice } from "@reduxjs/toolkit";

// ─── Static Ramzan Menu Data ────────────────────────────────────────────────

const RAMZAN_WEEKLY_MENU = {
  monday: {
    breakfast: {

      items: ["Omelette", "Paratha / Chapati", "Yogurt", "Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "mon-sehri",
    },
    lunch: {

      items: ["Dates", "Fruit Chaat", "Pakora Fries", "Chatni", "Jaame-Sheerin with Lemon"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "mon-iftari",
    },
    dinner: {

      items: ["Chicken Manchurian", "Chinese Rice", "Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "mon-dinner",
    },
  },
  tuesday: {
    breakfast: {

      items: ["Aloo Anda", "Onion Paratha / Chapati", "Yogurt", "Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "tue-sehri",
    },
    lunch: {

      items: ["Dates", "Aloo Samosa", "Mix Pakora", "Chatni", "Tang (Orange / Mango)"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "tue-iftari",
    },
    dinner: {

      items: ["Boneless Handi", "Chapati", "Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "tue-dinner",
    },
  },
  wednesday: {
    breakfast: {

      items: ["White Channa", "Paratha / Chapati", "Yogurt", "Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "wed-sehri",
    },
    lunch: {

      items: ["Dates", "Dahi Balay", "Mix Pakora", "Chatni", "Jaame-Sheerin with Lemon"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "wed-iftari",
    },
    dinner: {

      items: ["Chicken Pulao", "Raita", "Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "wed-dinner",
    },
  },
  thursday: {
    breakfast: {

      items: ["Chicken Nihari", "Paratha / Chapati", "Yogurt", "Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "thu-sehri",
    },
    lunch: {

      items: ["Dates", "Fruit Chaat", "Pakora Fries", "Chatni", "Tang (Orange / Mango)"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "thu-iftari",
    },
    dinner: {

      items: ["Chicken Biryani", "Raita", "Cold Drinks"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "thu-dinner",
    },
  },
  friday: {
    breakfast: {

      items: ["Omelette", "Paratha / Chapati", "Yogurt", "Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "fri-sehri",
    },
    lunch: {

      items: ["Dates", "Channa Chaat", "Mix Pakora", "Chatni", "Rooh Afza with Lemon"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "fri-iftari",
    },
    dinner: {

      items: ["Chicken Daleem", "Chapati / Naan", "Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "fri-dinner",
    },
  },
  saturday: {
    breakfast: {

      items: ["Chicken Curry", "Paratha / Chapati", "Yogurt", "Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "sat-sehri",
    },
    lunch: {

      items: ["Dates", "Chicken Veg Samosa", "Mix Pakora", "Chatni", "Tang (Orange / Mango)"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "sat-iftari",
    },
    dinner: {

      items: ["Vegetable Pulao", "Shami Kabab", "Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "sat-dinner",
    },
  },
  sunday: {
    breakfast: {

      items: ["Half & Full Fried Egg", "Paratha / Chapati", "Yogurt", "Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "sun-sehri",
    },
    lunch: {

      items: ["Dates", "Dahi Balay", "Mix Pakora", "Chatni", "Rooh Afza with Lemon"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "sun-iftari",
    },
    dinner: {

      items: ["Chicken Pulao", "Raita", "Kashmiri Tea"],
      averageRating: null,
      ratingCount: 0,
      userRating: null,
      mealId: "sun-dinner",
    },
  },
};

// ─── Helper: get today's meals from the static menu ─────────────────────────

const DAY_MAP = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function getTodayMenu() {
  const dayIndex = new Date().getDay(); // 0=Sun … 6=Sat
  const dayName = DAY_MAP[dayIndex];
  const dayMeals = RAMZAN_WEEKLY_MENU[dayName];

  return {
    meals: {
      breakfast: dayMeals.breakfast,
      lunch: dayMeals.lunch,
      dinner: dayMeals.dinner,
    },
    weekNumber: 1,
    day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
  };
}

function getWeeklyMenu() {
  return {
    menu: RAMZAN_WEEKLY_MENU,
    weekNumber: 1,
  };
}

// ─── Thunk-like actions (synchronous, return static data) ───────────────────

export const fetchTodayMenu = () => (dispatch) => {
  dispatch(menuSlice.actions._setTodayMenu(getTodayMenu()));
};

export const fetchWeeklyMenu = () => (dispatch) => {
  dispatch(menuSlice.actions._setWeeklyMenu(getWeeklyMenu()));
};

// Rating is a no-op for static mode
export const submitMealRating = () => () => {
  // No API in static mode
};

// ─── Slice ──────────────────────────────────────────────────────────────────

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    todayMenu: getTodayMenu(),
    weeklyMenu: getWeeklyMenu(),
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
    _setTodayMenu: (state, action) => {
      state.todayMenu = action.payload;
      state.todayLoading = false;
      state.todayError = null;
    },
    _setWeeklyMenu: (state, action) => {
      state.weeklyMenu = action.payload;
      state.weeklyLoading = false;
      state.weeklyError = null;
    },
  },
});

export const { clearError } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
