import { useState } from "react";
import axiosClient from "../api/axiosClient";

const Chatbot = ({ onClose }: any) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);

    setMessage("");

    try {
      const res = await axiosClient.post("/api/ai/chat", {
        message: userMsg.content,
      });

      const botMsg = {
        role: "assistant",
        content: res.data.reply,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-header">
        <span>AI Assistant</span>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>
            {m.content}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about your tasks..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;