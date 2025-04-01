import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [notifications, setNotifications] = useState(true);
  const [themeColor, setThemeColor] = useState("#3498db");

  return (
    <div className={`settings-container ${darkMode ? "dark" : ""}`}>
      <h2>⚙️ Settings</h2>

      {/* Dark Mode Toggle */}
      <div className="setting-item">
        <label>Dark Mode:</label>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Font Size Selector */}
      <div className="setting-item">
        <label>Font Size:</label>
        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Notifications Toggle */}
      <div className="setting-item">
        <label>Notifications:</label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
      </div>

      {/* Theme Color Picker */}
      <div className="setting-item">
        <label>Theme Color:</label>
        <input
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Settings;
