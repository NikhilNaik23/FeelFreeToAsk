import React from "react";
import { useNavigate } from "react-router-dom";
import PersonaForm from "../components/Persona/PersonaForm";
import AgentBot from "../utils/AgentBot";
import { motion } from "framer-motion";

export default function Personas() {
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
    <div className="min-h-dvh bg-[#0a0a1f] relative overflow-hidden px-4 sm:px-6 select-none">
      <style jsx="true">{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
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
            transform: translateY(var(--star-translate-y)) translateX(var(--star-translate-x));
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

      {stars}

      {/* Glowing Backgrounds */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-700/30 rounded-full blur-[150px]"
        style={{ animation: "pulse-slow 6s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px]"
        style={{ animation: "float-slow 8s ease-in-out infinite" }}
      />

      {/* Optional Assistant */}
      <AgentBot />

      {/* Main Section */}
      <div className="min-h-dvh flex flex-col items-center justify-center z-10 relative text-center">
        
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-xl px-2 sm:px-4"
        >
          <PersonaForm onSuccess={() => navigate("/")} />
        </motion.div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-4 sm:left-6 z-20 text-xs sm:text-sm font-medium px-3 py-1 sm:px-4 sm:py-1.5 bg-white/5 rounded-lg text-purple-300 hover:text-white hover:bg-white/10 backdrop-blur transition-all"
      >
        ← Back to Home
      </button>
    </div>
  );
}
