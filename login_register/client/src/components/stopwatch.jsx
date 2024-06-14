import React, { useState, useRef } from 'react';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
    };

    const stopTimer = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(timerRef.current);
        }
    };

    const resetTimer = () => {
        setIsRunning(false);
        clearInterval(timerRef.current);
        setTime(0);
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const stopwatchStyles = {
        container: {
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',  // Decreased padding to make it smaller
            borderRadius: '10px',
            textAlign: 'center',
            fontFamily: 'Courier, monospace',
            width: '350px',  // Decreased width
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
        },
        time: {
            fontSize: '3.5em',  // Increased font size for larger digits
            margin: '10px 0',
        },
        button: {
            backgroundColor: '#555',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '20px', // Increased padding for square shape
            margin: '5px',
            cursor: 'pointer',
            width: '60px', // Set fixed width for square shape
            height: '60px', // Set fixed height for square shape
            justifyContent: 'center',
            alignItems: 'center',
        },
    };

    return (
        <div style={stopwatchStyles.container}>
            <h1>Stopwatch</h1>
            <p style={stopwatchStyles.time}>{formatTime(time)}</p>
            <button style={stopwatchStyles.button} onClick={startTimer}>
                {isRunning ? (
                    <span>&#10073;&#10073;</span>
                ) : (
                    <span>&#9654;</span>
                )}
            </button>
            <button style={stopwatchStyles.button} onClick={stopTimer}>
                <span>&#9724;</span> 
            </button>
            <button style={stopwatchStyles.button} onClick={resetTimer}>
                <span>&#8634;</span> 
            </button>
        </div>
    );
};

export default Stopwatch;
