import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Timer from "./timer";
import "../styles/sidebar.css"
import logo from "../images/logo.png";

function Sidebar() {
  const navigate = useNavigate();
  const handleLogOut = (id) => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="logo" style={{display:"flex", flexDirection: "column", cursor: "pointer"}} onClick={() => {navigate("/");}}>
        <p><img src={logo} width={50}/></p><p>StudyBuddy</p>
      </div>
      <nav>
        <ul style={{cursor: "pointer"}}>
          <li onClick={() => {navigate("/home")}}>
            <Link to="/home">Profile</Link>
          </li>
          <li onClick={() => {navigate("/start-match")}}>
            <Link to="/start-match">Start Matching</Link>
          </li>
          <li onClick={() => {navigate("/match")}}>
            <Link to="/match">Your Match</Link>
          </li>
          <li onClick={() => {navigate("/all-user")}}>
            <Link to="/all-user">Users</Link>
          </li>
          <li onClick={() => {navigate("/todo")}}>
            <Link to="/todo">Start Study</Link>
          </li>
          <li onClick={() => {navigate("/change-password")}}>
            <Link to="/change-password">Change Password</Link>
          </li>
          <li onClick={{handleLogOut}}>
            <Link to="/login" onClick={handleLogOut}>
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
      <div className="footer">
        <p>Next Match In:</p>
        <Timer />
      </div>
    </div>
  );
}

export default Sidebar;
