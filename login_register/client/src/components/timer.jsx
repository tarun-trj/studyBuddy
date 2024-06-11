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

            setTimeRemaining(`${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')} `);
        };

        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className = "timer">
            <div className = "text"> Next matching in: </div> 
            <div className = "time">{timeRemaining}</div>
        </div>
    );
};

export default Timer;
