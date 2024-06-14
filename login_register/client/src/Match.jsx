import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import "./styles/styles.css";

function Match() {
    const [error, setError] = useState('');
    const [partner, setPartner] = useState(sessionStorage.getItem('partner'));
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");
    
    useEffect(() => {
        const fetchPartner = async () => {
            const email = user.email;

            try {
                const response = await axios.post(
                    "http://127.0.0.1:3002/find",
                    { email },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log(response);
                if (response.data.emailRes) {
                    sessionStorage.setItem("partner", response.data.emailRes);
                    setPartner(response.data.emailRes);
                } else {
                    sessionStorage.removeItem("partner");
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

        if (!partner) {
            fetchPartner();
        }
    }, []);

    if (!partner) {
        return (
            <div>No partner</div>
        );
    }

    return (
        <div className = "homes">
            <Sidebar />
            <div>
                <h1>Find Your Partner's Email</h1>
                <p>Partner Email: {partner}</p>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Match;
