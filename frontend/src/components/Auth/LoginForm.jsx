import React, { useState } from "react";
import { login } from "../../api/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import AgentBot from "../../utils/AgentBot"; // Adjust path as needed

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login: setToken } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await login(form);
    if (res.token) {
      setToken(res.token);
      navigate("/");
      toast.dismiss();
      toast.success("Logged in successfully");
    } else {
      toast.dismiss();
      toast.error(res.error || "Login failed");
    }
  }

  // Responsive: fewer stars on mobile
  const starCount =
    typeof window !== "undefined" && window.innerWidth < 640 ? 15 : 30;
  const stars = Array.from({ length: starCount }).map((_, i) => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 4 + 6; // 6s to 10s
    const delay = Math.random() * 8;
    const translateY = 80 + Math.random() * 10; // 80-90vh
    const translateX = 40 + Math.random() * 20; // 40-60vw
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
    <div className="min-h-screen bg-[#0a0a1f] relative flex items-center justify-center overflow-hidden px-2 sm:px-4">
      <style jsx="true">{`
        @media (prefers-reduced-motion: reduce) {
          .star, .animated-orb, .animated-orb2 { animation: none !important; }
        }
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
          .animated-orb { width: 250px !important; height: 250px !important; left: -80px !important; top: -80px !important; }
          .animated-orb2 { width: 120px !important; height: 120px !important; right: 10px !important; bottom: 10px !important; }
        }
      `}</style>

      {/* ✨ Animated Moving Stars */}
      {stars}

      {/* 🔮 Glowing Background Orbs */}
      <div
        className="animated-orb absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-700/30 rounded-full"
        aria-hidden="true"
      />
      <div
        className="animated-orb2 absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-600/20 rounded-full"
        aria-hidden="true"
      />

      {/* 🤖 Agent Bot */}
      <AgentBot />

      {/* 🌠 Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-24 sm:top-48 text-3xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-2xl tracking-wide font-sora z-10"
      >
        FeelFreeToAsk
      </motion.h1>

      {/* 🔐 Login Form Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        whileHover={{
          boxShadow: "0 0 60px 0 rgba(120, 87, 255, 0.25)",
          scale: 1.01,
        }}
        className="z-10 mt-20 sm:mt-40 w-full max-w-md bg-[#121227]/80 backdrop-blur-md border border-[#3f3f5c] shadow-2xl rounded-2xl p-4 sm:p-10"
      >
        <h2 className="text-lg sm:text-2xl text-[#cbd5ff] font-semibold text-center mb-6">
          Welcome back, dreamer ✦
        </h2>

        <div className="space-y-4 sm:space-y-5">
          <motion.input
            whileFocus={{ scale: 1.03, boxShadow: "0 0 8px 0 #818cf8" }}
            transition={{ duration: 0.2 }}
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-[#1f1f3a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="email"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.03, boxShadow: "0 0 8px 0 #f472b6" }}
            transition={{ duration: 0.2 }}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-[#1f1f3a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="current-password"
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, background: "linear-gradient(90deg,#a78bfa,#818cf8,#60a5fa)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className="w-full mt-6 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition-all"
        >
          Login
        </motion.button>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Don’t have an account yet?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-purple-300 hover:text-white underline ml-1"
            type="button"
          >
            Register
          </button>
        </p>
      </motion.form>
    </div>
  );
}
