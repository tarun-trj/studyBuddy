import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx'; // Assuming Sidebar component path
import "./styles/styles.css";

function Match() {
    const [error, setError] = useState('');
    const [partnerEmail, setPartnerEmail] = useState(sessionStorage.getItem('partnerEmail'));
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
        return <div>Loading...</div>; // You can show a loading indicator here
    }

    return (
        <div className="match-container">
            <Sidebar />
            <div className="main-content">
                <h1>Welcome, {user.name}!</h1>
                <h2>Partner's Email</h2>
                <p>{partnerEmail}</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

export default Match;
