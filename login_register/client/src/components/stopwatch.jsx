import React, { useState, useRef } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
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
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const stopwatchStyles = {
    container: {
      backgroundColor: "#282c34",
      color: "#ffeb3b", // Yellow text color
      padding: "18px", // Adjusted padding
      borderRadius: "10px",
      textAlign: "center",
      fontFamily: "Digital-7, Courier, monospace",
      width: "180px", // Adjusted width
      position: "fixed",
      right: "40px",
      zIndex: 1000,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      fontSize: "0.8em", // Adjusted font size for container
    },
    time: {
      fontSize: "2em", // Adjusted font size for time
      margin: "8px 0", // Adjusted margin
      letterSpacing: "3px", // Adjusted letter spacing
      lineHeight: "1.2", // Adjusted line height
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-around"
    },
    button: {
      backgroundColor: "#444",
      color: "#ffeb3b",
      border: "none",
      borderRadius: "8px",
      padding: "12px", // Adjusted padding
      margin: "1px", // Adjusted margin (reduced from 3px)
      cursor: "pointer",
      width: "30px", // Adjusted width
      height: "30px", // Adjusted height
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "0.9em", // Adjusted font size for button icons
      transition: "background-color 0.2s",
    },
  };

  return (
    <div style={stopwatchStyles.container}>
      <h1 className="stop" style={{ fontSize: "0.8em", marginBottom: "5px" }}>
        Stopwatch
      </h1>
      <div style={stopwatchStyles.time}>{formatTime(time)}</div>
      <div style={stopwatchStyles.buttonContainer}>
        <button style={stopwatchStyles.button} onClick={startTimer}>
          {isRunning ? <span>&#10073;&#10073;</span> : <span>&#9654;</span>}
        </button>
        <button style={stopwatchStyles.button} onClick={stopTimer}>
          <span>&#9724;</span>
        </button>
        <button style={stopwatchStyles.button} onClick={resetTimer}>
          <span>&#8634;</span>
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
