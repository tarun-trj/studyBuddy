import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    // Handle the case when user data is not available
    return <div>Loading...</div>;
  }

  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [query3, setQuery3] = useState("");
  const [query4, setQuery4] = useState(""); // State to hold the input value
  const handleInputChange1 = (e) => {
    setQuery1(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setQuery2(e.target.value);
  };
  const handleInputChange3 = (e) => {
    setQuery3(e.target.value);
  };
  const handleInputChange4 = (e) => {
    setQuery4(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Merge queries into an array, filtering out null or empty values
    const queries = [query1, query2, query3, query4].filter(
      (query) => query.trim() !== ""
    );

    if (queries.length === 0) {
      setError("Please enter at least one query.");
      return; // Exit the function if no queries are provided
    }

    // Reset error state before making the API call
    setError("");

    axios
      .post("http://127.0.0.1:3002/match", {
        subjects: queries,
        email: user.email,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/match", { state: { employees: response.data } });
      })
      .catch((err) => {
        if (err.response) {
          // Client received an error response (5xx, 4xx)
          setError(
            `Failed to fetch: ${err.response.status} ${err.response.data.message}`
          );
        } else if (err.request) {
          // The request was made but no response was received
          setError("No response from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Error: " + err.message);
        }
        console.log(err.config);
      });
  };

  return (
    <div className="container">
      <h1>Welcome, {user.name}!</h1>
      <div>
        <p>Email: {user.email}</p>
        <p>Email: {user.branch}</p>
        <input
          type="text"
          value={query1}
          onChange={handleInputChange1}
          placeholder="Enter your query"
        />

        <input
          type="text"
          value={query2}
          onChange={handleInputChange2}
          placeholder="Enter your query"
        />
        <input
          type="text"
          value={query3}
          onChange={handleInputChange3}
          placeholder="Enter your query"
        />
        <input
          type="text"
          value={query4}
          onChange={handleInputChange4}
          placeholder="Enter your query"
        />
        <button onClick={handleSubmit}>Submit Query</button>
      </div>
    </div>
  );
}

export default Home;
