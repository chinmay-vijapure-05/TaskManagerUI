import { useState } from "react";
import { streamChat } from "../api/chatApi";

const Chatbot = ({ onClose }: any) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const botIndex = messages.length + 1;
    setMessages((prev) => [...prev, { role: "bot", text: "Thinking..." }]);

    const prompt = input;
    setInput("");
    setLoading(true);

    try {
      let firstToken = true;

      await streamChat(
        prompt,
        (token) => {
          setMessages((prev) => {
            const copy = [...prev];

            if (firstToken) {
              copy[botIndex] = { role: "bot", text: "" };
              firstToken = false;
            }

            copy[botIndex].text += token;
            return copy;
          });
        },
        () => setLoading(false)
      );
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "AI service unavailable" },
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-panel">
      <div className="chatbot-header">
        <span>AI Assistant</span>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="chatbot-messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="chatbot-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about planning your tasks..."
        />
        <button disabled={loading} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;