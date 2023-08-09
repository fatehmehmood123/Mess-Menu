import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/android-chrome-192x192.png";
import "../css/navbar.css";
export default function Navbar() {
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
          </div>
        </div>
      </nav>
    </>
  );
}
