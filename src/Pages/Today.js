import { React, useEffect } from "react";
import Navbar from "../components/Navbar";
import TodayContainer from "../components/TodayContainer";
import Footer from "../components/Footer";
import AnnouncementPopup from "../components/AnnouncementPopup";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodayMenu, fetchWeeklyMenu } from "../redux/menu.js";
import Userback from "@userback/widget";

export default function Daily() {
  const dispatch = useDispatch();
  const { todayMenu, loading, error } = useSelector((state) => state.menu);

  // Initialize Userback feedback widget
  useEffect(() => {
    Userback("A-OnuXRblXLHIFp6PEPSwFMbm5M");
  }, []);

  // Fetch both menus on component mount (cache for later)
  useEffect(() => {
    dispatch(fetchTodayMenu());
    dispatch(fetchWeeklyMenu());
  }, [dispatch]);

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
            <p className="mt-3">Loading today's menu...</p>
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
              onClick={() => dispatch(fetchTodayMenu())}
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
        breakfast={todayMenu.meals.breakfast?.join(", ") || "No menu"}
        lunch={todayMenu.meals.lunch?.join(", ") || "No menu"}
        dinner={todayMenu.meals.dinner?.join(", ") || "No menu"}
      />
      <Footer />
    </>
  );
}
