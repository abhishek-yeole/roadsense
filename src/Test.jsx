import React, { useState, useEffect } from 'react';

const Test = () => {
  const [speed, setSpeed] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (speed > 50) {
        const newAlert = {
          predict: true,
          id: count,
          message: `Alert ${count}: Please Take caution.`,
          type: 'warning',
        };

        setAlerts(prevAlerts => [...prevAlerts, newAlert]);

        localStorage.setItem('Accident_prediction', JSON.stringify(alerts));

        setCount(prevCount => prevCount + 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [count, speed, alerts]);

  return (
    <div>
      <input type="text" onChange={(e) => setSpeed(e.target.value)} />
      <div>
        <h2>Alerts:</h2>
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>{alert.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Test;
