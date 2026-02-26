import { useState, useEffect } from "react";

export default function Settings({ user }) {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications")) ?? true
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("notifications", notifications);
  }, [theme, notifications]);

  return (
    <div className="settings-card">
    <h2 style={{ fontSize: "26px", marginBottom: "10px" }}>
  ⚙️ Application Settings
</h2>
<p style={{ color: "#94a3b8" }}>
  Customize your dashboard experience
</p>

      <div className="setting-item">
        <label>Theme</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="dark">Dark Mode</option>
          <option value="light">Light Mode</option>
        </select>
      </div>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Enable Notifications
        </label>
      </div>
    </div>
  );
}