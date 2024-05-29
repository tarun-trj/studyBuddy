import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [errors, setError] = useState('');
  const navigate = useNavigate();
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false); // New state for tracking submission success
  const [noInput, setNoInput] = useState(true);
  const location = useLocation();
  const user = location.state?.user;
  const [query, setQuery] = useState({
    query1: "",
    query2: "",
    query3: "",
    query4: "",
  });

  if (!user) {
    // Handle the case when user data is not available
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
  }, [errors]);  // This useEffect will run every time `errors` changes.

  const handleMatchSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');  // Retrieving the token
    const email = user.email;
    console.log(token);

    try {
      const response = await axios.post("http://127.0.0.1:3002/find", { email }, {
        headers: {
          "Authorization": `Bearer ${token}`,  // Include the token in the request header
          "Content-Type": "application/json"
        }
      });

      console.log(response);
      if (response.data.emailRes) {
        navigate("/match", {
          replace: true,
          state: { partner: response.data.emailRes }
        })
      } else {
          setError('No partner found for this email.');
      }
    } catch (err) {
        if (err.response) {
            console.log("Error Status:" + err.response.status);
            setError(err.response.data.message || 'Unknown error');
        } else {
            setError('Failed to fetch partner email. Please try again later.');
        }

        setSubmissionSuccessful(false);
        if(err.response.status === 414) {
          setSubmissionSuccessful(true);
        }
        
    }

  }

  const handleSubjectSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    console.log(token);
    if(!token) {
      console.log("no token found");
    }
    
    // Merge queries into an array, filtering out null or empty values
    const queries = [query.query1, query.query2, query.query3, query.query4].filter(
      (query) => query.trim() !== ""
    );
    
    console.log(queries);

    if (queries.length === 0) {
      setError("Please enter at least one query.");
      console.log("Submission blocked: No queries provided."); // Additional log for no input scenario
      setSubmissionSuccessful(false);
      return; // Exit the function if no queries are provided
    }

    // Reset error state before making the API call
    setError("");

    try {
      const response = await axios.post('http://127.0.0.1:3002/match', {subjects: queries, email: user.email}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setSubmissionSuccessful(true);
      //navigate('/match', { state: { employees: response.data} });
    } catch (error) {
      setSubmissionSuccessful(false);
      if (error.response) {
        // Client received an error response (5xx, 4xx)
        setError(
          `Failed to fetch: ${error.response.status} ${error.response.data.message}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Error:  " + error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1>Welcome, {user.name}!</h1>
      <div>
        <p>Email: {user.email}</p>
        <p>Email: {user.branch}</p>
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
      </div>
    </div>
  );
}

export default Home;
