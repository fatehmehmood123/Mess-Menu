import React, { useState } from "react";
import "../css/todayContainer.css";

/**
 * V2 Meal Rating Modal - Single rating for entire meal
 * @param {string} mealName - Display name for the meal (e.g., "Monday Breakfast")
 * @param {string[]} items - Array of food item names in the meal
 * @param {string} mealId - The meal ID to submit rating for
 * @param {number} currentRating - User's existing rating (1-10) or null
 * @param {function} onSubmit - Callback function (rating, comment) => void
 * @param {function} onClose - Callback to close modal
 * @param {boolean} isSubmitting - Loading state
 */
export default function MealRatingModal({
  mealName,
  items,
  mealId,
  currentRating,
  onSubmit,
  onClose,
  isSubmitting,
}) {
  const [rating, setRating] = useState(currentRating || 0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    onSubmit(mealId, rating, comment);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      const isFilled = i <= (hoveredRating || rating);
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? "filled" : ""}`}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        >
          {isFilled ? "⭐" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Rate: {mealName}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={isSubmitting}
            ></button>
          </div>
          <div className="modal-body">
            {/* Display meal items */}
            <div className="mb-3">
              <strong>Items in this meal:</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {items.map((item, index) => (
                  <span
                    key={index}
                    className="badge bg-secondary"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <hr />

            {/* Single rating for entire meal */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  <strong>How would you rate this meal?</strong> (1-10)
                </label>
                <div className="d-flex justify-content-center mb-2">
                  {renderStars()}
                </div>
                <div className="text-center">
                  <small className="text-muted">
                    {rating > 0 ? `Rating: ${rating}/10` : "Click to rate"}
                  </small>
                </div>
              </div>

              {/* Optional comment */}
              <div className="mb-3">
                <label htmlFor="mealComment" className="form-label">
                  Comment (optional)
                </label>
                <textarea
                  id="mealComment"
                  className="form-control"
                  rows="3"
                  placeholder="Share your feedback about this meal..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={isSubmitting}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : (
                "Submit Rating"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
