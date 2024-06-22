import React, { useEffect, useState } from 'react';

const Timer = () => {
    const [minutesOnes, setMinutesOnes] = useState(0); // Initialize with default value 0
    const [minutesTens, setMinutesTens] = useState(0); // Initialize with default value 0
    const [secondsOnes, setSecondsOnes] = useState(0); // Initialize with default value 0
    const [secondsTens, setSecondsTens] = useState(0); // Initialize with default value 0

    const timerStyle = {
        value: {
            fontFamily: "Digital 7",
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Example: Background color
            borderRadius: "5px", // Example: Border radius
            textAlign: "center" // Example: Center text alignment
        },
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
        <div className="timer">
            <div className="time-section minutes">
                <div className="digits">
                    <div className="value" style={timerStyle.value}>{minutesTens}</div>
                    <div className="value" style={timerStyle.value}>{minutesOnes}</div>
                </div>
                <div className="label">Minutes</div>
            </div>
            <div className="time-section seconds">
                <div className="digits">
                    <div className="value" style={timerStyle.value}>{secondsTens}</div>
                    <div className="value" style={timerStyle.value}>{secondsOnes}</div>
                </div>
                <div className="label">Seconds</div>
            </div>
        </div>
    );
};

export default Timer;
