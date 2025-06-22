import React, { useEffect, useState } from "react";
import { getPersonas, deletePersona } from "../../api/persona"; 
import { useAuth } from "../../contexts/AuthContext";
import { FaTrash } from "react-icons/fa"; // 👈 icon for delete

export default function PersonaList({ onSelect }) {
  const { token } = useAuth();
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    getPersonas(token).then(setPersonas);
  }, [token]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this persona?");
    if (!confirm) return;
    try {
      await deletePersona(token, id);
      setPersonas(prev => prev.filter(p => p._id !== id)); // 🔥 remove from UI
    } catch (err) {
      console.error("Failed to delete persona:", err);
    }
  };

  const toneBgMap = {
    neutral: "bg-gradient-to-r from-slate-700 to-slate-800",
    friendly: "bg-gradient-to-r from-green-500 to-emerald-600",
    formal: "bg-gradient-to-r from-blue-600 to-indigo-700",
    funny: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    sarcastic: "bg-gradient-to-r from-pink-500 to-pink-700",
    wise: "bg-gradient-to-r from-purple-600 to-violet-800",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {personas.map((p) => {
        const bgClass = toneBgMap[p.tone] || toneBgMap["neutral"];

        return (
          <div
            key={p._id}
            className={`relative p-4 rounded-xl flex items-center justify-between text-white ${bgClass} transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl`}
          >
            {/* 🗑️ Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent selecting the card
                handleDelete(p._id);
              }}
              className="absolute top-2 right-2 text-white/70 hover:text-red-400 transition"
            >
              <FaTrash size={14} />
            </button>

            {/* Persona Content */}
            <div
              onClick={() => onSelect(p)}
              className="flex-1 min-w-0 cursor-pointer"
            >
              <div className="font-bold truncate text-lg">{p.name}</div>
              <div className="text-sm opacity-90 truncate">{p.description}</div>
              <span className="text-xs mt-1 inline-block bg-black/20 px-2 py-0.5 rounded-full uppercase tracking-wide">
                {p.tone}
              </span>
            </div>

            <img
              src={p.avatar}
              alt={p.name}
              className="w-12 h-12 rounded-full object-cover ml-4 border border-white/30 shadow-md"
            />
          </div>
        );
      })}
    </div>
  );
}
