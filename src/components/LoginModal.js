/**
 * Login Modal Component
 * 
 * Modal dialog for Google Sign-In authentication.
 * Follows the same design pattern as AnnouncementPopup.
 * Uses green theme (#9bb158) consistent with the app.
 */

import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogle, clearError } from "../redux/auth";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
  padding: 10px;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const PopupContainer = styled.div`
  background-color: #ffffff;
  border: 2px solid #535151;
  padding: 40px 30px;
  max-width: 450px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease-out;
  position: relative;
  border-radius: 8px;

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 35px 25px;
    width: 92%;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
    width: 95%;
    border-width: 1px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 28px;
  color: #535151;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    width: 25px;
    height: 25px;
    top: 10px;
    right: 10px;
  }
`;

const PopupHeader = styled.h2`
  color: #535151;
  margin: 0 0 15px 0;
  font-size: 26px;
  text-align: center;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const PopupMessage = styled.p`
  color: #535151;
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 30px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  background-color: #ffffff;
  color: #535151;
  border: 2px solid #dadce0;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.2s;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  &:hover:not(:disabled) {
    background-color: #f8f9fa;
    border-color: #9bb158;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    background-color: #f1f3f4;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 10px 20px;
  }
`;

const GoogleIcon = styled.svg`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const ErrorMessage = styled.div`
  background-color: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
  border: 1px solid #fcc;

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 10px;
  }
`;

const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #9bb158;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function LoginModal({ onClose }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleGoogleSignIn = async () => {
    const result = await dispatch(signInWithGoogle());
    if (signInWithGoogle.fulfilled.match(result)) {
      onClose();
    }
  };

  const handleClose = () => {
    dispatch(clearError());
    onClose();
  };

  return (
    <PopupOverlay onClick={handleClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose} aria-label="Close">
          &times;
        </CloseButton>
        
        <PopupHeader>Sign In</PopupHeader>
        
        <PopupMessage>
          Sign in with your Google account to access personalized features and save your preferences.
        </PopupMessage>

        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}

        <GoogleButton 
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner />
              Signing in...
            </>
          ) : (
            <>
              <GoogleIcon viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </GoogleIcon>
              Sign in with Google
            </>
          )}
        </GoogleButton>
      </PopupContainer>
    </PopupOverlay>
  );
}
