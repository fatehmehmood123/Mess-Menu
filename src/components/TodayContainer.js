import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MealRatingModal from "./MealRatingModal";
import { submitMealRating, fetchTodayMenu } from "../redux/menu";
import "../css/todayContainer.css";

export default function TodayContainer({ meals, weekNumber, day }) {
  const [isActive, setIsActive] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const currentDate = new Date();
  const currentFormattedDate = currentDate.toLocaleDateString('en-US', options);
  const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday

  // Determine if it's weekend (Saturday or Sunday)
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Define timings based on weekday or weekend
  const timings = {
    breakfast: isWeekend ? (
      <>9:00 AM -<br />10:30 AM</>
    ) : (
      <>7:30 AM -<br />9:30 AM</>
    ),
    lunch: isWeekend ? (
      <>2:00 PM -<br />3:30 PM</>
    ) : (
      <>1:00 PM -<br />3:30 PM</>
    ),
    dinner: (
      <>7:30 PM -<br />9:30 PM</>
    )
  };

  useEffect(() => {
    // Simulate loading the data or triggering the animation
    setTimeout(() => {
      setIsActive(true);
    }, 100); // Adjust the delay as needed
  }, []);

  const handleRateClick = (mealType) => {
    if (!user) {
      window.dispatchEvent(new Event('open-login-modal'));
      return;
    }
    setShowRatingModal(mealType);
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
      // Refresh today's menu to show updated rating (skip cache for fresh data)
      dispatch(fetchTodayMenu(true));
    } catch (error) {
      alert('Failed to submit rating: ' + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderMealRow = (mealType, timing, mealData) => {
    // V2 API returns MealWithRating structure
    if (!mealData || !Array.isArray(mealData.items)) {
      return null;
    }

    const itemNames = mealData.items.length ? mealData.items.join(', ') : 'No menu';
    const title = mealData.name && mealData.name.trim() ? mealData.name : null;
    const aggregateRating = typeof mealData.averageRating === 'number' 
      ? `⭐ ${mealData.averageRating.toFixed(1)}/10`
      : 'No ratings yet';
    const totalRatings = mealData.ratingCount > 0 
      ? `(${mealData.ratingCount})`
      : '';
    const userHasRated = mealData.userRating !== null;
    
    return (
      <tr key={mealType}>
        <td>{timing}</td>
        <td>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</td>
        <td>
          <div className="meal-info">
            {title && <div className="meal-title">{title}</div>}
            <div className="meal-items">{itemNames}</div>
            <div className="meal-rating">
              {aggregateRating} {totalRatings}
              {userHasRated && (
                <span className="user-rated-badge">
                  ✓ You rated: {mealData.userRating}/10
                </span>
              )}
            </div>
            <button 
              className="rate-btn"
              onClick={() => handleRateClick(mealType)}
            >
              {user ? (userHasRated ? 'Edit Rating' : 'Rate Meal') : '🔒 Sign in to rate'}
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="container my-4">
        <h3 style={{ textAlign: "center" }}>{currentFormattedDate}</h3>
        <div className={`table-container ${isActive ? "active" : ""}`}>
          <table
            className="container my-4 table table-hover shadow p-3 mb-5 bg-body-tertiary rounded"
            id="mainContainer"
          >
            <thead>
              <tr className="table-active">
                <th scope="col">Timings</th>
                <th scope="col">Meals</th>
                <th scope="col">Menu & Rating</th>
              </tr>
            </thead>
            <tbody>
              {meals && meals.breakfast && renderMealRow('breakfast', timings.breakfast, meals.breakfast)}
              {meals && meals.lunch && renderMealRow('lunch', timings.lunch, meals.lunch)}
              {meals && meals.dinner && renderMealRow('dinner', timings.dinner, meals.dinner)}
            </tbody>
          </table>
        </div>
      </div>

      {showRatingModal && meals && meals[showRatingModal] && (
        <MealRatingModal
          mealName={meals[showRatingModal].name || `${day} ${showRatingModal}`}
          items={meals[showRatingModal].items}
          mealId={meals[showRatingModal].mealId}
          currentRating={meals[showRatingModal].userRating}
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
