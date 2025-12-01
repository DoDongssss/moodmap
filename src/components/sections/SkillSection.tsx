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
  iconUrl: string;
  color: string;
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
      transition={{ delay: index * 0.03, duration: 0.3 }}
      whileHover={{ y: -6, scale: 1.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative p-2 md:p-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-center mb-1.5">
          <motion.div
            animate={isHovered ? {
              scale: 1.2,
              rotate: [0, 10],
              y: [0, -3],
            } : {
              scale: 1,
              rotate: 0,
              y: 0,
            }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center"
          >
            <motion.img 
              src={skill.iconUrl} 
              alt={skill.name}
              className="w-full h-full object-contain"
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2.5 + (index * 0.2),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        <h3 className="text-center text-[9px] md:text-[10px] font-semibold text-gray-800 dark:text-gray-200 leading-tight">
          {skill.name}
        </h3>
        
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              boxShadow: `0 0 15px ${skill.color}50, 0 0 25px ${skill.color}30`
            }}
          />
        )}
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
    { name: "HTML5", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#E34F26", category: "Frontend" },
    { name: "CSS3", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572B6", category: "Frontend" },
    { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E", category: "Frontend" },
    { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB", category: "Frontend" },
    { name: "Vue.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", color: "#4FC08D", category: "Frontend" },
    { name: "Svelte", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg", color: "#FF3E00", category: "Frontend" },
    { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6", category: "Frontend" },
    { name: "Tailwind", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4", category: "Frontend" },
    
    // Backend
    { name: "PHP", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", color: "#777BB4", category: "Backend" },
    { name: "Laravel", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", color: "#FF2D20", category: "Backend" },
    { name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933", category: "Backend" },
    { name: "MySQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479A1", category: "Backend" },
    { name: "Firebase", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "#FFCA28", category: "Backend" },
    
    // Mobile
    { name: "Flutter", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", color: "#02569B", category: "Mobile" },
    { name: "Dart", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", color: "#0175C2", category: "Mobile" },
    { name: "Java", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#007396", category: "Mobile" },
    { name: "Android S.", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg", color: "#3DDC84", category: "Mobile" },
    
    // Tools
    { name: "Git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032", category: "Tools" },
    { name: "WordPress", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg", color: "#21759B", category: "Tools" },
    { name: "VSCode", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", color: "#007ACC", category: "Tools" },
  ];

  const categories = ["All", "Frontend", "Backend", "Mobile", "Tools"];

  const filteredSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const cardContent = (
    <div className="w-full p-3 md:p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code2 size={20} className="text-gray-800 dark:text-gray-200 md:w-[22px] md:h-[22px]" strokeWidth={2.5} />
          <h1 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">
            Skills & Technologies
          </h1>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
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

      <div className="relative h-px bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent mt-3 mb-4"></div>

      <div className="flex flex-wrap justify-center gap-2 mb-5">
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

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2 md:gap-2.5">
        {filteredSkills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>

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
                I've honed my skills through extensive hands-on experience in frontend, backend, and mobile development. 
                My proficiency spans across modern frameworks like React, Vue.js, and Svelte for frontend development, 
                along with robust backend solutions using Laravel, Node.js, and Firebase.
              </p>
              <p className="text-xs md:text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                Each skill reflects real-world project experience and continuous learning. From building responsive web 
                applications with Tailwind CSS to developing mobile apps with Flutter, Java, and Android Studio, I leverage 
                the right tools for every project. My expertise also extends to database management, version control, and 
                deployment workflows.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ willChange: "opacity" }}
            className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm z-[60]"
            onClick={() => setShowDetails(false)}
          />
        )}
      </AnimatePresence>

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
              "linear-gradient(94deg, rgba(232,232,232,0.3) 0%, rgba(242,228,213,0.3) 76%, rgba(222,222,222,0.3) 101%)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full md:w-[800px] h-auto text-gray-700 dark:text-gray-300 glass-card overflow-hidden group"
        >
          {cardContent}
        </motion.div>
      )}

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
            className="fixed top-1/2 left-1/2 w-[90vw] md:w-[900px] max-w-[900px] max-h-[90vh] glass-card bg-white dark:bg-gray-900 overflow-auto z-[70]"
          >
            {cardContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}