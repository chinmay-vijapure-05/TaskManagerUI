import { useState } from "react";
import Chatbot from "./Chatbot";

const ChatbotLauncher = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <Chatbot onClose={() => setOpen(false)} />}

      <button
        className="chatbot-float"
        onClick={() => setOpen(true)}
      >
        🤖
      </button>
    </>
  );
};

export default ChatbotLauncher;