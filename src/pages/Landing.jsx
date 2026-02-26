import { useNavigate } from "react-router-dom";
import "../styles/landing.css";
export default function Landing() {
  const navigate = useNavigate();

  const openChatWithPrompt = (prompt) => {
    navigate("/home", { state: { prompt } });
  };

  const options = [
    {
      title: "🎓 Career Options",
      desc: "Best career paths after 10th.",
      prompt: "What are the best career options after 10th?",
    },
    {
      title: "🔬 Science Stream",
      desc: "PCM, PCB & career scope.",
      prompt: "Explain science stream after 10th in detail.",
    },
    {
      title: "💼 Commerce Stream",
      desc: "Accounts, CA & Business fields.",
      prompt: "Commerce stream career opportunities after 10th.",
    },
    {
      title: "🎨 Arts Stream",
      desc: "Creative & Government careers.",
      prompt: "Arts stream career options after 10th.",
    },
    {
      title: "🛠 Polytechnic",
      desc: "Diploma engineering courses.",
      prompt: "Best polytechnic courses after 10th.",
    },
    {
      title: "💻 Computer Courses",
      desc: "IT & coding career path.",
      prompt: "Best computer courses after 10th.",
    },
    {
      title: "🏛 Government Jobs",
      desc: "Railway, Army & Police.",
      prompt: "Government jobs available after 10th.",
    },
    {
      title: "🧑‍⚕️ Medical Career",
      desc: "Doctor & healthcare paths.",
      prompt: "Medical field career roadmap after 10th.",
    },
    {
      title: "✈️ Defence Career",
      desc: "Army, Navy & Airforce.",
      prompt: "Defence career options after 10th.",
    },
    {
      title: "📊 CA Foundation",
      desc: "Commerce professional path.",
      prompt: "How to become CA after 10th?",
    },
    {
      title: "🌍 Study Abroad",
      desc: "International education options.",
      prompt: "Study abroad options after 10th.",
    },
    {
      title: "📈 Skill Development",
      desc: "Short-term high income skills.",
      prompt: "Best skill development courses after 10th.",
    },
  ];

  return (
    <div className="premium-home">

      {/* HERO */}
      <div className="hero-section">
          <img
    src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
    alt="robot"
    className="hero-robot"
  />
        <h1>
          Discover Your <span>Future Career</span>
        </h1>
        <p>
          AI-powered career guidance to help you choose the best path after 10th.
        </p>
      </div>

      {/* OPTIONS GRID */}
      <div className="premium-grid">
        {options.map((item, index) => (
          <div
            key={index}
            className="premium-card"
            onClick={() => openChatWithPrompt(item.prompt)}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}