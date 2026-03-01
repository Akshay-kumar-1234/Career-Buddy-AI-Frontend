import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp({ setUser }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("otpEmail");

  const verifyOtp = async () => {
    if (!email) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      console.log("Verify OTP Response:", data);
if (data.token && data.user) {

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.removeItem("otpEmail");

  setUser(data.user);
navigate("/home", { replace: true });

} else {
  alert(data.message || "Invalid OTP");
}
       
    } catch (error) {
      console.error("OTP Verification Error:", error);
    }
  };

return (
  <div className="auth-wrapper">
    <div className="auth-hero">
      <h1>Verify Your Email</h1>
      <p>
        We have sent a 6-digit OTP to your registered email address.
        Enter it below to continue.
      </p>

      <div className="auth-features">
        <div>🔐 Secure Authentication</div>
        <div>⚡ Fast Verification</div>
        <div>🤖 AI Career Access</div>
      </div>
    </div>

    <div className="auth-card">
      <h2>Enter OTP</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      <button className="auth-btn" onClick={verifyOtp}>
        Verify OTP
      </button>

      <div className="auth-link">
        Wrong email?{" "}
        <span onClick={() => navigate("/login")}>
          Go Back
        </span>
      </div>
    </div>
  </div>
);
}