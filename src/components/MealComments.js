import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMealComments,
  upvoteComment,
  selectMealThread,
  COMMENTS_PAGE_SIZE,
} from "../redux/comments";
import { getAvatarForId, ANONYMOUS_NAME } from "../utils/avatars";
import "../css/comments.css";

/**
 * Reviews list for a single meal.
 *
 * Shows the rating summary followed by every comment students have left,
 * newest first, with the signed-in user's own review pinned to the top.
 *
 * Authors appear under a generated username ("silentHarbor") with a stock
 * avatar. The API sends no real name, email or photo at all, so there is
 * nothing identifying to render even by accident.
 *
 * Reviews arrive sorted by upvote count, so the most useful feedback leads.
 *
 * @param {string} mealId - Meal to load reviews for
 * @param {number|null} averageRating - Aggregate rating (1-10) from the menu payload
 * @param {number} ratingCount - How many people rated the meal
 */
export default function MealComments({ mealId, averageRating, ratingCount = 0 }) {
  const dispatch = useDispatch();
  const thread = useSelector((state) => selectMealThread(state, mealId));
  const user = useSelector((state) => state.auth?.user);
  const { items, total, hasMore, loading, loadingMore, error } = thread;

  // Load the first page when the meal changes
  useEffect(() => {
    if (mealId) {
      dispatch(fetchMealComments({ mealId, offset: 0, append: false }));
    }
  }, [dispatch, mealId]);

  const handleLoadMore = () => {
    dispatch(
      fetchMealComments({ mealId, offset: items.length, append: true })
    );
  };

  const handleRetry = () => {
    dispatch(fetchMealComments({ mealId, offset: 0, append: false }));
  };

  const handleUpvote = (commentId, upvote) => {
    if (!user) {
      window.dispatchEvent(new Event("open-login-modal"));
      return;
    }
    // Fire and forget - the reducer has already updated the button
    dispatch(upvoteComment({ mealId, commentId, upvote }));
  };

  return (
    <div className="reviews">
      <ReviewSummary
        averageRating={averageRating}
        ratingCount={ratingCount}
        commentCount={total}
      />

      {loading && <ReviewSkeletonList />}

      {!loading && error && (
        <div className="reviews-state reviews-state--error" role="alert">
          <p className="reviews-state-title">{error}</p>
          <button type="button" className="reviews-retry" onClick={handleRetry}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="reviews-state">
          <p className="reviews-state-title">No reviews yet</p>
          <p className="reviews-state-text">
            Be the first to tell others what this meal was like.
          </p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <>
          <ul className="reviews-list">
            {items.map((comment) => (
              <ReviewItem
                key={comment.id}
                comment={comment}
                onUpvote={handleUpvote}
              />
            ))}
          </ul>

          {hasMore && (
            <button
              type="button"
              className="reviews-more"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore
                ? "Loading…"
                : `Show ${Math.min(COMMENTS_PAGE_SIZE, total - items.length)} more`}
            </button>
          )}
        </>
      )}
    </div>
  );
}

/* ---------- Summary ---------- */

