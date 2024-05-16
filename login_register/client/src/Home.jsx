import React from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    // Handle the case when user data is not available
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Welcome</h1>
      <h1>Welcome, {user.name}!</h1>
      <div>
        <p>Email: {user.email}</p>
        {/* Display other user info here */}
      </div>
    </div>
  );
}

export default Home;
