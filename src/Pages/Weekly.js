import React, { useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import WeekContainer from "../components/WeekContainer";
import Footer from "../components/Footer";
import AnnouncementPopup from "../components/AnnouncementPopup";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeeklyMenu } from "../redux/menu.js";
import Userback from "@userback/widget";

export default function Weekly() {
  const dispatch = useDispatch();
  const { weeklyMenu, weeklyLoading, weeklyError } = useSelector((state) => state.menu);

  // Initialize Userback feedback widget
  useEffect(() => {
    Userback("A-OnuXRblXLHIFp6PEPSwFMbm5M");
  }, []);

  // Memoized fetch function to prevent infinite loops
  const fetchMenu = useCallback(() => {
    dispatch(fetchWeeklyMenu());
  }, [dispatch]);

  // Fetch weekly menu only if not already loaded
  useEffect(() => {
    if (!weeklyMenu && !weeklyLoading) {
      fetchMenu();
    }
  }, [weeklyMenu, weeklyLoading, fetchMenu]);

  // Handle loading state
  if (weeklyLoading) {
    return (
      <>
        <AnnouncementPopup />
        <Navbar />
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div className="text-center">
            <div className="spinner-border" role="status" style={{ color: "#9bb158", width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading weekly menu...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Handle error state
  if (weeklyError) {
    return (
      <>
        <AnnouncementPopup />
        <Navbar />
        <div className="container my-4">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error loading menu</h4>
            <p>{weeklyError}</p>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(fetchWeeklyMenu())}
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
