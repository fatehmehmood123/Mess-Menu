import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import WeekContainer from "../components/WeekContainer";
import Footer from "../components/Footer";
import AnnouncementPopup from "../components/AnnouncementPopup";
import { useSelector, useDispatch } from "react-redux";
import { weekChange } from "../redux/menu.js";
import Userback from "@userback/widget";

export default function Weekly() {
  // Initialize Userback feedback widget
  useEffect(() => {
    Userback("A-OnuXRblXLHIFp6PEPSwFMbm5M");
  }, []);
  //initializing Current date and
  let currentDate = new Date();

  // Funtion to convert current date to week number
  // eslint-disable-next-line
  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() - 1) / 7);
  };
  // Getting Week Number
  let week = currentDate.getWeek();
  //redux functions to get values from store and dispatch an action
  const weekMenu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  //useEffect for changing the menu when week changes
  useEffect(() => {
    if (week % 2 === 0) {
      dispatch(weekChange());
    }
  }, [week, dispatch]);

  return (
    <>
      <AnnouncementPopup />
      <Navbar />
      <WeekContainer
        monBreakfast={weekMenu[0].Breakfast}
        monLunch={weekMenu[0].Lunch}
        satLunch={weekMenu[5].Lunch}
        wedBreakfast={weekMenu[2].Breakfast}
        tueLunch={weekMenu[1].Lunch}
        tueBreakfast={weekMenu[1].Breakfast}
        monDinner={weekMenu[0].Dinner}
        tueDinner={weekMenu[1].Dinner}
        wedLunch={weekMenu[2].Lunch}
        wedDinner={weekMenu[2].Dinner}
        thursBreakfast={weekMenu[3].Breakfast}
        thursLunch={weekMenu[3].Lunch}
        thursDinner={weekMenu[3].Dinner}
        friLunch={weekMenu[4].Lunch}
        friBreakfast={weekMenu[4].Breakfast}
        friDinner={weekMenu[4].Dinner}
        satDinner={weekMenu[5].Dinner}
        satBreakfast={weekMenu[5].Breakfast}
        sunDinner={weekMenu[6].Dinner}
        sunLunch={weekMenu[6].Lunch}
        sunBreakfast={weekMenu[6].Breakfast}
      />
      <Footer />
    </>
  );
}
