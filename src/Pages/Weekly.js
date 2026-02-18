import React from "react";
import Navbar from "../components/Navbar";
import WeekContainer from "../components/WeekContainer";
import Footer from "../components/Footer";
import AnnouncementPopup from "../components/AnnouncementPopup";
import { useSelector } from "react-redux";

export default function Weekly() {
  const { weeklyMenu } = useSelector((state) => state.menu);

  // Handle no data state
  if (!weeklyMenu || !weeklyMenu.menu) {
    return (
      <>
        <AnnouncementPopup />
        <Navbar />
        <div className="container my-4">
          <div className="alert alert-info" role="alert">
            No weekly menu available.
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
      <WeekContainer
        weeklyMenu={weeklyMenu.menu}
        weekNumber={weeklyMenu.weekNumber}
      />
      <Footer />
    </>
  );
}
