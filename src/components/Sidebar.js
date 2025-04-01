import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Process Planner</h2>
      <ul>
        <li><Link to="/">📊 Dashboard</Link></li>
        <li><Link to="/chat">💬 Chat</Link></li>
        <li><Link to="/tasks">📌 Tasks</Link></li>
        <li><Link to="/settings">⚙️ Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
