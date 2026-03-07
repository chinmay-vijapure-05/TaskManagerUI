const API_BASE_URL =
  "https://ai-chatbot-backend-g8u3.onrender.com/api";

export const streamChat = async (
  prompt: string,
  onToken: (token: string) => void,
  onDone: () => void
) => {
  const res = await fetch(`${API_BASE_URL}/chat/stream`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.body) throw new Error("Streaming failed");

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });

    chunk.split("\n\n").forEach((line) => {
      if (!line.startsWith("data: ")) return;

      const data = line.replace("data: ", "");

      if (data === "[DONE]") {
        onDone();
        return;
      }

      if (data === "[ERROR]") {
        onToken("\n⚠️ Error generating response.");
        onDone();
        return;
      }

      onToken(data);
    });
  }
};