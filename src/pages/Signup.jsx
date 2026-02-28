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
    <div className="auth-left">
      <h1>Career Buddy AI</h1>
      <p>
        Your intelligent career companion. Get AI-powered resume insights,
        interview preparation, and smart career guidance.
      </p>

      <div className="auth-features">
        <div>🚀 AI Resume Analysis</div>
        <div>💼 Smart Job Matching</div>
        <div>🎯 Interview Preparation</div>
        <div>📊 Career Growth Tracking</div>
      </div>
    </div>

    <div className="auth-right">
      <div className="auth-card">
        <h2>Create Account</h2>

        <div className="input-group">
          <input onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="input-group">
          <input onChange={(e) => setEmailInput(e.target.value)} />
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
  </div>
);
}
