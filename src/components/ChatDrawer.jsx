import React, { useState } from "react";
import { Send, X, CheckCheck } from "lucide-react";

export default function ChatDrawer({ beautician, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: "m1",
      sender: "beautician",
      text: `Hi there! 👋 Thanks for reaching out to ${beautician?.name || "Glow Beauty"}. Are you looking for availability or have a question about our looks?`,
      time: "Just now"
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: "m_" + Date.now(),
      sender: "user",
      text: inputText.trim(),
      time: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Simulated reply from beautician after 1.2s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: "m_rep_" + Date.now(),
          sender: "beautician",
          text: "Thanks for the message! I'd love to help you look your best. You can select your preferred slot directly from my profile to reserve it with a deposit! ✨",
          time: "Just now"
        }
      ]);
    }, 1200);
  };

  return (
    <div className="chat-drawer">
      <div className="chat-header">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={beautician?.image || "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&q=80"}
            alt={beautician?.name}
            style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "2px solid white" }}
          />
          <div>
            <b style={{ fontSize: "14px", display: "block" }}>{beautician?.name}</b>
            <span style={{ fontSize: "11px", opacity: 0.9 }}>🟢 Active now</span>
          </div>
        </div>

        <button onClick={onClose} style={{ color: "white" }}>
          <X size={20} />
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`chat-bubble ${m.sender === "user" ? "sent" : "received"}`}
          >
            <div>{m.text}</div>
            <div
              style={{
                fontSize: "10px",
                opacity: 0.7,
                marginTop: "3px",
                textAlign: m.sender === "user" ? "right" : "left",
                display: "flex",
                alignItems: "center",
                justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
                gap: "3px"
              }}
            >
              {m.time}
              {m.sender === "user" && <CheckCheck size={11} />}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="chat-input-bar">
        <input
          type="text"
          placeholder="Ask a question or request consultation..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type="submit"
          className="action-icon-btn"
          disabled={!inputText.trim()}
          style={{ width: "36px", height: "36px" }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
