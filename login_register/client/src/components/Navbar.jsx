import React from "react";
import Timer from "./timer.jsx";
import "../styles/nav-style.css"; // Import the CSS file
import logo from "../images/logo.png";

const Navbar = () => {
  // Function to show the contact information pop-up
  const showContactInfo = () => {
    // Function implementation to show contact info goes here
    console.log("Contact information displayed");
  };

  const styles = {
    match: {
      fontSize: "1.2em",
      fontFamily: "Lato",
      margin: "8px 8px",
    },
  };

  return (
    <div className="navbar">
      <div className="sec">
        <div className="logo"><img src={logo} width={50}/><p>StudyBuddy</p></div>
        <div className="links">
          <div className="nav-links">
            <a href="/login" className="nav-link">
              Login
            </a>
            <a href="/register" className="nav-link">
              Register
            </a>
            <a href="" className="nav-link" onClick={showContactInfo}>
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <div className="navtime">
        <div style={styles.match}>Next Match</div>
        <Timer />
      </div>
    </div>
  );
};

export default Navbar;
