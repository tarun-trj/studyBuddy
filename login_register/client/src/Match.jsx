import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Match() {
    const [error, setError] = useState('');
    const partner = sessionStorage.getItem('partner');

    useEffect(() => {
        if(!partner) {
            const fetchPartner = async () => {
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
                        partner = response.data.emailRes;
                    } else {
                        if (sessionStorage.getItem("partner") !== null) {
                            sessionStorage.removeItem("partner");
                        }
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
        
            fetchPartner();
        }
    }, []);

    if(!partner) {
        return(
            <div>No partner</div>
        )
    }
    
    return (
        <div>
            <h1>Find Your Partner's Email</h1>
            <p>Partner Email: {partner}</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Match;
