import React, { useState } from 'react';
import axios from 'axios';

function Match() {
    const [email, setEmail] = useState('');
    const [partnerEmail, setPartnerEmail] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors
        setPartnerEmail(''); // Clear previous results

        try {
            const response = await axios.post("http://127.0.0.1:3002/find", { email });
            console.log(response);
            if (response.data.emailRes) {
                setPartnerEmail(response.data.emailRes);
            } else {
                setError('No partner found for this email.');
            }
        } catch (err) {
            // Specific error handling for not found
            if (err.response && err.response.status === 404) {
                setError('API endpoint not found. Please check the URL.');
            } else if (err.response && err.response.status === 500) {
                setError('Internal server error. Please try again later.');
            } else {
                setError('Failed to fetch partner email. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h1>Find Your Partner's Email</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your email:
                    <input type="email" value={email} onChange={handleInputChange} required />
                </label>
                <button type="submit">Find Partner Email</button>
            </form>
            {partnerEmail && <p>Partner Email: {partnerEmail}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Match;
