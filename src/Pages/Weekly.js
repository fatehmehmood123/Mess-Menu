import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import WeekContainer from "../components/WeekContainer";
import Footer from "../components/Footer";
import AnnouncementPopup from "../components/AnnouncementPopup";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeeklyMenu } from "../redux/menu.js";
import Userback from "@userback/widget";

export default function Weekly() {
  const dispatch = useDispatch();
  const { weeklyMenu, loading, error } = useSelector((state) => state.menu);

  // Initialize Userback feedback widget
  useEffect(() => {
    Userback("A-OnuXRblXLHIFp6PEPSwFMbm5M");
  }, []);

  // Fetch weekly menu on component mount
  useEffect(() => {
    dispatch(fetchWeeklyMenu());
  }, [dispatch]);

  // Helper function to get menu items as string
  const getMenuString = (day, mealType) => {
    if (!weeklyMenu || !weeklyMenu.menu || !weeklyMenu.menu[day]) {
      return "No menu";
    }
    const items = weeklyMenu.menu[day][mealType];
    return Array.isArray(items) ? items.join(", ") : "No menu";
  };

  // Handle loading state
  if (loading) {
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
  if (error) {
    return (
      <>
        <AnnouncementPopup />
        <Navbar />
        <div className="container my-4">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error loading menu</h4>
            <p>{error}</p>
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
        monBreakfast={getMenuString("monday", "breakfast")}
        monLunch={getMenuString("monday", "lunch")}
        monDinner={getMenuString("monday", "dinner")}
        tueBreakfast={getMenuString("tuesday", "breakfast")}
        tueLunch={getMenuString("tuesday", "lunch")}
        tueDinner={getMenuString("tuesday", "dinner")}
        wedBreakfast={getMenuString("wednesday", "breakfast")}
        wedLunch={getMenuString("wednesday", "lunch")}
        wedDinner={getMenuString("wednesday", "dinner")}
        thursBreakfast={getMenuString("thursday", "breakfast")}
        thursLunch={getMenuString("thursday", "lunch")}
        thursDinner={getMenuString("thursday", "dinner")}
        friBreakfast={getMenuString("friday", "breakfast")}
        friLunch={getMenuString("friday", "lunch")}
        friDinner={getMenuString("friday", "dinner")}
        satBreakfast={getMenuString("saturday", "breakfast")}
        satLunch={getMenuString("saturday", "lunch")}
        satDinner={getMenuString("saturday", "dinner")}
        sunBreakfast={getMenuString("sunday", "breakfast")}
        sunLunch={getMenuString("sunday", "lunch")}
        sunDinner={getMenuString("sunday", "dinner")}
      />
      <Footer />
    </>
  );
}
