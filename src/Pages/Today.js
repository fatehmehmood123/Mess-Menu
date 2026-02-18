import React from "react";
import Navbar from "../components/Navbar";
import TodayContainer from "../components/TodayContainer";
import Footer from "../components/Footer";
import AnnouncementPopup from "../components/AnnouncementPopup";
import { useSelector } from "react-redux";

export default function Daily() {
  const { todayMenu } = useSelector((state) => state.menu);

  // Handle no data state
  if (!todayMenu || !todayMenu.meals) {
    return (
      <>
        <AnnouncementPopup />
        <Navbar />
        <div className="container my-4">
          <div className="alert alert-info" role="alert">
            No menu available for today.
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnnouncementPopup />
      <Navbar />
      <TodayContainer
        meals={todayMenu.meals}
        weekNumber={todayMenu.weekNumber}
        day={todayMenu.day}
      />
      <Footer />
    </>
  );
}
