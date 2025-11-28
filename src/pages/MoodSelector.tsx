import { motion } from "framer-motion";
import { useState } from "react";

export default function MoodSelector() {
  const [hoverMood, setHoverMood] = useState<string | null>(null);

  const moods = [
    { label: "😎 Chill", color: "from-sky-300 to-blue-500" },
    { label: "⚡ Hype", color: "from-pink-400 to-rose-600" },
    { label: "💀 Dark", color: "from-gray-700 to-black" },
  ];

  const currentMood =
    moods.find((m) => m.label.includes(hoverMood || "")) || moods[0];

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center text-center transition-all duration-500 bg-linear-to-b ${currentMood.color}`}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-white mb-10"
        animate={{
          scale: hoverMood ? 1.1 : 1,
          rotate: hoverMood ? 2 : 0,
        }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Select your mood 🌈
      </motion.h1>

      <div className="flex gap-6">
        {moods.map((mood) => (
          <motion.button
            key={mood.label}
            onHoverStart={() => setHoverMood(mood.label)}
            onHoverEnd={() => setHoverMood(null)}
            className={`px-6 py-3 rounded-2xl text-xl font-semibold text-white bg-linear-to-r ${mood.color} shadow-lg transition-all duration-300 hover:scale-110`}
          >
            {mood.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
