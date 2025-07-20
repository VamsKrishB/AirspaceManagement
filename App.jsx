// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import Dashboard from './pages/dashboard.jsx';
import Operations from './pages/operations.jsx';
import Alerts from './pages/alerts.jsx';

function App() {
  return (
    // This div now controls the main side-by-side layout
    <div className="app-container">
      <Sidebar />

      {/* This main tag is now our scrollable content area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;