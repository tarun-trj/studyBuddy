import React from "react";
import Timer from "./components/timer.jsx";
import "./styles/aboutstyle.css";

const App = () => {
  // Function to show the contact information pop-up
  const showContactInfo = () => {
    alert("Feel free to contact us at studybuddy@gmail.com");
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav className="navbar">
        <div className="container">

          <a href="/login" className="nav-link">Login</a>
          <a href="/register" className="nav-link">Register</a>
          <button className="contact-btn" onClick={showContactInfo}>Contact Us</button>
          <a href="/developers" className="nav-link">Developers</a>
        </div>
        <Timer />
      </nav>

      {/* Main content */}
      <div className="container">
        <h1 className="header">About Study Buddy Finder</h1>
        <div className="content">
          <p>
            Hello! Welcome to <span className="highlight">Study Buddy Finder</span>, a platform dedicated to helping students like you find the perfect study partner for your academic journey.
          </p>
          <p>
            Our mission is to connect students from around the world to enhance collaborative learning and foster educational support through peer interaction. Whether you are preparing for exams, tackling complex projects, or simply seeking a motivational study group, you've come to the right place.
          </p>
          <p>
            Founded by [Your Name] in [Year], Study Buddy Finder has grown from a small idea into a thriving community of learners. Our platform allows you to connect with peers who have similar academic interests and schedules.
          </p>
          <p>
            Ready to join our community? Simply <a href="/login" className="link">log in</a> or <a href="/register" className="link">register</a> to start finding your study buddies today.
          </p>
          <p>
            <a href="/all-user" className="link">Show Everyone</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
