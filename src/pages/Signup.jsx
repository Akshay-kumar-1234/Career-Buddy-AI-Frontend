import "../styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ setEmail }) {
  const [name, setName] = useState("");
  const [email, setEmailInput] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!name || !email) return alert("Fill all fields");

    try {
      const res = await fetch( `${import.meta.env.VITE_API_URL}/api/chat`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("otpEmail", email); // ✅ add this
      navigate("/verify-otp");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
     <div className="auth-container">
    <div className="auth-card">
      <h2>Create Account</h2>
      <div className="input-group">
        <input placeholder=" " onChange={(e) => setName(e.target.value)} />
        <label>Name</label>
      </div>
      <div className="input-group">
        <input placeholder=" " onChange={(e) => setEmailInput(e.target.value)} />
        <label>Email</label>
      </div>
      <button className="auth-btn" onClick={sendOtp}>
        Send OTP
      </button>
      <div className="auth-link">
        Already have an account? <span onClick={() => navigate("/login")}>Login</span>
      </div>
    </div>
  </div>
  );
}
