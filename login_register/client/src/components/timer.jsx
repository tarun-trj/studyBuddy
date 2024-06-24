import React, { useEffect, useState } from 'react';

const Timer = () => {
    const [minutesOnes, setMinutesOnes] = useState(0); // Initialize with default value 0
    const [minutesTens, setMinutesTens] = useState(0); // Initialize with default value 0
    const [secondsOnes, setSecondsOnes] = useState(0); // Initialize with default value 0
    const [secondsTens, setSecondsTens] = useState(0); // Initialize with default value 0

    const timerStyle = {
        timer: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderRadius: '10px',
          margin: 'auto'
        },
        timeSection: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 0.2rem'
        },
        digits: {
          fontFamily: 'Digital-7',
          fontWeight: 400,
          display: 'flex'
        },
        value: {
          fontFamily: "Digital 7",
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Example: Background color
          fontSize: '1rem',
          margin: '0.2rem',
          padding: '0.2rem',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '5px',
          width: '2rem',
          textAlign: 'center'
        },
        label: {
          fontSize: '0.8em',
          fontFamily: 'Lato, sans-serif'
        }
      };

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const remainingMinutes = 29 - (minutes % 30);
            const remainingSeconds = 59 - seconds;

            setMinutesOnes(remainingMinutes % 10);
            setMinutesTens(Math.floor(remainingMinutes / 10));
            setSecondsOnes(remainingSeconds % 10);
            setSecondsTens(Math.floor(remainingSeconds / 10));
        };

        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="timer" style={timerStyle.timer}>
            <div className="time-section minutes" style={timerStyle.timeSection}>
                <div className="digits" style={timerStyle.digits}>
                    <div className="value" style={timerStyle.value}>{minutesTens}</div>
                    <div className="value" style={timerStyle.value}>{minutesOnes}</div>
                </div>
                <div className="label" style={timerStyle.label}>Minutes</div>
            </div>
            <div className="time-section seconds" style={timerStyle.timeSection}>
                <div className="digits" style={timerStyle.digits}>
                    <div className="value" style={timerStyle.value}>{secondsTens}</div>
                    <div className="value" style={timerStyle.value}>{secondsOnes}</div>
                </div>
                <div className="label" style={timerStyle.label}>Seconds</div>
            </div>
        </div>
    );
};

export default Timer;
