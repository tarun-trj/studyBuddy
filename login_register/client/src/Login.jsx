import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
      const response = await axios.post('http://127.0.0.1:3002/login', user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("login response", response.data);

      if (response.status === 200) {
        toast.success("Login successful");
        // Assuming response.data contains a token and user information
        storeTokenInLS(response.data.token);
        navigate("/home", {
          replace: true,
          state: { user: response.data.user }
        });
      } else {
        toast.error(
          response.data.extraDetails || response.data.message || "Invalid credentials"
        );
      }
    } catch (error) {
      if (error.response) {
        // Handle responses from the server (e.g., validation errors)
        toast.error(error.response.data.message || "An error occurred");
      } else {
        // Handle other errors (e.g., network error)
        toast.error("Network error, please try again");
      }
      console.error("Login error", error);
    }
  };

  const storeTokenInLS = (token) => {
    localStorage.setItem('authToken', token);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              name="password"
              className="form-control"
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
          <p className="mt-3">Don't have an account?</p>
          <Link to="/register" className="btn btn-light border w-100">
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
