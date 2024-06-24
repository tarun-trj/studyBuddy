import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';

function SetPW(){
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`http://127.0.0.1:3002/forgot-password/${token}`, {
                password,
            });

            setMessage(response.data.message);

            if (response.data.message === "Email not found") {
                setValid(true);
                return;
            }

            if (response.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="full">
      <div className="about-page">
        <Navbar />
        <div className="content-container">
          <div className="content password">
            <h1 style={{fontFamily: "Montserrat"}}>Reset Password</h1>
            <form onSubmit={handleSubmit} className='starter-form'>
              <label style={{alignSelf: "start"}}>New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{width: "100%", padding: "5px"}}
              />
              <label style={{alignSelf: "start"}}>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{width: "100%", padding: "5px"}}
              />
              <button type="submit" className='starter-login' style={{border: "2px solid #318a7e", marginTop: "20px", borderRadius: "5px", width: "100%"}}>Reset Password</button>
            </form>

            {valid && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
        // <div>
        //     <h2>Reset Password</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label>New Password:</label>
        //             <input
        //                 type="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Confirm New Password:</label>
        //             <input
        //                 type="password"
        //                 value={confirmPassword}
        //                 onChange={(e) => setConfirmPassword(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <button type="submit">Reset Password</button>
        //     </form>
        //     {message && <p>{message}</p>}
        //     {valid && <p>Email does not exist</p>}
        // </div>
    );
};

export default SetPW;
