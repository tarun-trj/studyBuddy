import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePW = () => {
  const token = sessionStorage.getItem("token");
  const [oldPW, setOld] = useState("");
  const [newPW, setNew] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPW !== confirm) {
      setMessage("Passwords do not match");
      setValid(true);
      return;
    }

    if (!newPW || !oldPW || !token) {
      setMessage("All fields are required");
      setValid(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/change-password', {
        token,
        oldPW,
        newPW,
      });

      console.log(response);
      if (response.status === 200) {
        sessionStorage.clear();
        // Replace alert with a more user-friendly notification
        alert('Password changed successfully');
        navigate('/login');
      } else {
        console.log(response.data.message);
      }

      setValid(false);
    } catch (error) {
      console.error("Error:", error);
      setValid(false);
    }
  };

  if (!token) {
    return <div>No user logged in</div>;
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="old">Enter your Old Password:</label>
        <input
          type="password"
          id="old"
          value={oldPW}
          onChange={(e) => setOld(e.target.value)}
          required
        />
        <label htmlFor="new">Enter your New Password:</label>
        <input
          type="password"
          id="new"
          value={newPW}
          onChange={(e) => setNew(e.target.value)}
          required
        />
        <label htmlFor="confirm">Confirm New Password:</label>
        <input
          type="password"
          id="confirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>

      {valid && <p>{message}</p>}
    </div>
  );
};

export default ChangePW;
