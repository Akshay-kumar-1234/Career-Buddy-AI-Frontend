import "../Styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ setEmail }) {
  const [name, setName] = useState("");
  const [email, setEmailInput] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!name || !email) return alert("Fill all fields");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("otpEmail", email); // ✅ add this
  navigate("/verify-otp", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

return (
  <div className="auth-wrapper">
    <div className="auth-hero">
      <h1>Join Career Buddy AI</h1>
      <p>
        Get AI-powered resume insights, job recommendations
        and career growth tools — all in one place.
      </p>

      <div className="auth-features">
        <div>🚀 AI Resume Analysis</div>
        <div>💼 Smart Job Matching</div>
        <div>🎯 Interview Preparation</div>
      </div>
    </div>

    <div className="auth-card">
      <h2>Create Account</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </div>

      <button className="auth-btn" onClick={sendOtp}>
        Send OTP
      </button>

      <div className="auth-link">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </div>
    </div>
  </div>
);
}
