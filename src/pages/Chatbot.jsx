import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../styles/chat.css";
import TypingDots from "../Components/TypingDots";
import { sendMessageToServer } from "../api";

export default function Chatbot({ user }) {
  if (!user) return null;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
const location = useLocation();
  // 👋 Welcome message
  useEffect(() => {
    setMessages([
      {
        from: "bot",
        text: `Hi ${user?.name || "there"}, I'm CareerBuddy! 👋`,
      },
    ]);
  }, [user]);

  // 🔥 Auto open + auto send from Landing
  useEffect(() => {
  if (location.state?.prompt) {
    setOpen(true);
    handleSend(location.state.prompt);
  }
}, [location.state]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((m) => [...m, { from: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessageToServer({
        message: trimmed,
        profile: user,
      });

      setMessages((m) => [
        ...m,
        { from: "bot", text: res?.reply || "No response from server" },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { from: "bot", text: "⚠️ Server error. Try again." },
      ]);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="chat-float" onClick={() => setOpen(true)}>
        🤖
      </div>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            Career Buddy AI
            <button className="close-btn" onClick={() => setOpen(false)}>
              ✖
            </button>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.from}`}>
                {m.text}
              </div>
            ))}
            {loading && <TypingDots />}
            <div ref={bottomRef}></div>
          </div>

          <form
            className="chat-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
}