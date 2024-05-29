import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Match() {
    const [error, setError] = useState('');
    const location = useLocation();
    const partner = location.state?.partner;

    if (!partner) {
        // Handle the case when user data is not available
        return <div>Loading...</div>;
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
