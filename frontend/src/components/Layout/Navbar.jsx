import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="z-20 w-full backdrop-blur-md bg-[#121227]/80 border-b border-[#2d2d4d] text-[#cbd5ff] px-6 py-3 flex justify-between items-center shadow-sm select-none rounded-2xl"
    >
      <Link
        to="/"
        className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide font-sora"
      >
        PersonaChat
      </Link>

      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm sm:text-base font-medium text-purple-200">
            {user.name}
          </span>
          <motion.button
            onClick={logout}
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(90deg,#4f46e5,#7c3aed)",
            }}
            whileTap={{ scale: 0.95 }}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white shadow-md transition-all"
          >
            Logout
          </motion.button>
        </div>
      )}
    </motion.nav>
  );
}
