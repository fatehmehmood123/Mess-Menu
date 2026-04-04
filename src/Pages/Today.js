import { React, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import TodayContainer from "../components/TodayContainer";
import Footer from "../components/Footer";
import AnnouncementPopup from "../components/AnnouncementPopup";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodayMenu } from "../redux/menu.js";
import Userback from "@userback/widget";

export default function Daily() {
  const dispatch = useDispatch();
  const { todayMenu, todayLoading, todayError } = useSelector((state) => state.menu);

  // Initialize Userback feedback widget
  useEffect(() => {
    Userback("A-OnuXRblXLHIFp6PEPSwFMbm5M");
  }, []);

  // Memoized fetch function to prevent infinite loops
  const fetchMenu = useCallback(() => {
    dispatch(fetchTodayMenu());
  }, [dispatch]);

  // Fetch today's menu only if not already loaded
  useEffect(() => {
    if (!todayMenu && !todayLoading) {
      fetchMenu();
    }
  }, [todayMenu, todayLoading, fetchMenu]);

  // Handle loading state
  if (todayLoading) {
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
  if (todayError) {
    return (
      <>
        <AnnouncementPopup />
        <Navbar />
        <div className="container my-4">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error loading menu</h4>
            <p>{todayError}</p>
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
        meals={todayMenu.meals}
        weekNumber={todayMenu.weekNumber}
        day={todayMenu.day}
      />
      <Footer />
    </>
  );
}
