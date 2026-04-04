// filepath: /E:/MessMenu/src/components/WeekContainer.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MealRatingModal from "./MealRatingModal";
import { submitMealRating, fetchWeeklyMenu } from "../redux/menu";
import "../css/WeekContainer.css";

export default function WeekContainer({ weeklyMenu, weekNumber }) {
  const [isActive, setIsActive] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);

  function getWeekRange(date = new Date()) {
    // Clone the input date to avoid mutation
    const inputDate = new Date(date);
    
    // Calculate the Monday of the week
    const monday = new Date(inputDate);
    const day = inputDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = day === 0 ? -6 : 1 - day; // Adjust to get Monday
    monday.setDate(inputDate.getDate() + diffToMonday);
    
    // Calculate the Sunday of the week (6 days after Monday)
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
  
    // Format dates (e.g., "February 24, 2025")
    const options = {  day: 'numeric',month: 'long'};
    const formattedMonday = monday.toLocaleDateString('en-UK', options);
    const formattedSunday = sunday.toLocaleDateString('en-UK', options);
  
    return `${formattedMonday} to ${formattedSunday}`;
  }

  useEffect(() => {
    // Simulate loading the data or triggering the animation
    setTimeout(() => {
      setIsActive(true);
    }, 100); // Adjust the delay as needed
  }, []);

  const handleRateClick = (day, mealType) => {
    if (!user) {
      window.dispatchEvent(new Event('open-login-modal'));
      return;
    }
    setShowRatingModal({ day, mealType });
  };

  const handleSubmitRating = async (mealId, rating, comment) => {
    setIsSubmitting(true);
    try {
      await dispatch(submitMealRating({
        mealId,
        rating,
        comment: comment || undefined,
      })).unwrap();
      
      setShowRatingModal(null);
      setSuccessMessage('Rating submitted successfully!');
      setShowSuccessModal(true);
      // Refresh weekly menu to show updated rating (skip cache for fresh data)
      dispatch(fetchWeeklyMenu(true));
    } catch (error) {
      alert('Failed to submit rating: ' + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderMealCell = (day, mealType, mealData) => {
    // V2 API returns MealWithRating structure
    if (!mealData || !Array.isArray(mealData.items)) {
      return <td>-</td>;
    }

    const itemNames = mealData.items.length ? mealData.items.join(', ') : 'No menu';
    const title = mealData.name && mealData.name.trim() ? mealData.name : null;
    const aggregateRating = typeof mealData.averageRating === 'number' 
      ? `⭐ ${mealData.averageRating.toFixed(1)}/10`
      : 'No ratings';
    const userHasRated = mealData.userRating !== null;

    return (
      <td>
        <div className="meal-cell">
          {title && <div className="meal-title-week">{title}</div>}
          <div className="meal-items-week">{itemNames}</div>
          <div className="meal-rating-week">
            {aggregateRating}
            {userHasRated && <span className="user-rated-badge-sm">✓</span>}
          </div>
          <button 
            className="rate-btn-sm"
            onClick={() => handleRateClick(day, mealType)}
          >
            {user ? '⭐ Rate' : '🔒'}
          </button>
        </div>
      </td>
    );
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <>
      <div id="weekContainer" className="container  my-3">
        <h3 style={{ textAlign: "center" }}>{getWeekRange()}</h3>

        <div
          className={`table-container ${
            isActive ? "active" : ""
          } overflow-x-scroll`}
        >
          <table  className=" container my-4 table table-hover shadow p-3 mb-5 bg-body-tertiary rounded">
            <tbody>
              <tr className="table-active">
                <th>Day</th>
                <th>Breakfast </th>
                <th>Lunch </th>
                <th>Dinner </th>
              </tr>
              {days.map((day, index) => (
                <tr key={day}>
                  <td>{dayLabels[index]}</td>
                  {renderMealCell(day, 'breakfast', weeklyMenu?.[day]?.breakfast)}
                  {renderMealCell(day, 'lunch', weeklyMenu?.[day]?.lunch)}
                  {renderMealCell(day, 'dinner', weeklyMenu?.[day]?.dinner)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showRatingModal && weeklyMenu && weeklyMenu[showRatingModal.day] && weeklyMenu[showRatingModal.day][showRatingModal.mealType] && (
        <MealRatingModal
          mealName={`${showRatingModal.day} ${showRatingModal.mealType}`}
          items={weeklyMenu[showRatingModal.day][showRatingModal.mealType].items}
          mealId={weeklyMenu[showRatingModal.day][showRatingModal.mealType].mealId}
          currentRating={weeklyMenu[showRatingModal.day][showRatingModal.mealType].userRating}
          onSubmit={handleSubmitRating}
          onClose={() => setShowRatingModal(null)}
          isSubmitting={isSubmitting}
        />
      )}

      {showSuccessModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thank you!</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowSuccessModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>{successMessage}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setShowSuccessModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
