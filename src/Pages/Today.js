import { React, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import TodayContainer from "../components/TodayContainer";
import TodayFooter from "../components/TodayFooter";
import { useSelector, useDispatch } from "react-redux";
import { weekChange } from "../redux/menu.js";
import Userback from "@userback/widget";

export default function Daily() {
  // Initialize Userback feedback widget
  useEffect(() => {
    Userback("A-OnuXRblXLHIFp6PEPSwFMbm5M");
  }, []);
  //initializing Current date using UseMemo hook to avoid re-rendering
  const currentDate = useMemo(() => new Date(), []);

  // Function to convert current date to week number
  // eslint-disable-next-line
  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() - 1) / 7);
  };
  // Getting Week Number and day number
  let week = currentDate.getWeek();
  let day = currentDate.getDay();
  // console.log(week, day);
  //redux functions to get values from store and dispatch an action
  const todayMenu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  //useEffect for changing the menu when week changes
  useEffect(() => {
    if (week % 2 === 0) {
      dispatch(weekChange());
    }
  }, [week, dispatch]);

  // getting today menu from array of this week's menu
  const filteredMenu = todayMenu.filter((item) => {
    return item.day === day;
  });

  return (
    <>
      <Navbar />
      <TodayContainer
        breakfast={filteredMenu[0].Breakfast}
        lunch={filteredMenu[0].Lunch}
        dinner={filteredMenu[0].Dinner}
      />
      <TodayFooter />
    </>
  );
}
