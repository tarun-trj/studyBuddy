import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import LoadingComponent from "./components/loadingComponent";

function Signup() {
    const { state } = useLocation();
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState(state?.username || "");
    const [password, setPassword] = useState('');
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true during form submission

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
        } finally {
            setLoading(false); // Set loading state back to false after request completes
        }
    };

    return (
        <main>
        <div className="image-container">
        <div className="image">
        <div className={`form ${loading ? 'form-slide-out' : ''}`}>
            {!loading ? (
                <div className="actual-form">
                    <h2 className="form-heading">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="email">
                            <label htmlFor="name"><strong>Name</strong></label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                autoComplete="off"
                                name="name" 
                                className="form-control rounded-0"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="email">
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                className="form-control rounded-0"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="email">
                            <label htmlFor="branch"><strong>Branch</strong></label>
                            <input
                                type="text"
                                placeholder="Enter Branch"
                                autoComplete="off"
                                name="branch" 
                                className="form-control rounded-0"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                            />
                        </div>
                        <div className="email">
                            <label htmlFor="semester"><strong>Semester</strong></label>
                            <input
                                type="text"
                                placeholder="Enter Semester"
                                autoComplete="off"
                                name="semester" 
                                className="form-control rounded-0"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                            />
                        </div>
                        <div className="email">
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                className="form-control rounded-0"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="submit-register" type="submit" style={{marginTop:"10px", width:"95%"}}>
                            <Link to="/register">
                            Sign Up
                            </Link>
                        </button>
                    </form>
                    <p style={{marginBottom:"3px", marginTop:"15px"}}>Already have an account?</p>
                    <div className="register" style={{borderWidth:"3px"}}>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            ) : (
                <div>
                    <LoadingComponent />
                </div>
            )}
        </div>
        </div>
        </div>
        </main>
    );
}

export default Signup;
