import React from "react";
import AgentBot from "../utils/AgentBot"; // Adjust path as needed

export default function NotFound() {
  // Responsive: fewer stars on mobile
  const starCount =
    typeof window !== "undefined" && window.innerWidth < 640 ? 12 : 24;
  const stars = Array.from({ length: starCount }).map((_, i) => {
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
        aria-hidden="true"
      />
    );
  });

  return (
    <div className="min-h-screen bg-[#0a0a1f] relative flex flex-col items-center justify-center overflow-hidden px-2 sm:px-4">
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
          0% { transform: translateY(0) translateX(0); opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(var(--star-translate-y)) translateX(var(--star-translate-x)); opacity: 0; }
        }
        .star {
          position: absolute;
          background: white;
          border-radius: 9999px;
          opacity: 0.8;
          pointer-events: none;
          animation: star-move linear infinite;
        }
        .animated-orb {
          animation: pulse-slow 6s ease-in-out infinite;
          filter: blur(120px);
        }
        .animated-orb2 {
          animation: float-slow 8s ease-in-out infinite;
          filter: blur(80px);
        }
        @media (max-width: 640px) {
          .animated-orb { width: 180px !important; height: 180px !important; left: -60px !important; top: -60px !important; }
          .animated-orb2 { width: 90px !important; height: 90px !important; right: 10px !important; bottom: 10px !important; }
        }
      `}</style>

      {/* ✨ Animated Moving Stars */}
      {stars}

      {/* 🔮 Glowing Orbs */}
      <div
        className="animated-orb absolute -top-32 -left-32 w-[350px] h-[350px] bg-purple-700/30 rounded-full"
        aria-hidden="true"
      />
      <div
        className="animated-orb2 absolute bottom-10 right-10 w-[180px] h-[180px] bg-indigo-600/20 rounded-full"
        aria-hidden="true"
      />

      {/* 🤖 Animated AgentBot */}
      <AgentBot />

      {/* 🚀 Main Content */}
      <div className="z-10 flex flex-col items-center text-center mt-24 sm:mt-36">
        <h1 className="text-6xl sm:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-2xl">
          404
        </h1>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#cbd5ff]">
          Lost in Space
        </h2>
        <p className="mt-3 text-base sm:text-lg text-gray-400 max-w-md">
          Oops! The page you’re looking for has drifted into the cosmic void.<br />
          <span className="inline-block mt-2">Let our agent bot help you find your way home.</span>
        </p>
        <a
          href="/"
          className="mt-8 inline-block bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white py-3 px-8 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
