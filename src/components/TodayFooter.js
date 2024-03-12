import React from "react";
function TodayFooter() {
  return (
    <>
      <footer className="fixed-bottom page-footer font-small">
        <div className="footer-copyright text-center py-3">
          © 2024 Copyright: Muhammad Fateh Mehmood
          <a  
            id="footerLink"
            rel="noreferrer"
            target="_blank"
            href="https://github.com/fatehmehmood123/Mess-Menu"
          >
            {" "}
            Github
          </a>
          <a
            id="footerLink"
            rel="noreferrer"
            target="_blank"
            href="mailto:fatehmehmood123@gmail.com"
          >
            {" "}
            Contact Us
          </a>
        </div>
      </footer>
    </>
  );
}
export default TodayFooter;
