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

    if (trimmedInput === "") {
        console.log("Input cannot be empty.");
        return;
    }

    if (subjects.includes(trimmedInput)) {
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
        <h1>Welcome {user.name}</h1>
        <h2>Subjects</h2>
        <ul className="list-group">
          {subjects.map((subject, index) => (
            <li key={index} className="list-group-item">
              {subject}
              <button
                onClick={() => handleDeleteSubject(subject)}
                className="btn btn-danger btn-sm float-end"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        
        <div>
        <input
          type="text"
          className="form-control mb-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter new subject"
        />
        <button onClick={handleAddSubject} className="btn btn-primary mb-3">
          Add Subject
        </button>
        </div>

        <button onClick={() => { navigate("/all-user"); }}>Display Users</button>
        <button onClick={() => { navigate("/todo"); }}>Todo List</button>
        {errors && <p>{errors}</p>}
      </div>
    </div>
  );
}

export default Home;
