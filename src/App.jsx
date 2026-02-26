import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Chatbot from "./pages/Chatbot";
import { useState } from "react";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import DashboardLayout from "./Components/DashboardLayout";
export default function App() {

  const location = useLocation();   // ✅ ADD THIS

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser || storedUser === "undefined") {
        return null;
      }

      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Corrupted user in localStorage:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* PROTECTED ROUTE */}
       <Route
  path="/home"
  element={
    user ? (
      <DashboardLayout user={user}>
        <Landing user={user} />
      </DashboardLayout>
    ) : (
      <Navigate to="/" />
    )
  }
/>

<Route
  path="/profile"
  element={
    user ? (
      <DashboardLayout user={user}>
        <Profile user={user} />
      </DashboardLayout>
    ) : (
      <Navigate to="/" />
    )
  }
/>

<Route
  path="/settings"
  element={
    user ? (
      <DashboardLayout user={user}>
        <Settings user={user} />
      </DashboardLayout>
    ) : (
      <Navigate to="/" />
    )
  }
/>
      </Routes>

      {/* ✅ Chatbot only on home */}
      {user && location.pathname === "/home" && (
        <Chatbot user={user} />
      )}
    </>
  );
}