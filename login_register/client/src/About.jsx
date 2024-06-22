import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import "./styles/aboutstyle.css";

const About = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="full">
    <div className="about-page">
      <Navbar />
      <div className="content-container">
        <div className="content">
          <div className="banner">
            <p>Connecting Minds,</p>
            <p>Empowering Success</p>
          </div>
          <div className="starter-text">
            <p>
              Welcome to Study Buddy Finder, crafted by IIT Guwahati students.
              Uniting innovation with a todo list, solo study mode, and robust
              security, it offers a personalized study experience.
            </p>
            <p>
              Our mission? To foster collaborative learning among IIT Guwahati
              students. Whether acing exams, tackling projects, or finding
              motivation, Study Buddy Finder connects you with like-minded
              peers.
            </p>
            <p>
              Founded by Tarun Raj, Udbhav Gupta, and Tanush Reddy Kolagatla,
              it's your gateway to a vibrant academic community. Join today and
              let the algorithm guide your success!
            </p>
          </div>
        </div>
        <div className="interact">
          <div className="starter-form-header">Join Now!</div>
          <div className="starter-form">
            <input
              type="email"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter email"
            />

            <div className="starter-submit">
                <div className="starter-register" onClick={() => {
                    navigate("/register", { username: username });
                }}>
                <i className="fas fa-arrow-right" />
              </div>
              <p>Have an account?</p>
              <div className="starter-login">
                <Link
                  to="/login"
                  state={{ username: username }}
                  className="starter-login"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
