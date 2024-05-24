// Home.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Match() {
    const [email, setEmail] = useState('');
    const [partnerEmail, setPartnerEmail] = useState('');

    const fetchPartnerEmail = async () => {
        try {
            const response = await axios.post('/match', { email });
            setPartnerEmail(response.data.partnerEmail);
        } catch (error) {
            console.error('Error fetching partner email:', error);
        }
    };

    return (
        <div>
            <h1>Match Page</h1>
            <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
            <button onClick={fetchPartnerEmail}>Submit Query</button>
            {partnerEmail && <p>Partner's Email: {partnerEmail}</p>}
        </div>
    );
}

export default Match;
