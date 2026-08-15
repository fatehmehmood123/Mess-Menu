import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MealRatingModal from "./MealRatingModal";
import { submitMealRating, fetchTodayMenu } from "../redux/menu";
import { fetchMealComments } from "../redux/comments";
import "../css/todayContainer.css";

const StarIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="14"
    height="14"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 2.75l2.86 5.8 6.4.93-4.63 4.51 1.09 6.37L12 17.34l-5.72 3.01 1.09-6.37-4.63-4.51 6.4-.93L12 2.75z"
      fill="currentColor"
    />
  </svg>
);

export default function TodayContainer({ meals, weekNumber, day }) {
  const [isActive, setIsActive] = useState(false);
  // { mealType, tab } - which meal's dialog is open and which pane it shows
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
    setShowRatingModal({ mealType, tab: 'rate' });
  };

  // Reviews are public - no sign-in needed to read them
  const handleReviewsClick = (mealType) => {
    setShowRatingModal({ mealType, tab: 'reviews' });
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
      setSuccessMessage(
        comment
          ? 'Thanks! Your rating and review are now live.'
          : 'Rating submitted successfully!'
      );
      setShowSuccessModal(true);
      // Refresh today's menu to show updated rating (skip cache for fresh data)
      dispatch(fetchTodayMenu(true));
      // Pull the review list again so the new comment appears immediately
      dispatch(fetchMealComments({ mealId, offset: 0, append: false }));
    } catch (error) {
      // Thunks reject with a user-facing message; an expired session has
      // already opened the sign-in modal by this point
      alert(String(error));
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
    const hasRating = typeof mealData.averageRating === 'number';
    const aggregateRating = hasRating ? `${mealData.averageRating.toFixed(1)}/10` : 'No ratings yet';
    const totalRatings = mealData.ratingCount > 0 
      ? `(${mealData.ratingCount})`
      : '';
    const userHasRated = mealData.userRating !== null;
    const commentCount = mealData.commentCount || 0;

    return (
      <tr key={mealType}>
        <td>{timing}</td>
        <td>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</td>
        <td>
          <div className="meal-info">
            {title && <div className="meal-title">{title}</div>}
            <div className="meal-items">{itemNames}</div>
            <div className="meal-rating">
              {hasRating && <StarIcon className="icon-inline" />}
              <span>{aggregateRating}</span>
              {totalRatings && <span>{totalRatings}</span>}
              {userHasRated && <span className="rated-note">Your rating: {mealData.userRating}/10</span>}
            </div>
            <div className="meal-actions">
              <button
                className="rate-btn"
                onClick={() => handleRateClick(mealType)}
              >
                {userHasRated ? 'Edit rating' : 'Rate'}
              </button>
              <button
                className="reviews-btn"
                onClick={() => handleReviewsClick(mealType)}
              >
                {commentCount > 0
                  ? `Reviews (${commentCount})`
                  : 'Reviews'}
              </button>
            </div>
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
                <th scope="col">Menu</th>
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

      {showRatingModal && meals && meals[showRatingModal.mealType] && (
        <MealRatingModal
          mealName={
            meals[showRatingModal.mealType].name ||
            `${day} ${showRatingModal.mealType}`
          }
          items={meals[showRatingModal.mealType].items}
          mealId={meals[showRatingModal.mealType].mealId}
          currentRating={meals[showRatingModal.mealType].userRating}
          averageRating={meals[showRatingModal.mealType].averageRating}
          ratingCount={meals[showRatingModal.mealType].ratingCount}
          commentCount={meals[showRatingModal.mealType].commentCount || 0}
          initialTab={showRatingModal.tab}
          canRate={Boolean(user)}
          onRequestLogin={() => {
            setShowRatingModal(null);
            window.dispatchEvent(new Event('open-login-modal'));
          }}
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
