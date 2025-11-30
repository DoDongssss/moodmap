import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ChevronDown, ChevronUp } from "lucide-react";

type SkillsSectionProps = {
  activeCard: string;
  isDark: boolean;
  isMobile: boolean;
  setActiveCard: (card: string) => void;
};

interface Skill {
  name: string;
  icon: string;
  color: string;
  darkColor: string;
  category: string;
}

const SkillCard = ({ 
  skill, 
  index, 
}: { 
  skill: Skill; 
  index: number; 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative p-2 md:p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
        {/* Skill Icon */}
        <div className="flex items-center justify-center mb-1.5 md:mb-2">
          <motion.div
            animate={{
              scale: isHovered ? 1.15 : 1,
              rotate: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.3 }}
            className="text-2xl md:text-3xl"
          >
            {skill.icon}
          </motion.div>
        </div>

        {/* Skill Name */}
        <h3 className="text-center text-[10px] md:text-xs font-semibold text-gray-800 dark:text-gray-200">
          {skill.name}
        </h3>
      </div>
    </motion.div>
  );
};

export default function SkillSection({
  activeCard,
  isDark,
  isMobile,
  setActiveCard,
}: SkillsSectionProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const skills: Skill[] = [
    // Frontend
    { name: "HTML5", icon: "🌐", color: "#E34F26", darkColor: "#F06529", category: "Frontend" },
    { name: "CSS3", icon: "🎨", color: "#1572B6", darkColor: "#33A9DC", category: "Frontend" },
    { name: "JavaScript", icon: "⚡", color: "#F7DF1E", darkColor: "#F0DB4F", category: "Frontend" },
    { name: "React", icon: "⚛️", color: "#61DAFB", darkColor: "#00D8FF", category: "Frontend" },
    { name: "Vue.js", icon: "💚", color: "#4FC08D", darkColor: "#42B883", category: "Frontend" },
    { name: "TypeScript", icon: "📘", color: "#3178C6", darkColor: "#007ACC", category: "Frontend" },
    { name: "Tailwind", icon: "🌊", color: "#06B6D4", darkColor: "#38BDF8", category: "Frontend" },
    
    // Backend
    { name: "PHP", icon: "🐘", color: "#777BB4", darkColor: "#8892BF", category: "Backend" },
    { name: "Laravel", icon: "🔺", color: "#FF2D20", darkColor: "#FF5A4C", category: "Backend" },
    { name: "Node.js", icon: "🟢", color: "#339933", darkColor: "#68A063", category: "Backend" },
    { name: "MySQL", icon: "🐬", color: "#4479A1", darkColor: "#00758F", category: "Backend" },
    
    // Tools & Others
    { name: "Git", icon: "🔀", color: "#F05032", darkColor: "#F1502F", category: "Tools" },
    { name: "WordPress", icon: "📝", color: "#21759B", darkColor: "#00749C", category: "Tools" },
    { name: "Figma", icon: "🎯", color: "#F24E1E", darkColor: "#FF7262", category: "Tools" },
  ];

  const categories = ["All", "Frontend", "Backend", "Tools"];

  const filteredSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const cardContent = (
    <div className="w-full p-3 md:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code2 size={20} className="text-gray-800 dark:text-gray-200 md:w-[22px] md:h-[22px]" strokeWidth={2.5} />
          <h1 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">
            Skills
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleDetails}
            className="flex items-center gap-1 px-2 py-1 text-[.6rem] md:text-[.65rem] font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {showDetails ? (
              <>
                <ChevronUp size={14} strokeWidth={2.5} />
                <span className="hidden sm:inline">Collapse</span>
              </>
            ) : (
              <>
                <ChevronDown size={14} strokeWidth={2.5} />
                <span className="hidden sm:inline">Expand</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="relative h-px bg-linear-to-r from-gray-300 dark:from-gray-600 to-transparent mt-3 mb-4"></div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-[11px] md:text-xs font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-gray-800 dark:bg-white text-white dark:text-gray-900 shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-3">
        {filteredSkills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>

      {/* Additional Details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: "easeOut" },
              opacity: { duration: 0.25, ease: "easeOut" }
            }}
            style={{ overflow: "hidden", willChange: "height, opacity" }}
          >
            <div className="mt-6 md:mt-8 space-y-3">
              <p className="text-xs md:text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                I've honed my skills through extensive hands-on experience in both frontend and backend development. My proficiency spans across modern frameworks, databases, and development tools, allowing me to build complete, production-ready applications.
              </p>
              <p className="text-xs md:text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                Each skill reflects real-world project experience and continuous learning. I'm always exploring new technologies and best practices to stay current in the ever-evolving web development landscape.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* Backdrop overlay */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ willChange: "opacity" }}
            className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm z-60"
            onClick={() => setShowDetails(false)}
          />
        )}
      </AnimatePresence>

      {/* Normal Card */}
      {!showDetails && (
        <motion.div
          drag={!isMobile}
          dragMomentum={!isMobile}
          dragElastic={!isMobile ? 0.1 : 0}
          onDragStart={() => setActiveCard("skills")}
          onDragEnd={() => setActiveCard("")}
          style={{ zIndex: activeCard === "skills" ? 50 : 10 }}
          whileHover={{
            background: isDark
              ? "linear-gradient(135deg, #1c1c1c, #2a2a2a, #1c1c1c)"
              : "linear-gradient(135deg, #fbf5ea, #f3e4d0, #fbf5ea)",
            backgroundSize: "300% 300%",
            scale: 1.01,
          }}
          whileDrag={{
            scale: 1.05,
            boxShadow: `
                rgba(255, 255, 255, 0.3) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0.15) 2px 2px 4px,    
                rgba(0, 0, 0, 0.08) 4px 4px 8px   
              `,
            borderRight: "1px solid rgba(0,0,0,0.1)",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            backdropFilter: "blur(3px)",
            background:
              "linear-linear(94deg, rgba(232,232,232,0.3) 0%, rgba(242,228,213,0.3) 76%, rgba(222,222,222,0.3) 101%)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full md:w-[800px] h-auto text-gray-700 dark:text-gray-300 glass-card overflow-hidden group"
        >
          {cardContent}
        </motion.div>
      )}

      {/* Modal Card */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-45%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-45%" }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ willChange: "transform, opacity" }}
            className="fixed top-1/2 left-1/2 w-[90vw] md:w-[900px] max-w-[900px] max-h-[90vh] glass-card bg-white dark:bg-gray-900 overflow-auto z-70"
          >
            {cardContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}