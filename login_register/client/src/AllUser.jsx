import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./components/sidebar.jsx";
import "./styles/styles.css"; // Make sure this path is correct

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3002/AllUsers") // Adjust the URL as necessary
      .then((response) => {
        if (response.data) {
          setUsers(response.data);
        } else {
          setError("No users found");
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users");
      });
  }, []);

  return (
    <div className="homes">
      <SideBar />
      <div className="main-content">
        <h1>All Users</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id} className="user-list-item">
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllUsers;
