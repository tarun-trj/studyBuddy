import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Timer from "./timer";


function Sidebar() {
  const navigate = useNavigate();
  const handleLogOut = (id) => {
    sessionStorage.clear();
    navigate("/login");
  };
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
          <li>
            <Link to ="/login" onClick={handleLogOut}>Log Out</Link>
          </li>
        </ul>
      </nav>
      <div className="footer">
        <p><Timer /></p>
      </div>
    </div>
  );
}

export default Sidebar;
