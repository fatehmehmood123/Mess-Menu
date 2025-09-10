import React from "react";
import styled from "styled-components";

const FooterDiv = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`;

function Footer() {
  return (
    <footer className="fixed-bottom page-footer font-small">
      <FooterDiv className="footer-copyright text-center py-3">
        © 2023 Copyright: Muhammad Fateh Mehmood
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
      </FooterDiv>
    </footer>
  );
}

export default Footer;
