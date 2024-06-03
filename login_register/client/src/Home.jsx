import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/sidebar.jsx";
import "./styles/styles.css";

function Home() {
  const item = sessionStorage.getItem("user");
  var user = JSON.parse(item);

  const [errors, setError] = useState("");
  const navigate = useNavigate();
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);
  const [query, setQuery] = useState({
    query1: "",
    query2: "",
    query3: "",
    query4: "",
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (errors) {
      console.log("Error logged:", errors);
    }
  }, [errors]);

  const handleTodoSubmit = () => {
    navigate("/todo");
  };

  const handleDisplaySubmit = () => {
    navigate("/all-user");
  };

  const handleMatchSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const email = user.email;
    console.log(token);

    try {
      const response = await axios.post(
        "http://127.0.0.1:3002/find",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response.data.emailRes) {
        navigate("/match", {
          replace: true,
          state: { partner: response.data.emailRes },
        });
      } else {
        setError("No partner found for this email.");
      }
    } catch (err) {
      if (err.response) {
        console.log("Error Status:" + err.response.status);
        setError(err.response.data.message || "Unknown error");
      } else {
        setError("Failed to fetch partner email. Please try again later.");
      }

      setSubmissionSuccessful(false);
      if (err.response.status === 414) {
        setSubmissionSuccessful(true);
      }
    }
  };

  const handleSubjectSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.log("no token found");
    }

    const queries = [
      query.query1,
      query.query2,
      query.query3,
      query.query4,
    ].filter((query) => query.trim() !== "");

    console.log(queries);

    if (queries.length === 0) {
      setError("Please enter at least one query.");
      console.log("Submission blocked: No queries provided.");
      setSubmissionSuccessful(false);
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:3002/match",
        { subjects: queries, email: user.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setSubmissionSuccessful(true);
    } catch (error) {
      setSubmissionSuccessful(false);
      if (error.response) {
        setError(
          `Failed to fetch: ${error.response.status} ${error.response.data.message}`
        );
      } else if (error.request) {
        setError("No response from the server");
      } else {
        setError("Error:  " + error.message);
      }
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome, {user.name}!</h1>
        <div>
          <p>Email: {user.email}</p>
          <p>Branch: {user.branch}</p>
          <input
            type="text"
            name="query1"
            value={query.query1}
            onChange={handleInput}
            placeholder="Enter your query"
          />
          <input
            type="text"
            name="query2"
            value={query.query2}
            onChange={handleInput}
            placeholder="Enter your query"
          />
          <input
            type="text"
            name="query3"
            value={query.query3}
            onChange={handleInput}
            placeholder="Enter your query"
          />
          <input
            type="text"
            name="query4"
            value={query.query4}
            onChange={handleInput}
            placeholder="Enter your query"
          />
          <button onClick={handleSubjectSubmit}>Submit Query</button>

          {submissionSuccessful && (
            <button onClick={handleMatchSubmit}>New Button</button>
          )}
          <button onClick={handleTodoSubmit}>myTodo</button>
          <button onClick={handleDisplaySubmit}>display users</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