function ReviewSummary({ averageRating, ratingCount, commentCount }) {
  const hasRating = typeof averageRating === "number" && averageRating > 0;
  const score = hasRating ? averageRating.toFixed(1) : "—";

  return (
    <div className="reviews-summary">
      <div className="reviews-score">
        <span className="reviews-score-value">{score}</span>
        <span className="reviews-score-scale">/10</span>
      </div>
      <div className="reviews-summary-detail">
        <RatingMeter value={hasRating ? averageRating : 0} />
        <p className="reviews-summary-meta">
          {ratingCount > 0
            ? `${ratingCount} ${ratingCount === 1 ? "rating" : "ratings"}`
            : "No ratings yet"}
          {commentCount > 0 && (
            <>
              <span className="reviews-dot" aria-hidden="true">
                ·
              </span>
              {`${commentCount} written ${
                commentCount === 1 ? "review" : "reviews"
              }`}
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/** Slim 10-step meter - matches the app's 1-10 rating scale. */
function RatingMeter({ value }) {
  const pct = Math.max(0, Math.min(100, (value / 10) * 100));
  return (
    <div
      className="rating-meter"
      role="img"
      aria-label={`Average ${value.toFixed(1)} out of 10`}
    >
      <div className="rating-meter-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ---------- Single review ---------- */

function ReviewItem({ comment, onUpvote }) {
  const [expanded, setExpanded] = useState(false);
  // Long bodies are clamped so the list stays scannable
  const isLong = comment.comment.length > 220;
  const upvotes = comment.upvotes || 0;
  const author = comment.author || ANONYMOUS_NAME;

  return (
    <li className="review">
      <img
        className="review-avatar"
        src={getAvatarForId(author)}
        alt=""
        loading="lazy"
      />

      <div className="review-body">
        <div className="review-head">
          <span className="review-name">{author}</span>
          {comment.isOwn && <span className="review-you">You</span>}
          <span className="review-rating">{comment.rating}/10</span>
          <time className="review-time" dateTime={comment.updatedAt}>
            {formatRelativeTime(comment.updatedAt)}
          </time>
        </div>

        <p className={`review-text ${isLong && !expanded ? "is-clamped" : ""}`}>
          {comment.comment}
        </p>

        {isLong && (
          <button
            type="button"
            className="review-toggle"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}

        <div className="review-foot">
          {/* Upvoting your own review would just be self-promotion */}
          {comment.isOwn ? (
            upvotes > 0 && (
              <span className="review-upvote-static">
                <UpvoteIcon />
                <span>{upvotes}</span>
              </span>
            )
          ) : (
            <button
              type="button"
              className={`review-upvote ${comment.hasUpvoted ? "is-active" : ""}`}
              onClick={() => onUpvote(comment.id, !comment.hasUpvoted)}
              aria-pressed={Boolean(comment.hasUpvoted)}
              aria-label={
                comment.hasUpvoted
                  ? `Remove your upvote, ${upvotes} so far`
                  : `Upvote this review, ${upvotes} so far`
              }
            >
              <UpvoteIcon />
              <span className="review-upvote-count">{upvotes > 0 ? upvotes : ""}</span>
              <span className="review-upvote-label">Helpful</span>
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

const UpvoteIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="13"
    height="13"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M8 2.75l5 5.5H10.2v5H5.8v-5H3l5-5.5z"
      fill="currentColor"
    />
  </svg>
);

/* ---------- Loading placeholders ---------- */

function ReviewSkeletonList() {
  return (
    <ul className="reviews-list" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <li className="review" key={i}>
          <span className="review-avatar skeleton-block" />
          <div className="review-body">
            <span className="skeleton-line skeleton-line--short" />
            <span className="skeleton-line" />
            <span className="skeleton-line skeleton-line--mid" />
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Helpers ---------- */

const RELATIVE_UNITS = [
  ["year", 365 * 24 * 60 * 60 * 1000],
  ["month", 30 * 24 * 60 * 60 * 1000],
  ["week", 7 * 24 * 60 * 60 * 1000],
  ["day", 24 * 60 * 60 * 1000],
  ["hour", 60 * 60 * 1000],
  ["minute", 60 * 1000],
];

/** "3 days ago" style timestamps, with a plain-date fallback for old browsers. */
function formatRelativeTime(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";

  const diff = date.getTime() - Date.now();
  const absDiff = Math.abs(diff);

  if (absDiff < 60 * 1000) return "just now";

  for (const [unit, ms] of RELATIVE_UNITS) {
    if (absDiff >= ms) {
      const value = Math.round(diff / ms);
      if (typeof Intl !== "undefined" && Intl.RelativeTimeFormat) {
        return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
          value,
          unit
        );
      }
      return date.toLocaleDateString();
    }
  }

  return date.toLocaleDateString();
}
