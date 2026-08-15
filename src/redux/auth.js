/**
 * Authentication Redux Store
 * 
 * Handles user authentication state and Google Sign-In flow.
 * Integrates with backend API for token verification.
 * 
 * Features:
 * - Google Sign-In with Firebase
 * - Backend token verification
 * - User session management with localStorage
 * - Automatic session restoration on app load
 * 
 * API Endpoint:
 * - POST /api/user/auth/google - Verifies Firebase ID token
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from "../firebaseConfig";
import { getIdTokenSafely } from "../utils/firebaseAuth";
import config from "../config";

const API_BASE_URL = config.API_BASE_URL;

/**
 * Google Sign-In
 * Shows Google popup, gets Firebase token, and verifies with backend
 */
export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔐 Starting Google Sign-In...');
      
      // 1. Show Google Sign-In popup
      const provider = new GoogleAuthProvider();
      console.log('📱 Opening Google popup...');
      const result = await signInWithPopup(auth, provider);
      console.log('✅ Google popup successful, user:', result.user.email);
      
      // 2. Get Firebase ID token
      console.log('🎟️ Getting Firebase ID token...');
      const idToken = await result.user.getIdToken();
      console.log('✅ Got Firebase token (length):', idToken.length);
      
      // 3. Send token to backend for verification
      const backendUrl = `${API_BASE_URL}/api/user/auth/google`;
      console.log('🌐 Sending to backend:', backendUrl);
      console.log('📦 Request body:', { idToken: idToken.substring(0, 20) + '...' });
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken })
      });
      
      console.log('📬 Backend response status:', response.status);
      console.log('📬 Backend response ok:', response.ok);
      
      const responseText = await response.text();
      console.log('📄 Raw response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('✅ Parsed response:', data);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON:', parseError);
        console.error('Response was:', responseText);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok || !data.success) {
        console.error('❌ Backend authentication failed:', data);
        throw new Error(data.message || "Authentication failed");
      }
      
      // 4. Store user in localStorage for persistence
      console.log('💾 Storing user in localStorage:', data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      console.log('🎉 Sign-in complete!');
      return data.user;
    } catch (error) {
      console.error('❌ Sign-in error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      
      // Handle popup closed or other errors
      if (error.code === 'auth/popup-closed-by-user') {
        return rejectWithValue('Sign-in cancelled');
      }
      return rejectWithValue(error.message || 'Authentication failed');
    }
  }
);

/**
 * Sign Out
 * Clears user session from Firebase, localStorage, and Redux
 */
export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Restore Session
 * Checks localStorage for existing user session on app load
 */
export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
);

/**
 * Subscribe to Firebase as the source of truth for who is signed in.
 *
 * localStorage is only an optimistic cache: it makes the signed-in UI paint
 * immediately instead of flashing signed-out while Firebase reads its stored
 * session. But it never expires, whereas the Firebase session can be revoked or
 * evicted - mobile browsers clear IndexedDB fairly readily - and when the two
 * disagreed, the UI kept claiming the user was signed in while every
 * authenticated request failed.
 *
 * This listener settles that: Firebase decides, localStorage merely accelerates.
 *
 * Firebase emits the first callback only once persistence has been read, so a
 * null here means genuinely signed out rather than "not restored yet". It also
 * fires on sign-out in another tab and on token revocation, which the previous
 * localStorage-only approach could never notice.
 *
 * @returns the unsubscribe function, for cleanup on unmount
 */
export const watchAuthState = () => (dispatch, getState) => {
  return auth.onAuthStateChanged((firebaseUser) => {
    const storedUser = getState().auth?.user;

    if (!firebaseUser) {
      // Only act if we were claiming to be signed in, so this does not fight
      // the normal signed-out state on every page load
      if (storedUser) {
        dispatch(sessionExpired());
      }
      return;
    }

    // Same user we already have - leave it alone rather than overwriting the
    // richer object from sign-in (which carries the username)
    if (storedUser && storedUser.uid === firebaseUser.uid) {
      if (!storedUser.username) {
        dispatch(ensureUsername());
      }
      return;
    }

    // Signed in but Redux does not know, or knows a different account
    dispatch(
      authStateRestored({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        emailVerified: firebaseUser.emailVerified,
      })
    );
    dispatch(ensureUsername());
  });
};

/**
 * Ensure the signed-in user knows their public username.
 *
 * Fresh sign-ins get it straight from the auth response, but anyone whose
 * session was stored before usernames existed has a cached user object without
 * one. This fills that gap on load so they never have to sign out and back in.
 *
 * Firebase restores its auth state asynchronously, so this waits for the SDK to
 * settle before asking for a token rather than racing it.
 */
export const ensureUsername = createAsyncThunk(
  "auth/ensureUsername",
  async (_, { getState, rejectWithValue }) => {
    try {
      const existing = getState().auth?.user;
      if (!existing || existing.username) {
        // Nothing stored, or we already know it
        return null;
      }

      const idToken = await getIdTokenSafely();
      if (!idToken) return null;
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (!response.ok) return null;

      const data = await response.json();
      return data?.user?.username || null;
    } catch (error) {
      // Cosmetic only - the app works fine without it
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Firebase has no session even though one was cached locally.
     *
     * The stored user in localStorage never expires, but Firebase's own session
     * can be evicted - mobile browsers clear IndexedDB fairly aggressively. When
     * that happens the UI would otherwise keep claiming the user is signed in
     * while every authenticated request fails. Clearing it puts the two back in
     * agreement so the user is simply asked to sign in again.
     */
    sessionExpired: (state) => {
      state.user = null;
      state.error = null;
      try {
        localStorage.removeItem('user');
      } catch (_) { /* storage blocked - nothing useful to do */ }
    },
    /**
     * Firebase reported a signed-in user that Redux did not have - for example
     * after signing in on another tab, or when localStorage was cleared but the
     * Firebase session survived.
     */
    authStateRestored: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      try {
        localStorage.setItem('user', JSON.stringify(state.user));
      } catch (_) { /* storage blocked - the listener will restore it again */ }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signInWithGoogle
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle signOutUser
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle restoreSession
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // Backfill the username onto an older stored session
      .addCase(ensureUsername.fulfilled, (state, action) => {
        if (action.payload && state.user) {
          state.user = { ...state.user, username: action.payload };
          try {
            localStorage.setItem('user', JSON.stringify(state.user));
          } catch (_) { /* storage full or blocked - not worth failing over */ }
        }
      });
  },
});

export const { clearError, sessionExpired, authStateRestored } = authSlice.actions;
export const authReducer = authSlice.reducer;
