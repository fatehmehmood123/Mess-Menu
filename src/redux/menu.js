import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
 // Normal days
  initialState: [
    {
      day: 1,
      Breakfast: "Omelette + Paratha",
      Lunch: "Aloo Palak",
      Dinner: "Channa Pulao + Raita",
    },
    {
      day: 2,
      Breakfast: "Kulcha Channa",
      Lunch: "Daal Mash + Salad",
      Dinner: "Murgh Channay",
    },
    {
      day: 3,
      Breakfast: "Half & Full Fried Egg",
      Lunch: "Kari Pakora + Naan",
      Dinner: "Chicken Achari + Zarda",
    },
    {
      day: 4,
      Breakfast: "Egg Tomato Onion",
      Lunch: "Daal Kaddu",
      Dinner: "Biryani + Cold Drinks",
    },
    {
      day: 5,
      Breakfast: "French Toast",
      Lunch: "Daal Chawal (Black)",
      Dinner: "Aloo Beef Keema + Chapati",
    },
    {
      day: 6,
      Breakfast: "Aloo Paratha",
      Lunch: "Lobia",
      Dinner: "Chicken Pulao + Raita",
    },
    {
      day: 0,
      Breakfast: "Halwa Puri + Channa",
      Lunch: "Bhindi + Salad",
      Dinner: "Chicken Chowmein",
    },


    // Ramzan
    // {
    //   day: 1,
    //   Breakfast: "Daal Mash",
    //   Lunch: "Chicken Veg Roll, Pakora Fries, Jaame-Sheerin",
    //   Dinner: "Chicken Manchurian, Chinese Rice",
    // },
    // {
    //   day: 2,
    //   Breakfast: "Aloo Anda Onion",
    //   Lunch: "Aloo Samosa, Mix Pakora, Tang Lemon",
    //   Dinner: "Chicken Curry",
    // },
    // {
    //   day: 3,
    //   Breakfast: "White Channa",
    //   Lunch: "Dahi Bhalay, Mix pakora, Jaame-Sheerin",
    //   Dinner: "Chicken Kofta",
    // },
    // {
    //   day: 4,
    //   Breakfast: "Aloo Keema",
    //   Lunch: "Chicken Veg Roll, Pakora Fries, Tang Orange",
    //   Dinner: "Biryani , Cold Drinks",
    // },
    // {
    //   day: 5,
    //   Breakfast: "Omelette",
    //   Lunch: "Channa Chaat, Mix Pakora, Rooh Afza",
    //   Dinner: "Chicken Daleem, Naan",
    // },
    // {
    //   day: 6,
    //   Breakfast: "Chicken Curry",
    //   Lunch: "Chicken Veg Samosa, Mix Pakora, Tang Orange",
    //   Dinner: "Chicken Nihari, Naan",
    // },
    // {
    //   day: 0,
    //   Breakfast: "Aloo Anda Curry",
    //   Lunch: "Lobia & Channa Chaat, Mix Pakora, Rooh Afza",
    //   Dinner: "Chicken Pulao",
    // },
  ],
  reducers: {
    weekChange: (state) => {
      state[0].Breakfast = "Omelette + Paratha";
      state[0].Lunch = "Aloo Baingain";
      state[0].Dinner = "Beef Kabuli Pulao";
      state[1].Breakfast = "Kulcha Channa";
      state[1].Lunch = "Daal Mash + Salad";
      state[1].Dinner = "Chicken Daleem";
      state[2].Breakfast = "Half & Full Fried Egg + Paratha";
      state[2].Lunch = "Kari Pakora + Rice";
      state[2].Dinner = "Chicken Achari + Kheer";
      state[3].Breakfast = "Scrambled Egg";
      state[3].Lunch = "Daal Kaddu";
      state[3].Dinner = "Biryani + Cold Drinks";
      state[4].Breakfast = "Bread, Butter & Jam";
      state[4].Lunch = "Daal Chawal (Yellow)";
      state[4].Dinner = "Aloo Beef Keema + Chapati";
      state[5].Breakfast = "Aloo paratha";
      state[5].Lunch = "Black Channa";
      state[5].Dinner = "Chicken Pulao + Raita";
      state[6].Breakfast = "Halwa Puri + Channa";
      state[6].Lunch = "Beef Curry + Rice + Salad";
      state[6].Dinner = "Aloo Cutlets + Mix Daal + Chatni";


//Raaamzan
      // state[0].Breakfast = "Murgh Channay";
      // state[0].Lunch = "Chicken Veg Roll, Pakora Fries, Jaame-Sheerin";
      // state[0].Dinner = "Chicken Manchurian, Chinese Rice";

      // state[1].Breakfast = "Aloo Anda Onion";
      // state[1].Lunch = "Aloo Samosa, Mix Pakora, Tang Lemon";
      // state[1].Dinner = "Chicken Curry";

      // state[2].Breakfast = "White Channa";
      // state[2].Lunch = "Dahi Bhalay, Mix pakora, Jaame-Sheerin";
      // state[2].Dinner = "Chicken Kofta";

      // state[3].Breakfast = "Aloo Keema";
      // state[3].Lunch = "Chicken Veg Roll, Pakora Fries, Tang Orange";
      // state[3].Dinner = "Biryani , Cold Drinks";

      // state[4].Breakfast = "Omelette";
      // state[4].Lunch = "Channa Chaat, Mix Pakora, Rooh Afza";
      // state[4].Dinner = "Chicken Daleem, Naan";

      // state[5].Breakfast = "Chicken Curry";
      // state[5].Lunch = "Chicken Veg Samosa, Mix Pakora, Tang Orange";
      // state[5].Dinner = "Chicken Nihari, Naan";

      // state[6].Breakfast = "Aloo Anda Curry";
      // state[6].Lunch = "Lobia & Channa Chaat, Mix Pakora, Rooh Afza";
      // state[6].Dinner = "Chicken Pulao";
    },
  },
});
export const { weekChange,nextWeek } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
