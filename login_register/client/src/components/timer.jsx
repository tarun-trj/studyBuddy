import React, { useEffect, useState } from 'react';

const Timer = () => {
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const remainingMinutes = 29 - (minutes % 30);
            const remainingSeconds = 59 - seconds;

            setTimeRemaining(`${remainingMinutes.toString().padStart(2, '0')} minutes ${remainingSeconds.toString().padStart(2, '0')} seconds`);
        };

        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1>Timer</h1>
            <p>Time Remaining to Next Half Hour: {timeRemaining}</p>
        </div>
    );
};

export default Timer;
