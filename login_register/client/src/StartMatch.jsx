import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar.jsx";
import "./styles/styles.css";
import axios from 'axios';

function Subjects() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [errors, setError] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [valid, setValid] = useState(false);

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

  const [checkedSubjects, setCheckedSubjects] = useState([]);

  const handleToggleSubject = (subject) => {
    const currentIndex = checkedSubjects.indexOf(subject);
    const newCheckedSubjects = [...checkedSubjects];

    if (currentIndex === -1) {
      newCheckedSubjects.push(subject);
    } else {
      newCheckedSubjects.splice(currentIndex, 1);
    }

    setCheckedSubjects(newCheckedSubjects);
  };

  const handleMatchSubmit = async (e) => {
    e.preventDefault();
    const email = user.email;
    
    try {
      if (checkedSubjects.length < 1) {
        setValid(true);
        return;
      }
      const response = await axios.post("http://127.0.0.1:3002/match", {
          email,
          subjects: checkedSubjects
      }, {
          headers: {
              'Content-Type': 'application/json',
          }
      });

      console.log(response);
      if (response.data.message !== "OK") {
        console.log("Error in function??")
      }

      console.log(response.data);
      setValid(false);

    } catch (error) {
      console.log("Error message" + error);
    }
  }

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <h2 className = "welcome">Subjects:</h2>
        <ul className="list-group">
          {subjects.map((subject) => (
            <li key={subject} className="list-group-item">
              <span className="subject-text">{subject}</span>
              <input
                type="checkbox"
                checked={checkedSubjects.includes(subject)}
                onChange={() => handleToggleSubject(subject)}
                className="subject-checkbox"
              />
            </li>
          ))}
        </ul>
        <div className="button-container">
          <button onClick={handleMatchSubmit} className="btn btn-primary">Start Matching</button>
          {valid && <p style={{ color: 'red', marginTop: '10px' }}>Select at least one subject</p>}
        </div>
      </div>
    </div>
  );
}

export default Subjects;
