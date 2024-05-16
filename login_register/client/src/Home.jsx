import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function Home() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    // Handle the case when user data is not available
    return <div>Loading...</div>;
  }

  const [query, setQuery] = useState(''); // State to hold the input value
  const handleInputChange = (e) => {
      setQuery(e.target.value); // Updates the state with the user's input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');  // Clear any existing errors when a new submission is made
  
    axios.post('http://127.0.0.1:3002/match', { branch: query })
      .then(response => {
        console.log(response.data);
        navigate('/match', { state: { employees: response.data } });
      })
      .catch(err => {
        if (err.response) {
          // Client received an error response (5xx, 4xx)
          setError(`Failed to fetch: ${err.response.status} ${err.response.data.message}`);
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
                value={query} 
                onChange={handleInputChange} 
                placeholder="Enter your query"
        />
        <button onClick={handleSubmit}>Submit Query</button>
      </div>
    </div>
  );
}

export default Home;
