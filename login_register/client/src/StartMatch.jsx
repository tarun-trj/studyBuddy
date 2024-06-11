import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar.jsx";
import "./styles/styles.css";
import axios from 'axios';

function Subjects() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [errors, setError] = useState("");
  const [subjects, setSubjects] = useState([]);
  
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

  // Use state to track checked subjects
  const [checkedSubjects, setCheckedSubjects] = useState([]);

  // Handler to toggle subject check status
  const handleToggleSubject = (subject) => {
    const currentIndex = checkedSubjects.indexOf(subject);
    const newCheckedSubjects = [...checkedSubjects];

    if (currentIndex === -1) {
      newCheckedSubjects.push(subject); // Not currently checked, add to checked list
    } else {
      newCheckedSubjects.splice(currentIndex, 1); // Currently checked, remove from checked list
    }

    setCheckedSubjects(newCheckedSubjects);
  };

  // const handleMatchSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = sessionStorage.getItem("token");
  //   const email = user.email;
  //   console.log(token);

  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:3002/find",
  //       { email },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log(response);
  //     if (response.data.emailRes) {
  //       sessionStorage.setItem("partner", response.data.emailRes);
  //       navigate("/match");
  //     } else {
  //       setError("No partner found for this email.");
  //     }
  //   } catch (err) {
  //     if (err.response) {
  //       console.log("Error Status:" + err.response.status);
  //       setError(err.response.data.message || "Unknown error");
  //     } else {
  //       setError("Failed to fetch partner email. Please try again later.");
  //     }
  //   }
  // };

  const handleMatchSubmit = async (e) => {
    e.preventDefault();
    const email = user.email;
    
    try {
      const response = await axios.post("http://127.0.0.1:3002/match", {
          email,
          subjects: checkedSubjects
      }, {
          headers: {
              'Content-Type': 'application/json',
          }
      });

      console.log(response);
      if(response.data.message !== "OK") {
        console.log("Error in function??")
      }

      console.log(response.data);
    } catch (error) {
      console.log("Error message" + error);
    }
  }

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <h2>Subject List</h2>

        <h3>Subjects</h3>
        <ul className="list-group">
          {subjects.map((subject) => (
            <li key={subject} className="list-group-item">
              <input
                type="checkbox"
                checked={checkedSubjects.includes(subject)}
                onChange={() => handleToggleSubject(subject)}
                className="me-2"
              />
              {subject}
            </li>
          ))}
        </ul>
      <button onClick={handleMatchSubmit}>Enter Matching</button>
      </div>

    </div>
  );
}

export default Subjects;
