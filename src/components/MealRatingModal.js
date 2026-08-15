import React, { useCallback, useEffect, useRef, useState } from "react";
import MealComments from "./MealComments";
import "../css/mealModal.css";

const MAX_COMMENT_LENGTH = 500;

// Wording shown next to the selected score
const SCORE_LABELS = {
  1: "Terrible",
  2: "Bad",
  3: "Poor",
  4: "Below average",
  5: "Average",
  6: "Fair",
  7: "Good",
  8: "Very good",
  9: "Excellent",
  10: "Outstanding",
};

/**
 * Meal rating + reviews dialog.
 *
 * Two panes behind one segmented control: "Rate" holds the submission form,
 * "Reviews" lists what everyone else wrote. Reviews are readable without an
 * account; rating requires sign-in.
 *
 * @param {string} mealName - Display name for the meal (e.g., "Monday Breakfast")
 * @param {string[]} items - Food items in the meal
 * @param {string} mealId - Meal ID to submit a rating for
 * @param {number|null} currentRating - User's existing rating (1-10)
 * @param {number|null} averageRating - Aggregate rating for the summary
 * @param {number} ratingCount - Number of ratings received
 * @param {number} commentCount - Number of written reviews (for the tab badge)
 * @param {"rate"|"reviews"} initialTab - Pane to open on
 * @param {boolean} canRate - False when nobody is signed in
 * @param {function} onRequestLogin - Called when a signed-out user wants to rate
 * @param {function} onSubmit - (mealId, rating, comment) => void
 * @param {function} onClose - Close the dialog
 * @param {boolean} isSubmitting - Submission in flight
 */
export default function MealRatingModal({
  mealName,
  items = [],
  mealId,
  currentRating,
  averageRating = null,
  ratingCount = 0,
  commentCount = 0,
  initialTab = "rate",
  canRate = true,
  onRequestLogin,
  onSubmit,
  onClose,
  isSubmitting,
}) {
  const [tab, setTab] = useState(initialTab);
  const [rating, setRating] = useState(currentRating || 0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [validationError, setValidationError] = useState("");

  const panelRef = useRef(null);

  // Close on Escape, and lock background scrolling while open
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, isSubmitting]);

  // Move focus into the dialog when it opens
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget && !isSubmitting) {
        onClose();
      }
    },
    [onClose, isSubmitting]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rating === 0) {
      setValidationError("Select a score from 1 to 10 before submitting.");
      return;
    }
    setValidationError("");
    onSubmit(mealId, rating, comment.trim());
  };

  const activeScore = hoveredRating || rating;
  const hasRatedBefore = typeof currentRating === "number" && currentRating > 0;

  return (
    <div
      className="meal-modal-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="meal-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="meal-modal-title"
        tabIndex={-1}
        ref={panelRef}
      >
        <header className="meal-modal-header">
          <div className="meal-modal-heading">
            <p className="meal-modal-eyebrow">Meal feedback</p>
            <h2 className="meal-modal-title" id="meal-modal-title">
              {mealName}
            </h2>
          </div>
          <button
            type="button"
            className="meal-modal-close"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {items.length > 0 && (
          <div className="meal-modal-items">
            {items.map((item, index) => (
              <span className="meal-chip" key={`${item}-${index}`}>
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="meal-tabs" role="tablist" aria-label="Meal feedback sections">
          <button
            type="button"
            role="tab"
            id="tab-rate"
            aria-selected={tab === "rate"}
            aria-controls="panel-rate"
            className={`meal-tab ${tab === "rate" ? "is-active" : ""}`}
            onClick={() => setTab("rate")}
          >
            {hasRatedBefore ? "Your rating" : "Rate"}
          </button>
          <button
            type="button"
            role="tab"
            id="tab-reviews"
            aria-selected={tab === "reviews"}
            aria-controls="panel-reviews"
            className={`meal-tab ${tab === "reviews" ? "is-active" : ""}`}
            onClick={() => setTab("reviews")}
          >
            Reviews
            {commentCount > 0 && (
              <span className="meal-tab-count">{commentCount}</span>
            )}
          </button>
        </div>

        <div className="meal-modal-body">
          {tab === "rate" ? (
            <div role="tabpanel" id="panel-rate" aria-labelledby="tab-rate">
              {canRate ? (
                <form onSubmit={handleSubmit} className="rate-form">
                  <fieldset className="rate-field">
                    <legend className="rate-label">
                      How would you rate this meal?
                    </legend>

                    <div
                      className="score-scale"
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      {Array.from({ length: 10 }, (_, index) => index + 1).map(
                        (score) => (
                          <button
                            type="button"
                            key={score}
                            className={`score-btn ${
                              score <= activeScore ? "is-filled" : ""
                            } ${score === rating ? "is-selected" : ""}`}
                            onClick={() => {
                              setRating(score);
                              setValidationError("");
                            }}
                            onMouseEnter={() => setHoveredRating(score)}
                            onFocus={() => setHoveredRating(score)}
                            onBlur={() => setHoveredRating(0)}
                            disabled={isSubmitting}
                            aria-pressed={score === rating}
                            aria-label={`${score} out of 10`}
                          >
                            {score}
                          </button>
                        )
                      )}
                    </div>

                    <div className="score-readout">
                      {activeScore > 0 ? (
                        <>
                          <strong>{activeScore}/10</strong>
                          <span className="score-word">
                            {SCORE_LABELS[activeScore]}
                          </span>
                        </>
                      ) : (
                        <span className="score-hint">
                          Pick a score from 1 (terrible) to 10 (outstanding)
                        </span>
                      )}
                    </div>
                  </fieldset>

                  <div className="rate-field">
                    <label className="rate-label" htmlFor="mealComment">
                      Add a review <span className="rate-optional">(optional)</span>
                    </label>
                    <textarea
                      id="mealComment"
                      className="rate-textarea"
                      rows="4"
                      maxLength={MAX_COMMENT_LENGTH}
                      placeholder="What was good? What could be better? Your review is shown publicly with your name."
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      disabled={isSubmitting}
                    />
                    <div className="rate-meta">
                      <span className="rate-hint">
                        Visible to everyone using the menu.
                      </span>
                      <span
                        className={`rate-counter ${
                          comment.length > MAX_COMMENT_LENGTH - 50
                            ? "is-near-limit"
                            : ""
                        }`}
                      >
                        {comment.length}/{MAX_COMMENT_LENGTH}
                      </span>
                    </div>
                  </div>

                  {validationError && (
                    <p className="rate-error" role="alert">
                      {validationError}
                    </p>
                  )}
                </form>
              ) : (
                <div className="rate-signin">
                  <p className="rate-signin-title">Sign in to rate this meal</p>
                  <p className="rate-signin-text">
                    You can read every review without an account, but rating
                    needs one so each person counts once.
                  </p>
                  <button
                    type="button"
                    className="btn-primary-olive"
                    onClick={onRequestLogin}
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div role="tabpanel" id="panel-reviews" aria-labelledby="tab-reviews">
              <MealComments
                mealId={mealId}
                averageRating={averageRating}
                ratingCount={ratingCount}
              />
            </div>
          )}
        </div>

        {tab === "rate" && canRate && (
          <footer className="meal-modal-footer">
            <button
              type="button"
              className="btn-ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-primary-olive"
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting
                ? "Submitting…"
                : hasRatedBefore
                ? "Update rating"
                : "Submit rating"}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
