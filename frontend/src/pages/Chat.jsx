import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatSessionsList from "../components/Chat/ChatSessionsList";
import ChatWindow from "../components/Chat/ChatWindow";
import Navbar from "../components/Layout/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { getPersonas } from "../api/persona";
import { motion } from "framer-motion";

export default function Chat() {
  const { personaId } = useParams();
  const [persona, setPersona] = useState(null);
  const [session, setSession] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    getPersonas(token).then(personas => {
      setPersona(personas.find(p => p._id === personaId));
    });
  }, [token, personaId]);

  if (!persona) {
    return (
      <div className="min-h-screen bg-[#0a0a1f] text-white flex items-center justify-center font-sora text-xl">
        Loading persona...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white font-sora relative overflow-hidden">
      {/* ✨ Background glow orbs */}
      <style jsx="true">{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
      `}</style>

      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[150px] z-0"
        style={{ animation: "pulse-slow 6s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] z-0"
        style={{ animation: "float-slow 8s ease-in-out infinite" }}
      />

      {/* 🧭 Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* 🧠 Chat Section */}
      <div className="relative z-10 max-w-2xl mx-auto mt-8 px-4">
        {!session ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-center mb-6">
              Chat with {persona.name}
            </h1>
            <ChatSessionsList persona={persona} onSelect={setSession} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ChatWindow
              persona={persona}
              chatSessionId={session._id}
              onBack={() => setSession(null)}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
