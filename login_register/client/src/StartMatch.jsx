import React, { useState } from "react";
import Sidebar from "./components/sidebar.jsx";
import "./styles/styles.css";

function Subjects() {
  const subjectsList = [
    "CS101",
    "CS102",
    "CS103",
    "CS104",
    "CS105",
    "CS106",
    "CS107",
    "CS108",
    "CS109",
  ];

  // Use state to track checked subjects
  const [checkedSubjects, setCheckedSubjects] = useState([]);

  // Handler to toggle subject check status
  const handleToggleSubject = (subject) => {
    const currentIndex = checkedSubjects.indexOf(subject);
    const newCheckedSubjects = [...checkedSubjects];
    console.log(newCheckedSubjects);

    if (currentIndex === -1) {
      newCheckedSubjects.push(subject); // Not currently checked, add to checked list
    } else {
      newCheckedSubjects.splice(currentIndex, 1); // Currently checked, remove from checked list
    }

    setCheckedSubjects(newCheckedSubjects);
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <h2>Subject List</h2>

        <h3>Subjects</h3>
        <ul className="list-group">
          {subjectsList.map((subject) => (
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

        <h3>Checked Subjects</h3>
        <ul className="list-group">
          {checkedSubjects.map((subject) => (
            <li key={subject} className="list-group-item">
              {subject}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Subjects;
