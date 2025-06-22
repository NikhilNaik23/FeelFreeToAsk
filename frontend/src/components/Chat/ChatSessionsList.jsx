import React, { useEffect, useState } from "react";
import { getSessionsByPersona, createChatSession } from "../../api/chatSession";
import { useAuth } from "../../contexts/AuthContext";

// 🎨 Tone-based theme colors (soft, muted for dark galaxy bg)
const toneColors = {
  neutral: "bg-[#1e1e2e] hover:bg-[#2a2a3f]",
  friendly: "bg-[#1e3a2e] hover:bg-[#295f45]",
  formal: "bg-[#1a2b4c] hover:bg-[#25456b]",
  funny: "bg-[#4c3b0b] hover:bg-[#6b4f0f]",
  sarcastic: "bg-[#4c1f36] hover:bg-[#74224d]",
  wise: "bg-[#2a1e4c] hover:bg-[#432e6b]",
};

export default function ChatSessionsList({ persona, onSelect }) {
  const { token } = useAuth();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessionsByPersona(token, persona._id).then(setSessions);
  }, [persona, token]);

  async function handleNewSession() {
    const session = await createChatSession(token, persona._id, `Chat with ${persona.name}`);
    setSessions((s) => [session, ...s]);
    onSelect(session);
  }

  return (
    <div className="text-white">
      {/* ➕ New Chat Button */}
      <button
        className="mb-4 py-2 px-4 rounded-md bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold shadow hover:opacity-90 transition"
        onClick={handleNewSession}
      >
        + New Chat Session
      </button>

      {/* 💬 Session List */}
      {sessions.map((s) => (
        <div
          key={s._id}
          onClick={() => onSelect(s)}
          className={`p-4 rounded-lg cursor-pointer transition-all mb-3 shadow-md border border-white/10 ${
            toneColors[persona.tone] || "bg-[#222639] hover:bg-[#2f334b]"
          }`}
        >
          <div className="font-semibold text-base">{s.title}</div>
          <div className="text-xs text-gray-400 mt-1">
            {new Date(s.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
