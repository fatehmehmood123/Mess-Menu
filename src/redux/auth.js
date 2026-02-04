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
      });
  },
});

export const { clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
