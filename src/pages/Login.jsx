import "../Styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  
  const navigate = useNavigate();

  const sendOtp = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log("Send OTP Response:", data);

    if (res.ok) {  // ✅ use res.ok instead
      localStorage.setItem("otpEmail", email);
    navigate("/verify-otp", { replace: true });
    } else {
      alert(data.message || "Failed to send OTP");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};
return (
  <div className="auth-wrapper">
    <div className="auth-left">
      <h1>Welcome Back</h1>
      <p>
        Continue your career journey with AI-powered insights and tools
        designed to accelerate your success.
      </p>

      <div className="auth-features">
        <div>✨ Personalized Career Advice</div>
        <div>📄 Resume Optimization</div>
        <div>🤖 AI Career Chat Assistant</div>
        <div>📈 Growth Roadmap</div>
      </div>
    </div>

    <div className="auth-right">
      <div className="auth-card">
        <h2>Login with OTP</h2>

        <div className="input-group">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="auth-btn" onClick={sendOtp}>
          Send OTP
        </button>

        <div className="auth-link">
          New user?{" "}
          <span onClick={() => navigate("/")}>Create account</span>
        </div>
      </div>
    </div>
  </div>
);
}