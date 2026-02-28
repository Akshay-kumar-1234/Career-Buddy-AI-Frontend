import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/dashboard.css";

export default function DashboardLayout({ children, user }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
 localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard">

      {/* Toggle Button (Always Visible) */}
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>
 {/* Overlay */}
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

<aside className={`sidebar ${open ? "show" : ""}`}>

  {/* User Section */}
  <div className="sidebar-user">
    <div className="avatar">
      {user?.name?.charAt(0) || "A"}
    </div>
    <div className="user-info">
      <p className="user-name">{user?.name}</p>
      
    </div>
  </div>

  {/* Menu */}
  <ul className="sidebar-menu">
    <li onClick={() => navigate("/home")}>🏠 Home</li>
    <li onClick={() => navigate("/profile")}>👤 Profile</li>
    <li onClick={() => navigate("/settings")}>⚙️ Settings</li>
  </ul>

  {/* Logout */}
  <div className="logout-btn" onClick={handleLogout}>
    🚪 Logout
  </div>

</aside>

      {/* Main Content */}
      <div className="main-section">
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}