import React, { useState } from 'react';
import { airportOperationsData as initialData } from '../data/MockData.js';
import './operations.css'; // <-- 1. IMPORT THE NEW CSS FILE

function Operations() {
  const [operationsData, setOperationsData] = useState(initialData);
  const [newFlight, setNewFlight] = useState({
    flightId: '',
    gate: '',
    type: 'Departure',
    status: 'On Time'
  });

  const handleStatusChange = (flightId, newStatus) => {
    const updatedData = operationsData.map(op => 
      op.flightId === flightId ? { ...op, status: newStatus } : op
    );
    setOperationsData(updatedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFlight(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddFlight = (e) => {
    e.preventDefault();
    if (!newFlight.flightId || !newFlight.gate) {
      alert("Please enter a Flight ID and Gate.");
      return;
    }
    setOperationsData([...operationsData, newFlight]);
    setNewFlight({ flightId: '', gate: '', type: 'Departure', status: 'On Time' });
  };
  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'on time': return 'bg-green-500/20 text-green-400';
      case 'delayed': return 'bg-yellow-500/20 text-yellow-400';
      case 'boarding': return 'bg-blue-500/20 text-blue-400';
      case 'landed': return 'bg-gray-500/20 text-gray-300';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Airport Operations</h1>

      {/* 2. WRAP THE FORM AND TABLE IN THE NEW LAYOUT DIV */}
      <div className="operations-layout">

        {/* 3. Add the 'form-container' class to the form */}
        <form onSubmit={handleAddFlight} className="form-container bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Add New Flight</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="flightId" className="block text-sm font-medium text-gray-400">Flight ID</label>
              <input type="text" id="flightId" name="flightId" value={newFlight.flightId} onChange={handleInputChange} className="mt-1 bg-gray-700 border border-gray-600 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label htmlFor="gate" className="block text-sm font-medium text-gray-400">Gate</label>
              <input type="text" id="gate" name="gate" value={newFlight.gate} onChange={handleInputChange} className="mt-1 bg-gray-700 border border-gray-600 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full">
              Add Flight
            </button>
          </div>
        </form>

        {/* 4. Add the 'table-container' class to the table's wrapper */}
        <div className="table-container bg-gray-800 rounded-lg overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="p-4">Flight ID</th>
                <th className="p-4">Status</th>
                <th className="p-4">Gate</th>
                <th className="p-4">Type</th>
                <th className="p-4">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {operationsData.map(op => (
                <tr key={op.flightId} className="border-t border-gray-700 hover:bg-gray-700/50">
                  <td className="p-4 font-mono">{op.flightId}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(op.status)}`}>
                      {op.status}
                    </span>
                  </td>
                  <td className="p-4">{op.gate}</td>
                  <td className="p-4">{op.type}</td>
                  <td className="p-4">
                    <select
                      value={op.status}
                      onChange={(e) => handleStatusChange(op.flightId, e.target.value)}
                      className="bg-gray-700 border border-gray-600 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>On Time</option>
                      <option>Delayed</option>
                      <option>Boarding</option>
                      <option>Landed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Operations;