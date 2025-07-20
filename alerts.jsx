import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
// Import both the initial data and our new pool of alerts
import { alertsData as initialAlerts, newAlertsPool } from '../data/MockData.js';

function Alerts() {
  // Hold the list of visible alerts in state
  const [alerts, setAlerts] = useState(initialAlerts);

  // useEffect runs code after the component renders.
  // This is perfect for setting up timers or fetching data.
  useEffect(() => {
    // Set up an interval to run a function every 10 seconds (10000 milliseconds)
    const intervalId = setInterval(() => {
      // Pick a random alert from our pool
      const randomAlert = newAlertsPool[Math.floor(Math.random() * newAlertsPool.length)];
      
      // Create a new alert object with a unique ID (using the current time)
      const newAlert = { ...randomAlert, id: Date.now() };

      // Add the new alert to the top of our existing alerts list
      setAlerts(prevAlerts => [newAlert, ...prevAlerts]);

    }, 10000);

    // This is a crucial cleanup function. 
    // It runs when the component is unmounted (e.g., you navigate to another page).
    // It stops the timer to prevent memory leaks.
    return () => clearInterval(intervalId);

  }, []); // The empty array [] means this effect runs only ONCE when the component first loads.

  const getSeverityDetails = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return { 
          icon: <ShieldAlert className="text-red-500" />, 
          color: 'border-l-4 border-red-500 bg-red-500/10' 
        };
      case 'medium':
        return { 
          icon: <ShieldQuestion className="text-yellow-500" />, 
          color: 'border-l-4 border-yellow-500 bg-yellow-500/10' 
        };
      case 'low':
        return { 
          icon: <ShieldCheck className="text-gray-400" />, 
          color: 'border-l-4 border-gray-500 bg-gray-500/10' 
        };
      default:
        return { icon: null, color: '' };
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">System Alerts</h1>
      
      <div className="space-y-4">
        {alerts.map(alert => {
          const { icon, color } = getSeverityDetails(alert.severity);
          return (
            <div key={alert.id} className={`p-4 rounded-r-lg flex items-center ${color}`}>
              <div className="mr-4">
                {icon}
              </div>
              <div>
                <p className="font-bold">{alert.severity} Severity</p>
                <p className="text-gray-300">{alert.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Alerts;