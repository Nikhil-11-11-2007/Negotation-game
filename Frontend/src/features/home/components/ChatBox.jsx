import { useEffect, useRef } from "react";

const ChatBox = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-box">
      {messages && messages.length > 0 ? (
        <>
          {messages.map((m, i) => (
            <div key={i} className={m.sender === "You" ? "user" : "ai"}>
              <div className="message-content">
                <b>{m.sender}:</b> {m.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </>
      ) : (
        <div style={{ textAlign: "center", color: "#bdc3c7", padding: "20px" }}>
          Start the negotiation to begin chatting...
        </div>
      )}
    </div>
  );
};

export default ChatBox;