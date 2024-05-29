import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Signup() {
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[branch, setBranch] = useState('')
    const[semester, setSemester] = useState('')

    const navigate = useNavigate()
    const handleSubmit = async (e) => { 
        e.preventDefault()

        try {
          const userData = {
            name: name,
            email: email,
            password: password,
            branch: branch,
            semester: semester
          };
          const response = await axios.post('http://127.0.0.1:3002/register', userData);
          console.log('Registration successful', response.data); 
          navigate('/login'); // Navigate to login page on successful registration
        } catch (error) {
          console.error('Failed to register', error);
        }
    }

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name" 
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Branch</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Branch"
              autoComplete="off"
              name="branch" 
              className="form-control rounded-0"
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Semester</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Semester"
              autoComplete="off"
              name="semester" 
              className="form-control rounded-0"
              onChange={(e) => setSemester(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email"> 
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
          </form>
          <p>Already have an account?</p>
          <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </Link>
        
      </div>
    </div>
  );
}

export default Signup;
