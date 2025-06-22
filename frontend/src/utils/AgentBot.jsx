import { motion } from "framer-motion";

// Simple bot SVG illustration with a waving hand
export default function AgentBot() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0.7 }}
      animate={{ y: [20, 0, 20], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        bottom: 40,
        left: 40,
        zIndex: 2,
        width: 120,
        height: 120,
        pointerEvents: "none",
        opacity: 0.7,
      }}
    >
      <svg viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="55" fill="#23234b" stroke="#6D28D9" strokeWidth="4"/>
        {/* Bot Body */}
        <ellipse cx="60" cy="80" rx="32" ry="18" fill="#818CF8"/>
        {/* Bot Head */}
        <circle cx="60" cy="55" r="25" fill="#A78BFA" stroke="#6D28D9" strokeWidth="3"/>
        {/* Eyes */}
        <ellipse cx="52" cy="55" rx="4" ry="6" fill="#23234b"/>
        <ellipse cx="68" cy="55" rx="4" ry="6" fill="#23234b"/>
        {/* Smile */}
        <path d="M52 65 Q60 75 68 65" stroke="#23234b" strokeWidth="2" fill="none"/>
        {/* Antenna */}
        <rect x="57" y="25" width="6" height="15" rx="3" fill="#6D28D9"/>
        <circle cx="60" cy="24" r="4" fill="#F472B6"/>
        {/* Waving Hand */}
        <motion.g
          animate={{ rotate: [0, 30, 0], transformOrigin: "100px 80px" }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <ellipse cx="100" cy="80" rx="7" ry="12" fill="#A78BFA" stroke="#6D28D9" strokeWidth="2"/>
        </motion.g>
      </svg>
    </motion.div>
  );
}
