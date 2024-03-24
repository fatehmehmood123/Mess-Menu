import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  // Ramazan State
  initialState: [
    {
      day: 1,
      Breakfast: "Daal Mash",
      Lunch: "Vegetable Roll + Mix Pakora + Chatni + Jam-e-Shireen",
      Dinner: "Chicken Manchurian + Chineese Rice",
    },
    {
      day: 2,
      Breakfast: "White Channa",
      Lunch: "Alu Samosa + Mix Pakora + Chatni + Tang (lemon)",
      Dinner: "Chicken Curry + Tea",
    },
    {
      day: 3,
      Breakfast: "Mix vegetables",
      Lunch: "Channa Chat + Mix Pakora + Rooh Afza",
      Dinner: "Daal Mash + Chatni + Tea",
    },
    {
      day: 4,
      Breakfast: "Aluu Anda Onion",
      Lunch: "Vegetable Roll + Mix Pakora + Tang (Orange)",
      Dinner: "Biryani + Cold Drinks + Raita",
    },
    {
      day: 5,
      Breakfast: "Daal Channa",
      Lunch: "Dahi Bhallay + Mix Pakora + Chatni + Jaam-e-Shireen",
      Dinner: "Aluu Palak + Tea",
    },
    {
      day: 6,
      Breakfast: "Chicken Curry",
      Lunch: "Aluu Samosa + Mix Pakora + Chatni + Tang(Mango)",
      Dinner: "Chicken Kofta + Tea",
    },
    {
      day: 0,
      Breakfast: "Aluu Anda Curry",
      Lunch: "Lobia with Channa Chat + Mix Pakora + Rooh Afza",
      Dinner: "Chicken Pulao + Raita + Tea",
    },
  ],
  // Normal days
  // initialState: [
  //   {
  //     day: 1,
  //     Breakfast: "Fried Egg + Paratha",
  //     Lunch: "Palak Aluu",
  //     Dinner: "Chicken Roast + Channa Daal + Chatni",
  //   },
  //   {
  //     day: 2,
  //     Breakfast: "Naan Channa",
  //     Lunch: "Kari Pakora + Roti",
  //     Dinner: "Chicken Manchurian + Chineese Rice",
  //   },
  //   {
  //     day: 3,
  //     Breakfast: "Paratha + Omelette",
  //     Lunch: "Daal Moong + Salad",
  //     Dinner: "Chicken Karahi + Kheer/Zarda",
  //   },
  //   {
  //     day: 4,
  //     Breakfast: "French Toast",
  //     Lunch: "Aluu Gajar Mattar",
  //     Dinner: "Biryani + Cold Drinks",
  //   },
  //   {
  //     day: 5,
  //     Breakfast: "Aalu Anda",
  //     Lunch: "Daal Chawal (Yellow)",
  //     Dinner: "Beef Kofta",
  //   },
  //   {
  //     day: 6,
  //     Breakfast: "Aluu Paratha",
  //     Lunch: "Aluu Gobi",
  //     Dinner: "Chicken Pulao + Raita",
  //   },
  //   {
  //     day: 0,
  //     Breakfast: "Halwa Poori Channa",
  //     Lunch: "Red Bean",
  //     Dinner: "Beef Chappal Kabab + Mix Daal + Chatni",
  //   },
  // ],
  reducers: {
    weekChange: (state) => {
      state[0].Breakfast = "Daal Channa";
      state[0].Lunch = "Vegetable Roll + Mix Pakora + Chatni + Jam-e-Shireen";
      state[0].Dinner = "Chicken Manchurian + Chineese Rice + Tea";
      state[1].Breakfast = "White Channa";
      state[1].Lunch = "Alu Samosa + Mix Pakora + Chatni + Tang (lemon)";
      state[1].Dinner = "Chicken Curry + Tea";
      state[2].Breakfast = "Mix Vegetables";
      state[2].Lunch = "Channa Chat + Mix Pakora + Rooh Afza";
      state[2].Dinner = "Daal Mash + Chatni + Tea";
      state[3].Breakfast = "Aluu Anda Onion";
      state[3].Lunch = "Vegetable Roll + Mix Pakora + Tang (Orange)";
      state[3].Dinner = "Biryani + Cold Drinks + Raita";
      state[4].Breakfast = "Daal Channa";
      state[4].Lunch = "Dahi Bhallay + Mix Pakora + Chatni + Jaam-e-Shireen";
      state[4].Dinner = "Aluu Palak + Tea";
      state[5].Breakfast = "Chicken Curry";
      state[5].Lunch = "Aluu Samosa + Mix Pakora + Chatni + Tang(Mango)";
      state[5].Dinner = "Chicken Kofta + Tea";
      state[6].Breakfast = "Aluu Anda Curry";
      state[6].Lunch = "Lobia with Channa Chat + Mix Pakora + Rooh Afza"; 
      state[6].Dinner = "Chicken Pulao + Raita + Tea";
    },
    nextWeek: (state) => {
      state[0].Breakfast = "Daal Mash";
      state[0].Lunch = "Vegetable Roll + Mix Pakora + Chatni + Jam-e-Shireen";
      state[0].Dinner = "Chicken Manchurian + Chineese Rice + Tea";
      state[1].Breakfast = "White Channa";
      state[1].Lunch = "Alu Samosa + Mix Pakora + Chatni + Tang (lemon)";
      state[1].Dinner = "Chicken Curry + Tea";
      state[2].Breakfast = "Mix Vegetables";
      state[2].Lunch = "Channa Chat + Mix Pakora + Rooh Afza";
      state[2].Dinner = "Daal Mash + Chatni + Tea";
      state[3].Breakfast = "Aluu Anda Onion";
      state[3].Lunch = "Vegetable Roll + Mix Pakora + Tang (Orange)";
      state[3].Dinner = "Biryani + Cold Drinks + Raita";
      state[4].Breakfast = "Daal Channa";
      state[4].Lunch = "Dahi Bhallay + Mix Pakora + Chatni + Jaam-e-Shireen";
      state[4].Dinner = "Seasonal Vegetables + Tea";
      state[5].Breakfast = "Chicken Curry";
      state[5].Lunch = "Aluu Samosa + Mix Pakora + Chatni + Tang(Mango)";
      state[5].Dinner = "Chicken Kofta + Tea";
      state[6].Breakfast = "Aluu Anda Curry";
      state[6].Lunch = "Lobia with Channa Chat + Mix Pakora + Rooh Afza"; 
      state[6].Dinner = "Chicken Pulao + Raita + Tea";
    },
    // weekChange: (state) => {
    //   state[0].Breakfast = "Fried Egg + Paratha";
    //   state[0].Lunch = "Palak Aluu";
    //   state[0].Dinner = "Beef Shami + Chana Daal + Chatni";
    //   state[1].Breakfast = "Naan Channa";
    //   state[1].Lunch = "Kari Pakora + Rice";
    //   state[1].Dinner = "Chicken Manchurian + Chineese Rice";
    //   state[2].Breakfast = "Paratha + Omelette";
    //   state[2].Lunch = "Daal Mash + Salad";
    //   state[2].Dinner = "Chicken Karahi + Kheer/Zarda";
    //   state[3].Breakfast = "Bread Butter Jam";
    //   state[3].Lunch = "Aluu Gajar Mattar";
    //   state[3].Dinner = "Biryani + Cold Drinks";
    //   state[4].Breakfast = "Aalu Anda";
    //   state[4].Lunch = "Daal Chawal (Black)";
    //   state[4].Dinner = "Beef Kofta";
    //   state[5].Breakfast = "Aluu paratha";
    //   state[5].Lunch = "Aluu Gobi";
    //   state[5].Dinner = "Chicken Pulao + Raita";
    //   state[6].Breakfast = "Halwa Poori Channa";
    //   state[6].Lunch = "Red Bean";
    //   state[6].Dinner = "Aluu Cutlets + mix Daal + Chatni";
    // },
  },
});
export const { weekChange,nextWeek } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
