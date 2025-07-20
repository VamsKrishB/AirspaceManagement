import React, { useState, useEffect } from 'react'; // <-- Import useEffect
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { flightData as initialFlightData } from '../data/MockData.js';
import FlightInfoPanel from '../components/FlightInfoPanel.jsx';
import './dashboard.css';

function Dashboard() {
  const [selectedFlight, setSelectedFlight] = useState(null);
  
  // 1. Load our flight data into state so it can be updated.
  const [flights, setFlights] = useState(initialFlightData);

  // 2. Use an effect to run the simulation timer.
  useEffect(() => {
    const simulationInterval = setInterval(() => {
      // Every 2 seconds, update the flights state
      setFlights(currentFlights =>
        currentFlights.map(flight => {
          // Calculate a small random change for latitude and longitude
          const latChange = (Math.random() - 0.5) * 0.2;
          const lonChange = (Math.random() - 0.5) * 0.2;
          
          return {
            ...flight,
            position: [
              flight.position[0] + latChange,
              flight.position[1] + lonChange,
            ],
          };
        })
      );
    }, 2000); // Update every 2000 milliseconds (2 seconds)

    // 3. Cleanup: Stop the timer when the component is no longer on screen
    return () => clearInterval(simulationInterval);
  }, []); // The empty array [] ensures this effect runs only once.


  return (
    <div className="dashboard-layout">
      <div className="map-container">
        <h1 className="dashboard-title">Airspace Overview</h1>
        <div className="map-wrapper">
          <MapContainer center={[50.0, 15.0]} zoom={4} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {/* 4. Map over the 'flights' state variable instead of the static import */}
            {flights.map(flight => (
              <Marker
                key={flight.id}
                position={flight.position}
                eventHandlers={{
                  click: () => {
                    setSelectedFlight(flight);
                  },
                }}
              >
                <Popup>{flight.id} - {flight.airline}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      
      <FlightInfoPanel 
        flight={selectedFlight} 
        onClose={() => setSelectedFlight(null)} 
      />
    </div>
  );
}

export default Dashboard;