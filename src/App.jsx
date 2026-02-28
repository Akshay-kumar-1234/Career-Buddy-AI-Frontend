import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Chatbot from "./pages/Chatbot";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import DashboardLayout from "./Components/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

export default function App() {
  const location = useLocation();

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
        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login setUser={setUser} />
            </PublicRoute>
          }
        />

        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <VerifyOtp setUser={setUser} />
            </PublicRoute>
          }
        />

        {/* ================= PROTECTED ROUTES ================= */}

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <DashboardLayout user={user}>
                <Landing user={user} />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout user={user}>
                <Profile user={user} />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout user={user}>
                <Settings user={user} />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Chatbot only inside protected home */}
      {user && location.pathname === "/home" && (
        <Chatbot user={user} />
      )}
    </>
  );
}