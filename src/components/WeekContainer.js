import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MealRatingModal from "./MealRatingModal";
import { submitMealRating, fetchWeeklyMenu } from "../redux/menu";
import { fetchMealComments } from "../redux/comments";
import "../css/WeekContainer.css";

const StarIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="13"
    height="13"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 2.75l2.86 5.8 6.4.93-4.63 4.51 1.09 6.37L12 17.34l-5.72 3.01 1.09-6.37-4.63-4.51 6.4-.93L12 2.75z"
      fill="currentColor"
    />
  </svg>
);

const ChevronIcon = () => (
  <svg
    className="day-chevron"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const DAY_LABELS = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const MEAL_TYPES = ["breakfast", "lunch", "dinner"];

const MEAL_LABELS = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

/** Serving times differ at weekends, matching the Today view. */
function getTimings(day) {
  const isWeekend = day === "saturday" || day === "sunday";
  return {
    breakfast: isWeekend ? "9:00 – 10:30 AM" : "7:30 – 9:30 AM",
    lunch: isWeekend ? "2:00 – 3:30 PM" : "1:00 – 3:30 PM",
    dinner: "7:30 – 9:30 PM",
  };
}

/** Monday of the week containing `date`. */
function getMondayOf(date = new Date()) {
  const monday = new Date(date);
  const weekday = date.getDay(); // 0 (Sunday) to 6 (Saturday)
  const diffToMonday = weekday === 0 ? -6 : 1 - weekday;
  monday.setDate(date.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/** One-line "what's on" summary for the collapsed state. */
function getDayPreview(dayMenu) {
  const parts = MEAL_TYPES.map((mealType) => {
    const items = dayMenu?.[mealType]?.items;
    return Array.isArray(items) && items.length > 0 ? items[0] : null;
  }).filter(Boolean);

  return parts.length > 0 ? parts.join(" · ") : "No menu set";
}

export default function WeekContainer({ weeklyMenu, weekNumber }) {
  const [isActive, setIsActive] = useState(false);
  // { day, mealType, tab } - which meal's dialog is open and which pane it shows
  const [showRatingModal, setShowRatingModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);

  // Dates for this calendar week, plus which row is today
  const { monday, weekRange, todayKey } = useMemo(() => {
    const now = new Date();
    const mondayDate = getMondayOf(now);
    const sunday = new Date(mondayDate);
    sunday.setDate(mondayDate.getDate() + 6);

    const options = { day: "numeric", month: "long" };
    return {
      monday: mondayDate,
      weekRange: `${mondayDate.toLocaleDateString(
        "en-GB",
        options
      )} to ${sunday.toLocaleDateString("en-GB", options)}`,
      todayKey: DAYS[now.getDay() === 0 ? 6 : now.getDay() - 1],
    };
  }, []);

  // Today starts open so the most relevant day needs no interaction
  const [expandedDays, setExpandedDays] = useState(() => [todayKey]);

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleDay = (day) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const allExpanded = expandedDays.length === DAYS.length;

  const toggleAll = () => {
    setExpandedDays(allExpanded ? [] : [...DAYS]);
  };

  const handleRateClick = (day, mealType) => {
    if (!user) {
      window.dispatchEvent(new Event("open-login-modal"));
      return;
    }
    setShowRatingModal({ day, mealType, tab: "rate" });
  };

  // Reviews are public - no sign-in needed to read them
  const handleReviewsClick = (day, mealType) => {
    setShowRatingModal({ day, mealType, tab: "reviews" });
  };

  const handleSubmitRating = async (mealId, rating, comment) => {
    setIsSubmitting(true);
    try {
      await dispatch(
        submitMealRating({
          mealId,
          rating,
          comment: comment || undefined,
        })
      ).unwrap();

      setShowRatingModal(null);
      setSuccessMessage(
        comment
          ? "Thanks! Your rating and review are now live."
          : "Rating submitted successfully!"
      );
      setShowSuccessModal(true);
      // Refresh weekly menu to show updated rating (skip cache for fresh data)
      dispatch(fetchWeeklyMenu(true));
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

  const renderMeal = (day, mealType, mealData, timing) => {
    const hasMenu = mealData && Array.isArray(mealData.items);
    const items =
      hasMenu && mealData.items.length > 0
        ? mealData.items.join(", ")
        : "No menu";
    const title =
      hasMenu && mealData.name && mealData.name.trim() ? mealData.name : null;
    const hasRating = hasMenu && typeof mealData.averageRating === "number";
    const userHasRated = hasMenu && mealData.userRating !== null;
    const commentCount = (hasMenu && mealData.commentCount) || 0;

    return (
      <div className="meal-block" key={mealType}>
        <div className="meal-block-head">
          <span className="meal-type">{MEAL_LABELS[mealType]}</span>
          <span className="meal-time">{timing}</span>
        </div>

        {title && <div className="meal-title-week">{title}</div>}
        <div className="meal-items-week">{items}</div>

        <div className="meal-rating-week">
          {hasRating ? (
            <>
              <StarIcon className="icon-inline" />
              <span className="meal-score">
                {mealData.averageRating.toFixed(1)}/10
              </span>
              <span className="meal-count">({mealData.ratingCount})</span>
            </>
          ) : (
            <span className="meal-count">No ratings yet</span>
          )}
          {userHasRated && (
            <span className="rated-note-week">
              You rated {mealData.userRating}/10
            </span>
          )}
        </div>

        {hasMenu && (
          <div className="meal-actions-week">
            <button
              className="rate-btn-sm"
              onClick={() => handleRateClick(day, mealType)}
            >
              {userHasRated ? "Edit rating" : "Rate"}
            </button>
            <button
              className="reviews-btn-sm"
              onClick={() => handleReviewsClick(day, mealType)}
            >
              {commentCount > 0 ? `Reviews (${commentCount})` : "Reviews"}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderDay = (day, index) => {
    const dayMenu = weeklyMenu?.[day];
    const isExpanded = expandedDays.includes(day);
    const isToday = day === todayKey;

    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const dateLabel = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

    const timings = getTimings(day);
    const panelId = `day-panel-${day}`;

    return (
      <div
        className={`day-card ${isExpanded ? "is-open" : ""} ${
          isToday ? "is-today" : ""
        }`}
        key={day}
      >
        <button
          type="button"
          className="day-header"
          onClick={() => toggleDay(day)}
          aria-expanded={isExpanded}
          aria-controls={panelId}
        >
          <div className="day-header-main">
            <div className="day-title-row">
              <span className="day-name">{DAY_LABELS[day]}</span>
              <span className="day-date">{dateLabel}</span>
              {isToday && <span className="day-today">Today</span>}
            </div>
            {/* Collapsed rows still show what's on, so the week stays scannable */}
            {!isExpanded && (
              <p className="day-preview">{getDayPreview(dayMenu)}</p>
            )}
          </div>

          <div className="day-header-side">
            <ChevronIcon />
          </div>
        </button>

        {isExpanded && (
          <div
            className="day-panel"
            id={panelId}
            role="region"
            aria-label={`${DAY_LABELS[day]} menu`}
          >
            {MEAL_TYPES.map((mealType) =>
              renderMeal(day, mealType, dayMenu?.[mealType], timings[mealType])
            )}
          </div>
        )}
      </div>
    );
  };

  const selectedMeal = showRatingModal
    ? weeklyMenu?.[showRatingModal.day]?.[showRatingModal.mealType]
    : null;

  return (
    <>
      <div id="weekContainer" className="container my-3">
        <div className="week-head">
          <div>
            <h3 className="week-range">{weekRange}</h3>
            {weekNumber && (
              <p className="week-sub">Week {weekNumber} menu rotation</p>
            )}
          </div>
          <button type="button" className="week-toggle-all" onClick={toggleAll}>
            {allExpanded ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <div className={`week-list ${isActive ? "active" : ""}`}>
          {DAYS.map((day, index) => renderDay(day, index))}
        </div>
      </div>

      {showRatingModal && selectedMeal && (
        <MealRatingModal
          mealName={`${DAY_LABELS[showRatingModal.day]} ${
            MEAL_LABELS[showRatingModal.mealType]
          }`}
          items={selectedMeal.items}
          mealId={selectedMeal.mealId}
          currentRating={selectedMeal.userRating}
          averageRating={selectedMeal.averageRating}
          ratingCount={selectedMeal.ratingCount}
          commentCount={selectedMeal.commentCount || 0}
          initialTab={showRatingModal.tab}
          canRate={Boolean(user)}
          onRequestLogin={() => {
            setShowRatingModal(null);
            window.dispatchEvent(new Event("open-login-modal"));
          }}
          onSubmit={handleSubmitRating}
          onClose={() => setShowRatingModal(null)}
          isSubmitting={isSubmitting}
        />
      )}

      {showSuccessModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thank you!</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowSuccessModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{successMessage}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
