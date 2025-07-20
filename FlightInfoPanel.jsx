// src/components/FlightInfoPanel.jsx
import React from 'react';
import './FlightInfoPanel.css'; // We will create this CSS file next

function FlightInfoPanel({ flight, onClose }) {
  // If no flight is selected, render nothing
  if (!flight) {
    return null;
  }

  return (
    <div className="info-panel">
      <div className="panel-header">
        <h2 className="panel-title">Flight Details</h2>
        <button onClick={onClose} className="close-btn">&times;</button>
      </div>
      <div className="panel-content">
        <p><strong>Flight ID:</strong> {flight.id}</p>
        <p><strong>Airline:</strong> {flight.airline}</p>
        <p><strong>Origin:</strong> {flight.origin}</p>
        <p><strong>Destination:</strong> {flight.destination}</p>
        <p><strong>Status:</strong> <span className="status-en-route">{flight.status}</span></p>
      </div>
    </div>
  );
}

export default FlightInfoPanel;