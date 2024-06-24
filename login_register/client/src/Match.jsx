import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar.jsx"; // Assuming Sidebar component path
import "./styles/styles.css";

function Match() {
  const [error, setError] = useState("");
  const [partnerEmail, setPartnerEmail] = useState(
    sessionStorage.getItem("partnerEmail")
  );
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate(); // If you need to navigate programmatically

  useEffect(() => {
    const fetchPartnerEmail = async () => {
      const userEmail = user.email;

      try {
        const response = await axios.post(
          "http://127.0.0.1:3002/find",
          { email: userEmail },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
        if (response.data.emailRes) {
          sessionStorage.setItem("partnerEmail", response.data.emailRes);
          setPartnerEmail(response.data.emailRes);
        } else {
          sessionStorage.removeItem("partnerEmail");
          setError("No partner found for this email.");
        }
      } catch (err) {
        if (err.response) {
          console.log("Error Status:" + err.response.status);
          setError(err.response.data.message || "Unknown error");
        } else {
          setError("Failed to fetch partner email. Please try again later.");
        }
      }
    };

    if (!partnerEmail) {
      fetchPartnerEmail();
    }
  }, [partnerEmail, token, user.email]);

  if (!partnerEmail) {
    return (
    <div className="match-container">
      <Sidebar />
      <div className="main-content">
        <h1 className="welcome">No partner found please start a match in Start Matching Page</h1>
      </div>
    </div>
    );
  }

  return (
    <div className="match-container">
      <Sidebar />
      <div className="main-content">
        <h1 className="welcome">Welcome, {user.name}!</h1>
        <h2 className="welcome">Your Partner's Email is: {partnerEmail}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="guidelines">
          <h2>Community Guidelines</h2>
          <ul>
            <li>Be respectful and considerate to all members.</li>
            <li>Maintain a positive and supportive attitude.</li>
            <li>Respect the privacy and personal information of others.</li>
            <li>Avoid offensive or inappropriate language and behavior.</li>
            <li>Report any issues or misconduct to the administrators.</li>
          </ul>

          <h2>Guidelines for Respectful Interaction with Your Study Partner</h2>
          <ul>
            <li>
              Communicate clearly and openly about your study needs and goals.
            </li>
            <li>Respect your partner's time and availability.</li>
            <li>Be punctual and committed to scheduled study sessions.</li>
            <li>Offer constructive feedback and support.</li>
            <li>
              Maintain confidentiality of shared academic and personal
              information.
            </li>
            <li>
              Address conflicts or misunderstandings calmly and respectfully.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Match;
