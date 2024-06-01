import React, { useState } from "react";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <div className="nav-container">
        <ul className="nav-links">
          <li>
            <a href="/home">Profile</a>
          </li>
          <li>
            <a href="#match">Start Matching</a>
          </li>
          <li>
            <a href="/match">Your Match</a>
          </li>
          <li>
            <a href="/all-user">Users</a>
          </li>
          <li>
            <a href="/todo">Start Study</a>
          </li>
        </ul>
      </div>
      <div className="timer-container">
        <div className="timer">
          <h2>00:30</h2>
          <p>Time remaining</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
