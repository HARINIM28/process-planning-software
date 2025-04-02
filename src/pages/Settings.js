import React, { useState, useEffect } from "react";
import { FiSun, FiMoon, FiType, FiBell, FiVolume2, FiZap, FiKeyboard } from "react-icons/fi";
import "./Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    fontSize: "medium",
    contrast: "normal",
    notifications: true,
    screenReader: false,
    reducedMotion: false,
    fontFamily: "system-ui",
    lineSpacing: "normal",
    keyboardShortcuts: true
  });

  // Keyboard shortcuts
  const shortcuts = {
    "Alt + D": "Toggle Dark Mode",
    "Alt + F": "Adjust Font Size",
    "Alt + C": "Change Contrast",
    "Alt + N": "Toggle Notifications",
    "Alt + S": "Toggle Screen Reader",
    "Alt + M": "Toggle Reduced Motion",
    "Alt + L": "Adjust Line Spacing"
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'd':
            setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
            break;
          case 'f':
            const sizes = ['small', 'medium', 'large'];
            const currentIndex = sizes.indexOf(settings.fontSize);
            const nextSize = sizes[(currentIndex + 1) % sizes.length];
            setSettings(prev => ({ ...prev, fontSize: nextSize }));
            break;
          case 'n':
            setSettings(prev => ({ ...prev, notifications: !prev.notifications }));
            break;
          // Add more shortcuts as needed
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings]);

  // Apply settings to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
    document.documentElement.style.fontSize = {
      small: '14px',
      medium: '16px',
      large: '18px'
    }[settings.fontSize];
    document.documentElement.style.fontFamily = settings.fontFamily;
    document.documentElement.style.lineHeight = {
      compact: '1.4',
      normal: '1.6',
      relaxed: '1.8'
    }[settings.lineSpacing];
    if (settings.reducedMotion) {
      document.documentElement.style.setProperty('--transition-speed', '0s');
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`settings-container ${settings.darkMode ? "dark" : ""}`} role="main">
      <h1>⚙️ Accessibility Settings</h1>
      <p className="settings-description">Customize your experience to make the application more accessible.</p>

      <section className="settings-section" aria-labelledby="display-settings">
        <h2 id="display-settings">Display Settings</h2>
        
        <div className="setting-item" role="group" aria-labelledby="dark-mode-label">
          <label id="dark-mode-label" className="setting-label">
            <FiMoon className="setting-icon" />
            Dark Mode
            <span className="shortcut-hint">Alt + D</span>
          </label>
          <button 
            onClick={() => updateSetting('darkMode', !settings.darkMode)}
            aria-pressed={settings.darkMode}
            className={`toggle-button ${settings.darkMode ? 'active' : ''}`}
          >
            {settings.darkMode ? 'On' : 'Off'}
          </button>
        </div>

        <div className="setting-item" role="group" aria-labelledby="font-size-label">
          <label id="font-size-label" className="setting-label">
            <FiType className="setting-icon" />
            Font Size
            <span className="shortcut-hint">Alt + F</span>
          </label>
          <select
            value={settings.fontSize}
            onChange={(e) => updateSetting('fontSize', e.target.value)}
            aria-label="Select font size"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="setting-item" role="group" aria-labelledby="font-family-label">
          <label id="font-family-label" className="setting-label">
            <FiType className="setting-icon" />
            Font Family
          </label>
          <select
            value={settings.fontFamily}
            onChange={(e) => updateSetting('fontFamily', e.target.value)}
            aria-label="Select font family"
          >
            <option value="system-ui">System Default</option>
            <option value="Arial">Arial</option>
            <option value="OpenDyslexic">OpenDyslexic</option>
            <option value="'Times New Roman'">Times New Roman</option>
          </select>
        </div>

        <div className="setting-item" role="group" aria-labelledby="contrast-label">
          <label id="contrast-label" className="setting-label">
            <FiZap className="setting-icon" />
            Contrast
            <span className="shortcut-hint">Alt + C</span>
          </label>
          <select
            value={settings.contrast}
            onChange={(e) => updateSetting('contrast', e.target.value)}
            aria-label="Select contrast level"
          >
            <option value="normal">Normal</option>
            <option value="high">High Contrast</option>
            <option value="low">Low Contrast</option>
          </select>
        </div>
      </section>

      <section className="settings-section" aria-labelledby="accessibility-settings">
        <h2 id="accessibility-settings">Accessibility Settings</h2>

        <div className="setting-item" role="group" aria-labelledby="screen-reader-label">
          <label id="screen-reader-label" className="setting-label">
            <FiVolume2 className="setting-icon" />
            Screen Reader Support
            <span className="shortcut-hint">Alt + S</span>
          </label>
          <button 
            onClick={() => updateSetting('screenReader', !settings.screenReader)}
            aria-pressed={settings.screenReader}
            className={`toggle-button ${settings.screenReader ? 'active' : ''}`}
          >
            {settings.screenReader ? 'On' : 'Off'}
          </button>
        </div>

        <div className="setting-item" role="group" aria-labelledby="motion-label">
          <label id="motion-label" className="setting-label">
            <FiZap className="setting-icon" />
            Reduced Motion
            <span className="shortcut-hint">Alt + M</span>
          </label>
          <button 
            onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
            aria-pressed={settings.reducedMotion}
            className={`toggle-button ${settings.reducedMotion ? 'active' : ''}`}
          >
            {settings.reducedMotion ? 'On' : 'Off'}
          </button>
        </div>

        <div className="setting-item" role="group" aria-labelledby="line-spacing-label">
          <label id="line-spacing-label" className="setting-label">
            <FiType className="setting-icon" />
            Line Spacing
            <span className="shortcut-hint">Alt + L</span>
          </label>
          <select
            value={settings.lineSpacing}
            onChange={(e) => updateSetting('lineSpacing', e.target.value)}
            aria-label="Select line spacing"
          >
            <option value="compact">Compact</option>
            <option value="normal">Normal</option>
            <option value="relaxed">Relaxed</option>
          </select>
        </div>
      </section>

      <section className="settings-section" aria-labelledby="notification-settings">
        <h2 id="notification-settings">Notification Settings</h2>
        
        <div className="setting-item" role="group" aria-labelledby="notifications-label">
          <label id="notifications-label" className="setting-label">
            <FiBell className="setting-icon" />
            Notifications
            <span className="shortcut-hint">Alt + N</span>
          </label>
          <button 
            onClick={() => updateSetting('notifications', !settings.notifications)}
            aria-pressed={settings.notifications}
            className={`toggle-button ${settings.notifications ? 'active' : ''}`}
          >
            {settings.notifications ? 'On' : 'Off'}
          </button>
        </div>
      </section>

      <section className="settings-section" aria-labelledby="keyboard-shortcuts">
        <h2 id="keyboard-shortcuts">Keyboard Shortcuts</h2>
        <div className="shortcuts-list">
          {Object.entries(shortcuts).map(([key, description]) => (
            <div key={key} className="shortcut-item">
              <kbd>{key}</kbd>
              <span>{description}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Settings;
