import React, { useState, useEffect, useRef } from "react";
import { sendMessage, getMessages } from "../../api/chat";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

export default function ChatWindow({ persona, chatSessionId, onBack }) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chatSessionId) {
      getMessages(token, chatSessionId).then(setMessages);
    } else {
      setMessages([]);
    }
  }, [token, chatSessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || !chatSessionId) return;

    setMessages(msgs => [...msgs, { content: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(token, persona._id, input, chatSessionId);
      setMessages(msgs => [...msgs, { content: res.reply, sender: "ai" }]);
    } catch (err) {
      setMessages(msgs => [
        ...msgs,
        { content: "Error: failed to get AI reply.", sender: "ai" }
      ]);
    } finally {
      setLoading(false);
    }
  }

  const getAIStyle = () => {
    switch (persona.tone) {
      case "friendly":
        return "bg-green-500";
      case "funny":
        return "bg-yellow-400 text-black";
      case "formal":
        return "bg-blue-500";
      case "sarcastic":
        return "bg-pink-500";
      case "wise":
        return "bg-purple-700";
      default:
        return "bg-indigo-500";
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-[#0a0a1f] rounded-xl shadow-lg overflow-hidden">
      
      {/* 🧭 Back Button */}
      <button
        onClick={onBack}
        className="m-4 w-fit px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-90 transition-all shadow-md"
      >
        ← Back to Sessions
      </button>

      {/* 💬 Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 max-w-xs rounded-lg text-sm font-medium break-words shadow-md ${
                msg.sender === "user"
                  ? "bg-gradient-to-br from-blue-600 to-indigo-500 text-white rounded-br-none"
                  : `${getAIStyle()} text-white rounded-bl-none`
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 📤 Message Input */}
      <form
        onSubmit={handleSend}
        className="flex items-center p-4 border-t border-[#1f1f38] bg-[#12122b]"
      >
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-[#1f1f38] text-white placeholder-gray-400 rounded-full p-3 px-5 mr-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition"
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
