import React from "react";
import { useNavigate } from "react-router-dom";
import Timer from "./timer";
import "../styles/sidebar.css";
import logo from "../images/logo.png";

function Sidebar() {
  const navigate = useNavigate();
  
  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="logo" style={{display: "flex", flexDirection: "column", cursor: "pointer"}} onClick={() => {navigate("/");}}>
        <p><img src={logo} width={50} alt="Logo" /></p><p>StudyBuddy</p>
      </div>
      <nav>
        <ul style={{cursor: "pointer"}}>
          <li onClick={() => {navigate("/home");}}>Profile</li>
          <li onClick={() => {navigate("/start-match");}}>Start Matching</li>
          <li onClick={() => {navigate("/match");}}>Your Match</li>
          <li onClick={() => {navigate("/all-user");}}>Users</li>
          <li onClick={() => {navigate("/todo");}}>Start Study</li>
          <li onClick={() => {navigate("/change-password");}}>Change Password</li>
          <li onClick={handleLogOut}>Log Out</li>
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
