import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: [
    {
      day: 1,
      Breakfast: "Fried Egg + Paratha",
      Lunch: "Palak Aluu",
      Dinner: "Chicken Roast + Channa Daal + Chatni",
    },
    {
      day: 2,
      Breakfast: "Naan Channa",
      Lunch: "Kari Pakora + Roti",
      Dinner: "Chicken Manchurian + Chineese Rice",
    },
    {
      day: 3,
      Breakfast: "Paratha + Omelette",
      Lunch: "Daal Moong + Salad",
      Dinner: "Chicken Karahi + Kheer/Zarda",
    },
    {
      day: 4,
      Breakfast: "French Toast",
      Lunch: "Aluu Gajar Mattar",
      Dinner: "Biryani + Cold Drinks",
    },
    {
      day: 5,
      Breakfast: "Aalu Anda",
      Lunch: "Daal Chawal (Yellow)",
      Dinner: "Beef Kofta",
    },
    {
      day: 6,
      Breakfast: "Aluu Paratha",
      Lunch: "Aluu Gobi",
      Dinner: "Chicken Pulao + Raita",
    },
    {
      day: 0,
      Breakfast: "Halwa Poori Channa",
      Lunch: "Red Bean",
      Dinner: "Beef Chappal Kabab + Mix Daal + Chatni",
    },
  ],
  reducers: {
    weekChange: (state) => {
      state[0].Breakfast = "Fried Egg + Paratha";
      state[0].Lunch = "Palak Aluu";
      state[0].Dinner = "Beef Shami + Chana Daal + Chatni";
      state[1].Breakfast = "Naan Channa";
      state[1].Lunch = "Kari Pakora + Rice";
      state[1].Dinner = "Chicken Manchurian + Chineese Rice";
      state[2].Breakfast = "Paratha + Omelette";
      state[2].Lunch = "Daal Mash + Salad";
      state[2].Dinner = "Chicken Karahi + Kheer/Zarda";
      state[3].Breakfast = "Bread Butter Jam";
      state[3].Lunch = "Aluu Gajar Mattar";
      state[3].Dinner = "Biryani + Cold Drinks";
      state[4].Breakfast = "Aalu Anda";
      state[4].Lunch = "Daal Chawal (Black)";
      state[4].Dinner = "Beef Kofta";
      state[5].Breakfast = "Aluu paratha";
      state[5].Lunch = "Aluu Gobi";
      state[5].Dinner = "Chicken Pulao + Raita";
      state[6].Breakfast = "Halwa Poori Channa";
      state[6].Lunch = "Red Bean";
      state[6].Dinner = "Aluu Cutlets + mix Daal + Chatni";
    },
  },
});
export const { weekChange } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
