import React from 'react';
import { useLocation } from 'react-router-dom';

function Match() {
    const location = useLocation();  // Access location object
    const employees = location.state ? location.state.employees : [];  // Access passed state

    const findMatch = () => {
        // data has been posted assume
        // this will trigger the matching to start
    }
    // waiting screen till the matching completes / time to matching arrives
    return (
        <div>
            <h1>Employee Directory</h1>
            <div>
                <h2>Employees:</h2>
                {employees.length > 0 ? (
                    <ul>
                        {employees.map(employee => (
                            <li key={employee._id}>
                                {employee.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No employees found.</p>
                )}
            </div>

            <button to="/findMatch" onClick={findMatch}></button>
        </div>
    );
}

export default Match;
