/**
 * Comments Redux Store
 *
 * Loads the reviews (rating + comment) that other students have left on a meal.
 * State is keyed by mealId so several meals can be browsed in one session
 * without their pages overwriting each other.
 *
 * API Endpoints:
 * - GET  /api/ratings/meal/comments?mealId=&limit=&offset=
 * - POST /api/ratings/meal/comments/upvote
 *
 * Notes:
 * - Comments are public; the auth token is sent only when available so the
 *   backend can flag the signed-in user's own comment and upvotes.
 * - Comments arrive sorted by upvote count. Upvoting does NOT re-sort the list
 *   in place - a comment jumping under the cursor as you click it is disorienting.
 *   The new order appears the next time the list is loaded.
 * - No localStorage caching here: reviews are the one part of the page that
 *   users expect to be live right after they post.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebaseConfig";
import config from "../config";

const API_BASE_URL = config.API_BASE_URL;

export const COMMENTS_PAGE_SIZE = 8;

/**
 * Fetch a page of comments for a meal.
 * @param {string} mealId - Meal to load reviews for
 * @param {number} offset - Number of reviews to skip (0 for the first page)
 * @param {boolean} append - True when loading more onto an existing list
 */
export const fetchMealComments = createAsyncThunk(
  "comments/fetchMealComments",
  async ({ mealId, offset = 0, append = false }, { rejectWithValue }) => {
    try {
      const headers = { "Content-Type": "application/json" };

      // Optional: lets the backend mark which review belongs to this user
      if (auth.currentUser) {
        try {
          const idToken = await auth.currentUser.getIdToken();
          headers["Authorization"] = `Bearer ${idToken}`;
        } catch (authError) {
          // Reviews are public - carry on unauthenticated
        }
      }

      const params = new URLSearchParams({
        mealId,
        limit: String(COMMENTS_PAGE_SIZE),
        offset: String(offset),
      });

      const response = await fetch(
        `${API_BASE_URL}/api/ratings/meal/comments?${params.toString()}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error("Could not load reviews");
      }

      const data = await response.json();

      return {
        mealId,
        append,
        comments: data.comments || [],
        total: data.total || 0,
        hasMore: Boolean(data.hasMore),
        offset,
      };
    } catch (error) {
      return rejectWithValue({ mealId, message: error.message });
    }
  }
);

/**
 * Add or remove this user's upvote on a comment.
 *
 * The reducer applies the change immediately on `pending` and rolls it back if
 * the request fails, so the button responds instantly while the write finishes
 * in the background. The endpoint is idempotent, so a rapid toggle sequence
 * settles correctly regardless of the order responses come back in.
 */
export const upvoteComment = createAsyncThunk(
  "comments/upvoteComment",
  async ({ mealId, commentId, upvote }, { rejectWithValue }) => {
    try {
      if (!auth.currentUser) {
        throw new Error("Sign in to upvote");
      }

      const idToken = await auth.currentUser.getIdToken();

      const response = await fetch(
        `${API_BASE_URL}/api/ratings/meal/comments/upvote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ mealId, commentId, upvote }),
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || "Could not save your upvote");
      }

      const data = await response.json();
      return {
        mealId,
        commentId,
        upvotes: data.upvotes,
        hasUpvoted: data.hasUpvoted,
      };
    } catch (error) {
      return rejectWithValue({ mealId, commentId, upvote, message: error.message });
    }
  }
);

const emptyThread = {
  items: [],
  total: 0,
  hasMore: false,
  loading: false,
  loadingMore: false,
  error: null,
};

/**
 * Update one comment in a thread in place.
 * Position is deliberately preserved - re-sorting on every vote would make the
 * row you just clicked jump away from the cursor.
 */
function applyUpvote(state, mealId, commentId, update) {
  const thread = state.byMeal[mealId];
  if (!thread) return;

  const index = thread.items.findIndex((item) => item.id === commentId);
  if (index === -1) return;

  thread.items[index] = update(thread.items[index]);
}

const commentsSlice = createSlice({
  name: "comments",
  // byMeal: { [mealId]: { items, total, hasMore, loading, loadingMore, error } }
  initialState: {
    byMeal: {},
  },
  reducers: {
    // Drop a meal's cached thread so the next open refetches from scratch
    invalidateMealComments: (state, action) => {
      delete state.byMeal[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealComments.pending, (state, action) => {
        const { mealId, append } = action.meta.arg;
        const thread = state.byMeal[mealId] || { ...emptyThread };
        state.byMeal[mealId] = {
          ...thread,
          loading: append ? thread.loading : true,
          loadingMore: Boolean(append),
          error: null,
        };
      })
      .addCase(fetchMealComments.fulfilled, (state, action) => {
        const { mealId, append, comments, total, hasMore } = action.payload;
        const existing = state.byMeal[mealId]?.items || [];
        state.byMeal[mealId] = {
          items: append ? [...existing, ...comments] : comments,
          total,
          hasMore,
          loading: false,
          loadingMore: false,
          error: null,
        };
      })
      .addCase(fetchMealComments.rejected, (state, action) => {
        const mealId = action.payload?.mealId || action.meta.arg.mealId;
        const thread = state.byMeal[mealId] || { ...emptyThread };
        state.byMeal[mealId] = {
          ...thread,
          loading: false,
          loadingMore: false,
          error: action.payload?.message || "Could not load reviews",
        };
      })
      // Optimistic: reflect the vote before the request finishes
      .addCase(upvoteComment.pending, (state, action) => {
        const { mealId, commentId, upvote } = action.meta.arg;
        applyUpvote(state, mealId, commentId, (comment) => ({
          ...comment,
          hasUpvoted: upvote,
          upvotes: Math.max(0, comment.upvotes + (upvote ? 1 : -1)),
        }));
      })
      // Settle on the server's authoritative count
      .addCase(upvoteComment.fulfilled, (state, action) => {
        const { mealId, commentId, upvotes, hasUpvoted } = action.payload;
        applyUpvote(state, mealId, commentId, (comment) => ({
          ...comment,
          upvotes,
          hasUpvoted,
        }));
      })
      // Roll the optimistic change back
      .addCase(upvoteComment.rejected, (state, action) => {
        const { mealId, commentId, upvote } = action.payload || action.meta.arg;
        applyUpvote(state, mealId, commentId, (comment) => ({
          ...comment,
          hasUpvoted: !upvote,
          upvotes: Math.max(0, comment.upvotes + (upvote ? -1 : 1)),
        }));
      });
  },
});

export const { invalidateMealComments } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;

// Selector helper - always returns a usable thread shape
export const selectMealThread = (state, mealId) =>
  state.comments.byMeal[mealId] || emptyThread;
