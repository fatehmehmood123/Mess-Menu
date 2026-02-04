import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession, signOutUser } from "../redux/auth";
import LoginModal from "./LoginModal";
import logo from "../images/android-chrome-192x192.png";
import "../css/navbar.css";

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Restore session on mount
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  // Allow other components to trigger the login modal (e.g., rating buttons)
  useEffect(() => {
    const openLogin = () => setShowLoginModal(true);
    window.addEventListener('open-login-modal', openLogin);
    return () => window.removeEventListener('open-login-modal', openLogin);
  }, []);

  const handleSignOut = () => {
    dispatch(signOutUser());
    setShowDropdown(false);
  };

  const getFirstName = (displayName) => {
    if (!displayName) return "User";
    return displayName.split(" ")[0];
  };

  return (
    <>
      <nav className="nav navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/">
            <img src={logo} alt="logo" height="70px" width="70px" />
          </Link>
          <Link className="navbar-brand" to="/">
            Nust Mess Menu
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active hover-underline-animation"
                  aria-current="page"
                  to="/daily"
                >
                  Today
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active hover-underline-animation"
                  aria-current="page"
                  to="/weekly"
                >
                  This Week
                </Link>
              </li>
            </ul>
            
            {/* Login/User section */}
            <div className="auth-section">
              {user ? (
                <div className="user-menu">
                  <button 
                    className="user-button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    aria-label="User menu"
                  >
                    {user.photoURL && (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || "User"} 
                        className="user-avatar"
                      />
                    )}
                    <span className="user-name">{getFirstName(user.displayName)}</span>
                    <svg 
                      className="dropdown-arrow" 
                      width="12" 
                      height="12" 
                      viewBox="0 0 12 12"
                    >
                      <path 
                        d="M2 4l4 4 4-4" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  
                  {showDropdown && (
                    <>
                      <div 
                        className="dropdown-overlay" 
                        onClick={() => setShowDropdown(false)}
                      />
                      <div className="dropdown-menu-custom">
                        <div className="dropdown-user-info">
                          <div className="dropdown-user-name">{user.displayName}</div>
                          <div className="dropdown-user-email">{user.email}</div>
                        </div>
                        <button 
                          className="dropdown-item-custom"
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button 
                  className="login-button"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}
