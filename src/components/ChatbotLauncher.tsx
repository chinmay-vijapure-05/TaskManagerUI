import { useState } from "react";
import Chatbot from "./Chatbot";

const ChatbotLauncher = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <Chatbot />}

      <button
        className="chatbot-float"
        onClick={() => setOpen(!open)}
      >
        🤖
      </button>
    </>
  );
};

export default ChatbotLauncher;