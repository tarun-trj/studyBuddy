import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Profile</Link>
          </li>
          <li>
            <Link to="/start-match">Start Matching</Link>
          </li>
          <li>
            <Link to="/match">Your Match</Link>
          </li>
          <li>
            <Link to="/all-user">Users</Link>
          </li>
          <li>
            <Link to="/todo">Start Study</Link>
          </li>
        </ul>
      </nav>
      <div className="footer">
        <p>00:30</p>
        <p>Time remaining</p>
      </div>
    </div>
  );
}

export default Sidebar;
