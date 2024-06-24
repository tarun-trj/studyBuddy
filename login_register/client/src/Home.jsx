import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/sidebar.jsx";
import "./styles/styles.css";

function Home() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [errors, setError] = useState("");
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  // Todo component states and handlers
  const [subjects, setSubjects] = useState([]);
  const [input, setInput] = useState("");

  const handleAddSubject = async () => {
    const email = user.email;
    const trimmedInput = input.trim();
    const regex = /^[A-Z]{2}\d{3}$/;

    if (trimmedInput === "") {
        setError("Input cannot be empty.");
        console.log("Input cannot be empty.");
        return;
    }

    if(!regex.test(trimmedInput)) {
      setError("Please follow format ABXXX, eg CS101");
      return;
    }

    if (subjects.includes(trimmedInput)) {
        setError("Subject already exists.");
        console.log("Subject already exists.");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:3002/user-subject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, subject: trimmedInput }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        setSubjects([...subjects, trimmedInput]);
        setInput("");
        setError("");
    } catch (error) {
        console.log("Error: " + error.message);
    }
  };

  const handleDeleteSubject = async (subject) => {
    const email = user.email;

    try {
      const response = await fetch('http://127.0.0.1:3002/user-subject', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, subject}),
      });

      setSubjects(subjects.filter(t => t !== subject));
    } catch (error) {
      console.log("Error: " + error);
    }
  };


  useEffect(() => {
    if (errors) {
      console.log("Error logged:", errors);
    }
  }, [errors]);

  useEffect(() => {
    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3002/user-subject', {
                headers: {
                    'User-Email': user.email,
                },
            });

            setError("");
            setSubjects(response.data.subjects);
        } catch (error) {
            console.error("Error fetching subjects:", error);
            setError("Failed to fetch subjects. Please try again later.");
        }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="home-container">
      <Sidebar />
      
      {/* Component to add and remove subjects */}
      <div className="main-content">
        <h1 className = "welcome">Welcome, {user.name}!</h1>
        <h3 className = "writeup">Subjects:</h3>
        <div className="writeup">
          <p className="writeup">Enter the subjects you wish to plan for here.</p>
          <p className="writeup">To join matching go to start matching page and plan your study session!</p>
        </div>
        <div className="subjects">        
        <div className="add-subject">
          <input
            type="text"
            className="add-subject"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter new subject e.g. CS101"
          />
          <button onClick={handleAddSubject} className="add-subject">
            Add Subject
          </button>
        </div>

        <p style={{color: "red"}}>{errors}</p>
        <ul className="list-group">
          {subjects.map((subject, index) => (
            <li key={index} className="list-group-item">
              {subject}
              <button
                onClick={() => handleDeleteSubject(subject)}
                >
                  <span>&#10005;</span>
                </button>
            </li>
          ))}
        </ul>
        </div>
        
      </div>
    </div>
  );
}

export default Home;
