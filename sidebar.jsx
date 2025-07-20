import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Plane, ShieldAlert } from 'lucide-react';
import './sidebar.css';

// This component is responsible for the navigation links on the left side.
function Sidebar() {
  // Base styling for all navigation links
  const baseLinkClass = "flex items-center p-3 rounded-lg transition-colors duration-200";
  // Styling for the active link (the page the user is currently on)
  const activeLinkClass = "bg-blue-600 text-white";
  // Styling for inactive links
  const inactiveLinkClass = "text-gray-400 hover:bg-gray-700 hover:text-white";

  // Inside Sidebar.jsx
return (
  <aside className="sidebar-container">
    <h1 className="sidebar-title">TOTAL AIRPORT AND AIRSPACE MANAGEMENT (TAAM)</h1>
    <nav>
      <NavLink to="/" className="nav-link">
        <LayoutDashboard className="mr-3" />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/operations" className="nav-link">
        <Plane className="mr-3" />
        <span>Operations</span>
      </NavLink>
      <NavLink to="/alerts" className="nav-link">
        <ShieldAlert className="mr-3" />
        <span>Alerts</span>
      </NavLink>
    </nav>
  </aside>
);
}

export default Sidebar;