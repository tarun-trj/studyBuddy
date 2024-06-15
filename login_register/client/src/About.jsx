import React from "react";
import Timer from "./components/timer.jsx";
import "./styles/aboutstyle.css";

const App = () => {
  // Function to show the contact information pop-up
  const showContactInfo = () => {
    alert("Feel free to contact us at studybuddy@gmail.com");
  };

  return (
    <div className="about-page">
      {/* Top bar */}
      <div className="top-bar">
        <div className="contact-section">
          <button className="contact-btn" onClick={showContactInfo}>
            Contact Us
          </button>
        </div>
        <div className="login-register-section">
          <div className="nav-links">
            <a href="/login" className="nav-link">
              Login
            </a>
            <a href="/register" className="nav-link">
              Register
            </a>
          </div>
        </div>
        <Timer />
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="container">
          <h1 className="header">About Study Buddy Finder</h1>
          <div className="content">
            <p>
              Hello! Welcome to{" "}
              <span className="highlight">Study Buddy Finder</span>, a platform
              designed by students from IIT Guwahati. Our project combines
              innovative features like a todo list, solo study mode, and robust
              authorization tokens to ensure a secure and personalized study
              experience.
            </p>
            <p>
              Our mission is to connect IIT Guwahati students, fostering
              collaborative learning and support through peer interaction.
              Whether you're preparing for exams, working on complex projects,
              or seeking a motivational study group, Study Buddy Finder is here
              to help.
            </p>
            <p>
              Founded by{" "}
              <span className="highlight">
                Tarun Raj, Udbhav Gupta, and Tanush Reddy Kolagatla
              </span>
              , Study Buddy Finder has evolved into a vibrant community. Our
              platform allows you to connect with peers who share your academic
              interests and schedules.
            </p>
            <p>Trust the algorithm and join our community today! </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
