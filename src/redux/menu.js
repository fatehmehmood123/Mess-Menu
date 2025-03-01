import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
 // Normal days
  initialState: [
    // {
    //   day: 1,
    //   Breakfast: "Fried Egg + Paratha",
    //   Lunch: "Aluu Palak",
    //   Dinner: "Chicken Roast + Channa Daal + Chatni",
    // },
    // {
    //   day: 2,
    //   Breakfast: "Naan Channa",
    //   Lunch: "Kari Pakora + Roti",
    //   Dinner: "Chicken Manchurian + Chinese Rice",
    // },
    // {
    //   day: 3,
    //   Breakfast: "Paratha + Omelette",
    //   Lunch: "Daal Mash + Salad",
    //   Dinner: "Chicken Karahi + Zarda",
    // },
    // {
    //   day: 4,
    //   Breakfast: "French Toast",
    //   Lunch: "Aluu Matar Gajar",
    //   Dinner: "Biryani + Cold Drinks",
    // },
    // {
    //   day: 5,
    //   Breakfast: "Aalu Anda",
    //   Lunch: "Daal Chawal (Yellow)",
    //   Dinner: "Chicken Daleem + Naan",
    // },
    // {
    //   day: 6,
    //   Breakfast: "Aluu Paratha",
    //   Lunch: "Alu Gobi",
    //   Dinner: "Chicken Pulao + Raita",
    // },
    // {
    //   day: 0,
    //   Breakfast: "Halwa Poori Channa",
    //   Lunch: "Red Bean",
    //   Dinner: "Aluu Cutlets + Mix Daal + Chatni",
    // },


    // Ramzan
    {
      day: 1,
      Breakfast: "Murgh Channay / Daal Mash",
      Lunch: "Chicken Veg Roll, Pakora Fries, Jaame-Sheerin",
      Dinner: "Chicken Manchurian, Chinese Rice",
    },
    {
      day: 2,
      Breakfast: "Aloo Anda Onion",
      Lunch: "Aloo Samosa, Mix Pakora, Tang Lemon",
      Dinner: "Chicken Curry",
    },
    {
      day: 3,
      Breakfast: "White Channa",
      Lunch: "Dahi Bhalay, Mix pakora, Jaame-Sheerin",
      Dinner: "Chicken Kofta",
    },
    {
      day: 4,
      Breakfast: "Aloo Keema",
      Lunch: "Chicken Veg Roll, Pakora Fries, Tang Orange",
      Dinner: "Biryani , Cold Drinks",
    },
    {
      day: 5,
      Breakfast: "Omelette",
      Lunch: "Channa Chaat, Mix Pakora, Rooh Afza",
      Dinner: "Chicken Daleem, Naan",
    },
    {
      day: 6,
      Breakfast: "Chicken Curry",
      Lunch: "Chicken Veg Roll, Mix Pakora, Tang Orange",
      Dinner: "Chicken Nihari, Naan",
    },
    {
      day: 0,
      Breakfast: "Aloo Anda Curry",
      Lunch: "Lobia & Channa Chaat, Mix Pakora, Rooh Afza",
      Dinner: "Chicken Pulao",
    },
  ],
  reducers: {
    weekChange: (state) => {
      // state[0].Breakfast = "Fried Egg + Paratha";
      // state[0].Lunch = "Aluu Palak";
      // state[0].Dinner = "Beef Shami + Chana Daal + Chatni";
      // state[1].Breakfast = "Naan Channa";
      // state[1].Lunch = "Kari Pakora + Rice";
      // state[1].Dinner = "Channa Pulao";
      // state[2].Breakfast = "Paratha + Omelette";
      // state[2].Lunch = "Daal Moong + Salad";
      // state[2].Dinner = "Chicken Karahi + Kheer";
      // state[3].Breakfast = "Bread Butter Jam";
      // state[3].Lunch = "Aluu Matar Gajar";
      // state[3].Dinner = "Biryani + Cold Drinks";
      // state[4].Breakfast = "Aalu Anda";
      // state[4].Lunch = "Daal Chawal (Black)";
      // state[4].Dinner = "Chicken Daleem + Naan";
      // state[5].Breakfast = "Aluu paratha";
      // state[5].Lunch = "Alu Gobi";
      // state[5].Dinner = "Chicken Pulao + Raita";
      // state[6].Breakfast = "Halwa Poori Channa";
      // state[6].Lunch = "Red Bean";
      // state[6].Dinner = "Beef Chappal Kabab + Mix Daal + Raita";


//Ramzan
      state[0].Breakfast = "Murgh Channay / Daal Mash";
      state[0].Lunch = "Chicken Veg Roll, Pakora Fries, Jaame-Sheerin";
      state[0].Dinner = "Chicken Manchurian, Chinese Rice";

      state[1].Breakfast = "Aloo Anda Onion";
      state[1].Lunch = "Aloo Samosa, Mix Pakora, Tang Lemon";
      state[1].Dinner = "Chicken Curry";

      state[2].Breakfast = "White Channa";
      state[2].Lunch = "Dahi Bhalay, Mix pakora, Jaame-Sheerin";
      state[2].Dinner = "Chicken Kofta";

      state[3].Breakfast = "Aloo Keema";
      state[3].Lunch = "Chicken Veg Roll, Pakora Fries, Tang Orange";
      state[3].Dinner = "Biryani , Cold Drinks";

      state[4].Breakfast = "Omelette";
      state[4].Lunch = "Channa Chaat, Mix Pakora, Rooh Afza";
      state[4].Dinner = "Chicken Daleem, Naan";

      state[5].Breakfast = "Chicken Curry";
      state[5].Lunch = "Chicken Veg Roll, Mix Pakora, Tang Orange";
      state[5].Dinner = "Chicken Nihari, Naan";

      state[6].Breakfast = "Aloo Anda Curry";
      state[6].Lunch = "Lobia & Channa Chaat, Mix Pakora, Rooh Afza";
      state[6].Dinner = "Chicken Pulao";
    },
  },
});
export const { weekChange,nextWeek } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
