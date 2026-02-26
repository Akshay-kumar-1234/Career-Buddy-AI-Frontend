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
      const res = await fetch( `${import.meta.env.VITE_API_URL}/api/chat`, {
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
  navigate("/home");

} else {
  alert(data.message || "Invalid OTP");
}
       
    } catch (error) {
      console.error("OTP Verification Error:", error);
    }
  };

  return (
     <div className="auth-container">
    <div className="auth-card">
      <h2>Enter OTP</h2>
      <div className="input-group">
        <input
          placeholder=" "
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <label>OTP</label>
      </div>
      <button className="auth-btn" onClick={verifyOtp}>
        Verify OTP
      </button>
    </div>
  </div>
  );
}