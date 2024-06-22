import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Oval } from 'react-loader-spinner';
import "./styles/loginstyles.css"; // Import login styles
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoadingComponent from './components/loadingComponent.jsx';

function Login() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: state?.username || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:3002/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("login response", response.data);

      if (response.status === 200) {
        const { token, user } = response.data;
        storeTokenInSS(token);
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      console.error("Login error", error);
    } finally {
      setLoading(false);
    }
  };

  const storeTokenInSS = (token) => {
    sessionStorage.setItem("token", token);
  };

  return (
    <main>
    <div className="image-container">
    <div className="image">
    <div className={`form ${loading ? 'form-slide-out' : ''}`}>
      {!loading ? (
        <div className="actual-form">
          <h2 className="form-heading">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="email">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div className="password">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                name="password"
                value={user.password}
                onChange={handleInput}
              />
            </div>

            <button className="submit" type="submit">
              {loading ? (
                <Oval color="#fff" height={20} width={20} />
              ) : (
                <i className="fas fa-arrow-right" style={{fontSize: '20px' }} />
              )}
            </button>
            <p className="small">Don't have an account?</p>
            
            <div className="register">
            <Link to="/register">
              Sign Up
            </Link>
            </div>
            <Link to="/forgot-password" className="forgot">Forgot Password?</Link>
          </form>
        </div>
      ) : (
        <LoadingComponent size={50} />
      )}
    </div>
    </div>
    </div>
    </main>
  );
}

export default Login;
