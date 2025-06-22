import React, { useState } from "react";
import { createPersona } from "../../api/persona";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const avatars = ["Ash", "Jordan", "Kai", "Riley", "Nova", "Zion", "Quinn"];

function getAvatarUrl(seed) {
  const encoded = encodeURIComponent(seed || "persona");
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encoded}`;
}

const tones = ["friendly", "formal", "funny", "sarcastic", "wise", "neutral"];

export default function PersonaForm({ onSuccess }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    name: "",
    avatar: avatars[0],
    tone: "neutral",
    description: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const avatar = getAvatarUrl(form.avatar);
    const res = await createPersona(token, { ...form, avatar });
    if (res.error) {
      toast.dismiss();
      toast.error(res.error);
    } else {
      onSuccess();
      toast.success("Persona Created");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-[#121227]/70 backdrop-blur-lg border border-[#3f3f5c] shadow-[0_0_40px_#3b82f6] rounded-2xl p-6 sm:p-8 space-y-6 mx-auto"
    >
      <h2 className="text-2xl text-center font-semibold text-[#cbd5ff]">
        PersonaForge
      </h2>

      {/* Name */}
      <input
        placeholder="Name"
        className="w-full px-4 py-3 rounded-md bg-[#1f1f3a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      {/* Avatar Selection */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Avatar</label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {avatars.map((avatar, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setForm({ ...form, avatar })}
              className={`rounded-full border-2 p-1 transition-all duration-300 ${
                form.avatar === avatar
                  ? "border-indigo-500 scale-105"
                  : "border-transparent opacity-70"
              }`}
            >
              <img
                src={getAvatarUrl(avatar)}
                alt={avatar}
                className="w-10 h-10 rounded-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Tone Selection */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Tone</label>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {tones.map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() => setForm({ ...form, tone })}
              className={`px-3 py-1 rounded-full text-sm border ${
                form.tone === tone
                  ? "bg-indigo-600 text-white border-indigo-400"
                  : "bg-[#1f1f3a] text-gray-300 border-gray-600 hover:bg-[#2c2c4a]"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <textarea
        placeholder="Enter notes"
        rows={3}
        className="w-full px-4 py-3 rounded-md bg-[#1f1f3a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white py-3 rounded-xl font-medium shadow-md hover:opacity-90 transition-all duration-300"
      >
        Generate Persona
      </button>
    </form>
  );
}
