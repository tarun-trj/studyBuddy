import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  // Todo component states and handlers
  const [subjects, setSubjects] = useState([]);
  const [input, setInput] = useState("");

  const handleAddsubject = () => {
    const trimmedInput = input.trim();
    if (trimmedInput !== "" && !subjects.includes(trimmedInput)) {
      setSubjects([...subjects, trimmedInput]);
      setInput("");
    }
  };

  const handleDeletesubject = (subject) => {
    setSubjects(subjects.filter(t => t !== subject));
  };

  const handleSaveSubjects = async () => {
    const email = user.email;
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://127.0.0.1:3002/save-subjects",
        { email, subjects: subjects },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSubmissionSuccessful(true);
      } else {
        setError("Failed to save subjects.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Unknown error");
      } else {
        setError("An error occurred while saving subjects.");
      }
    }
  };

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
        sessionStorage.setItem("partner", response.data.emailRes);
        navigate("/match");
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
    }
  };

  return (
    <div className="home-container">
      <Sidebar />

      {/* Component to add and remove subjects */}
      <div className="main-content">
        <h2>Subjects</h2>
        <input
          type="text"
          className="form-control mb-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter new subject"
        />
        <button onClick={handleAddsubject} className="btn btn-primary mb-3">
          Add Subject
        </button>

        <h3>Your Subjects</h3>
        <ul className="list-group">
          {subjects.map((subject, index) => (
            <li key={index} className="list-group-item">
              {subject}
              <button
                onClick={() => handleDeletesubject(subject)}
                className="btn btn-danger btn-sm float-end"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <button onClick={handleSaveSubjects} className="btn btn-success mt-3">
          Save Subjects
        </button>

        {/* Rest of Home Component */}
        <h1>Welcome {user.name}</h1>
        <form onSubmit={handleMatchSubmit}>
          <input
            type="text"
            name="query1"
            value={query.query1}
            onChange={handleInput}
          />
          <input
            type="text"
            name="query2"
            value={query.query2}
            onChange={handleInput}
          />
          <input
            type="text"
            name="query3"
            value={query.query3}
            onChange={handleInput}
          />
          <input
            type="text"
            name="query4"
            value={query.query4}
            onChange={handleInput}
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => { navigate("/all-user"); }}>Display Users</button>
        <button onClick={() => { navigate("/todo"); }}>Todo List</button>
        {errors && <p>{errors}</p>}
        {submissionSuccessful && <p>Subjects saved successfully!</p>}
      </div>
    </div>
  );
}

export default Home;
