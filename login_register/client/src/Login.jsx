import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./styles/loginstyles.css"; // Import login styles

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:3002/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("login response", response.data);

      if (response.status === 200) {
        const { token, user } = response.data;
        // Assuming response.data contains a token and user information
        storeTokenInSS(token);
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data.message);
      } else {
        console.error("Network error:", error.message);
      }
      console.error("Login error", error);
    }
  };

  const storeTokenInSS = (token) => {
    sessionStorage.setItem("token", token);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
            />
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <button type="submit" className="btn btn-success">
            Login
          </button>
          <p>Don't have an account?</p>
          <Link to="/register" className="btn btn-light border">
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
