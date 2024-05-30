import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h1>All Users</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li> // Adjust based on your user model
        ))}
      </ul>
    </div>
  );
}

export default AllUsers;
