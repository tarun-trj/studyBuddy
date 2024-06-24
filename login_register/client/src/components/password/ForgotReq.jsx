import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../Navbar';

const ForgotReq = () => {
  const [email, setEmail] = useState('');
  sessionStorage.clear();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Please wait a moment");
    try {
      const response = await axios.post('http://localhost:3002/forgot-password', { email });

      if (response.status === 200) {
        toast.success('Password reset email sent');
      } else {
        toast.error(response.data.message);
      }
      setMessage("Please check your mail to reset your password.");
    } catch (error) {
      toast.error(error.response.data.message || 'An error occurred');
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="full">
    <div className="about-page">
      <Navbar />
      <div className="content-container">
      <div className="content password" style={{fontFamily: "Lato"}}>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit} className='starter-form' style={{display:"contents", alignItems:"normal"}}>
          <label htmlFor="email" style={{marginRight: "10px"}}>Enter your email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{width: "50%", padding: "5px"}}
          />
          <button type="submit" className='starter-login' style={{border: "2px solid #318a7e", marginTop: "20px", borderRadius: "5px", width: "30%"}}>Send Email</button>
        </form>
        <p style={{marginTop: "10px", color: "blue"}}>{message}</p>
      </div>
      </div>
    </div>
    </div>
  );
};

export default ForgotReq;
