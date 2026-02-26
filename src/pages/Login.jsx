import "../Styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  
  const navigate = useNavigate();

  const sendOtp = async () => {
  try {
    const res = await fetch( `${import.meta.env.VITE_API_URL}/api/chat`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log("Send OTP Response:", data);

    if (res.ok) {  // ✅ use res.ok instead
      localStorage.setItem("otpEmail", email);
      navigate("/verify-otp");
    } else {
      alert(data.message || "Failed to send OTP");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};
  return (
     <div className="auth-container">
    <div className="auth-card">
      <h2>Welcome Back</h2>

      <div className="input-group">
        <input
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Email</label>
      </div>

      <button className="auth-btn" onClick={sendOtp}>
        Login with OTP
      </button>

      <div className="auth-link">
        New user?{" "}
        <span onClick={() => navigate("/")}>Create account</span>
      </div>
    </div>
  </div>
  );
}