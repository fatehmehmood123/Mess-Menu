import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: [
    {
      day: 1,
      Breakfast: "Fried Egg + Paratha",
      Lunch: "Palak Aluu",
      Dinner: "Chicken Roast + Chana Daal + Raita",
    },
    {
      day: 2,
      Breakfast: "Naan Channa",
      Lunch: "Kari Pakora + Roti",
      Dinner: "Beef Pulao",
    },
    {
      day: 3,
      Breakfast: "Paratha + Omellete",
      Lunch: "Mash Daal + Dahi",
      Dinner: "Chicken Karahi + Custard",
    },
    {
      day: 4,
      Breakfast: "Alu Bhujia + Paratha",
      Lunch: "Daal Channa Kadoo",
      Dinner: "Biryani",
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
      Dinner: "Beef Chapli kabab + Daal",
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
      state[0].Dinner = "Beef Shami + Chana Daal + Raita";
      state[1].Breakfast = "Naan Channa";
      state[1].Lunch = "Kari Pakora + Rice";
      state[1].Dinner = "Beef Pulao";
      state[2].Breakfast = "Paratha + Aluu Bhujia";
      state[2].Lunch = "Mash Daal + Salad";
      state[2].Dinner = "Chicken Karahi + Custard";
      state[3].Breakfast = "Bread Butter Jam";
      state[3].Lunch = "Daal Channa Kadoo";
      state[3].Dinner = "Biryani";
      state[4].Breakfast = "Egg tomato Onion";
      state[4].Lunch = "Daal Chawal (Black)";
      state[4].Dinner = "Aluu beef Curry";
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
