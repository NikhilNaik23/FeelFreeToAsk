import React from "react";
import { useNavigate } from "react-router-dom";
import PersonaList from "../components/Persona/PersonaList";
import AgentBot from "../utils/AgentBot";
import Navbar from "../components/Layout/Navbar"; // 👈 import it
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  const stars = Array.from({ length: 30 }).map((_, i) => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 4 + 6;
    const delay = Math.random() * 8;
    const translateY = 80 + Math.random() * 10;
    const translateX = 40 + Math.random() * 20;
    return (
      <div
        key={i}
        className="star"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          "--star-translate-y": `${translateY}vh`,
          "--star-translate-x": `${translateX}vw`,
        }}
      />
    );
  });

  return (
    <div className="min-h-screen bg-[#0a0a1f] relative overflow-hidden px-4 select-none">
      <style jsx="true">{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-25px);
          }
        }
        @keyframes star-move {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(var(--star-translate-y))
              translateX(var(--star-translate-x));
            opacity: 0;
          }
        }
        .star {
          position: absolute;
          background: white;
          border-radius: 9999px;
          opacity: 0.8;
          pointer-events: none;
          animation: star-move linear infinite;
        }
      `}</style>

      {/* 🌠 Background elements */}
      {stars}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-700/30 rounded-full blur-[150px]"
        style={{ animation: "pulse-slow 6s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px]"
        style={{ animation: "float-slow 8s ease-in-out infinite" }}
      />

      {/* 🧭 Navbar */}
      <div className="absolute top-0 left-0 w-full z-30 px-4 pt-4">
        <Navbar />
      </div>

      {/* 🤖 AgentBot */}
      <AgentBot />

      {/* 🌌 Main Section */}
      <div className="min-h-screen flex flex-col items-center justify-center z-10 relative text-center max-w-5xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-2xl tracking-wide font-sora mb-8"
        >
          Choose a Persona
        </motion.h1>

        <div className="w-full">
          <PersonaList onSelect={(p) => navigate(`/chat/${p._id}`)} />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className="mt-6 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:opacity-90 transition-all"
          onClick={() => navigate("/personas")}
        >
          + Create Persona
        </motion.button>
      </div>
    </div>
  );
}
