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
      Dinner: "Beef Pulao + Raita",
    },
    {
      day: 3,
      Breakfast: "Paratha + Omelette",
      Lunch: "Daal Moong + Chatni",
      Dinner: "Chicken Karahi + Custard",
    },
    {
      day: 4,
      Breakfast: "Aluu Bhujia + Paratha",
      Lunch: "Aluu Gajar Mattar",
      Dinner: "Biryani + Cold Drinks",
    },
    {
      day: 5,
      Breakfast: "Egg Tomato Onion",
      Lunch: "Daal Chawal (Yellow)",
      Dinner: "Beef Daleem",
    },
    {
      day: 6,
      Breakfast: "Aluu Paratha",
      Lunch: "Aluu Teenday",
      Dinner: "Beef Chappal Kabab + Daal + Chatni",
    },
    {
      day: 0,
      Breakfast: "Halwa Poori Channa",
      Lunch: "Red Bean",
      Dinner: "Chicken Pulao + Raita",
    },
  ],
  reducers: {
    weekChange: (state) => {
      state[0].Breakfast = "Fried Egg + Paratha";
      state[0].Lunch = "Palak Aluu";
      state[0].Dinner = "Beef Shami + Chana Daal + Chatni";
      state[1].Breakfast = "Naan Channa";
      state[1].Lunch = "Kari Pakora + Rice";
      state[1].Dinner = "Beef Pulao + Raita";
      state[2].Breakfast = "Paratha + Aluu Bhujia";
      state[2].Lunch = "Daal Mash + Salad";
      state[2].Dinner = "Chicken Karahi + Custard";
      state[3].Breakfast = "Bread Butter Jam";
      state[3].Lunch = "Aluu Gajar Mattar";
      state[3].Dinner = "Biryani + Cold Drinks";
      state[4].Breakfast = "Egg tomato Onion";
      state[4].Lunch = "Daal Chawal (Black)";
      state[4].Dinner = "Aluu Beef Curry";
      state[5].Breakfast = "Aluu paratha";
      state[5].Lunch = "Aluu Teenday";
      state[5].Dinner = "Aluu Cutlets + Daal";
      state[6].Breakfast = "Halwa Poori Channa";
      state[6].Lunch = "Red Bean";
      state[6].Dinner = "Chicken Pulao + Raita";
    },
  },
});
export const { weekChange } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
