import { useState, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ChevronDown, ChevronUp } from "lucide-react";

// Import icons locally for better performance
import html5Icon from "../../assets/icons/html5.svg";
import css3Icon from "../../assets/icons/css3.svg";
import javascriptIcon from "../../assets/icons/javascript.svg";
import reactIcon from "../../assets/icons/react.svg";
import vueIcon from "../../assets/icons/vue.svg";
import svelteIcon from "../../assets/icons/svelte.svg";
import typescriptIcon from "../../assets/icons/typescript.svg";
import tailwindIcon from "../../assets/icons/tailwind.svg";
import phpIcon from "../../assets/icons/php.svg";
import laravelIcon from "../../assets/icons/laravel.svg";
import nodejsIcon from "../../assets/icons/nodejs.svg";
import mysqlIcon from "../../assets/icons/mysql.svg";
import firebaseIcon from "../../assets/icons/firebase.svg";
import flutterIcon from "../../assets/icons/flutter.svg";
import dartIcon from "../../assets/icons/dart.svg";
import javaIcon from "../../assets/icons/java.svg";
import androidstudioIcon from "../../assets/icons/androidstudio.svg";
import gitIcon from "../../assets/icons/git.svg";
import wordpressIcon from "../../assets/icons/wordpress.svg";
import vscodeIcon from "../../assets/icons/vscode.svg";

type SkillsSectionProps = {
  isDark: boolean;
};

interface Skill {
  name: string;
  iconUrl: string;
  color: string;
  category: string;
}

const SkillCard = memo(({ 
  skill, 
  index, 
}: { 
  skill: Skill; 
  index: number; 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      whileHover={{ y: -6, scale: 1.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative p-2 md:p-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-center mb-1.5">
        <motion.div
            animate={
              isHovered 
                ? {
                    scale: 1.2,
                    rotate: [0, -5, 5, -5, 0],
                    y: -3,
                  }
                : {
                    y: [0, -4, 0],
                  }
            }
            transition={
              isHovered
                ? {
                    duration: 0.5,
                    ease: "easeInOut",
                  }
                : {
                    y: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.1,
                    }
                  }
            }
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center"
          >
            {!imageLoaded && (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            )}
            <motion.img 
              src={skill.iconUrl} 
              alt={`${skill.name} icon`}
              className={`w-full h-full object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              animate={imageLoaded && !isHovered ? {
                scale: [1, 1.05, 1],
              } : {}}
              transition={{
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15,
                }
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
});

SkillCard.displayName = 'SkillCard';

export default function SkillSection({
  isDark,
}: SkillsSectionProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const skills: Skill[] = useMemo(() => [
    // Frontend
    { name: "HTML5", iconUrl: html5Icon, color: "#E34F26", category: "Frontend" },
    { name: "CSS3", iconUrl: css3Icon, color: "#1572B6", category: "Frontend" },
    { name: "JavaScript", iconUrl: javascriptIcon, color: "#F7DF1E", category: "Frontend" },
    { name: "React", iconUrl: reactIcon, color: "#61DAFB", category: "Frontend" },
    { name: "Vue.js", iconUrl: vueIcon, color: "#4FC08D", category: "Frontend" },
    { name: "Svelte", iconUrl: svelteIcon, color: "#FF3E00", category: "Frontend" },
    { name: "TypeScript", iconUrl: typescriptIcon, color: "#3178C6", category: "Frontend" },
    { name: "Tailwind", iconUrl: tailwindIcon, color: "#06B6D4", category: "Frontend" },
    
    // Backend
    { name: "PHP", iconUrl: phpIcon, color: "#777BB4", category: "Backend" },
    { name: "Laravel", iconUrl: laravelIcon, color: "#FF2D20", category: "Backend" },
    { name: "Node.js", iconUrl: nodejsIcon, color: "#339933", category: "Backend" },
    { name: "MySQL", iconUrl: mysqlIcon, color: "#4479A1", category: "Backend" },
    { name: "Firebase", iconUrl: firebaseIcon, color: "#FFCA28", category: "Backend" },
    
    // Mobile
    { name: "Flutter", iconUrl: flutterIcon, color: "#02569B", category: "Mobile" },
    { name: "Dart", iconUrl: dartIcon, color: "#0175C2", category: "Mobile" },
    { name: "Java", iconUrl: javaIcon, color: "#007396", category: "Mobile" },
    { name: "Android S.", iconUrl: androidstudioIcon, color: "#3DDC84", category: "Mobile" },
    
    // Tools
    { name: "Git", iconUrl: gitIcon, color: "#F05032", category: "Tools" },
    { name: "WordPress", iconUrl: wordpressIcon, color: "#21759B", category: "Tools" },
    { name: "VSCode", iconUrl: vscodeIcon, color: "#007ACC", category: "Tools" },
  ], []);

  const categories = useMemo(() => ["All", "Frontend", "Backend", "Mobile", "Tools"], []);

  const filteredSkills = useMemo(() => 
    activeCategory === "All" 
      ? skills 
      : skills.filter(skill => skill.category === activeCategory),
    [activeCategory, skills]
  );

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
          aria-label={showDetails ? "Collapse skills details" : "Expand skills details"}
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

      <div className="relative h-px bg-linear-to-r from-gray-300 dark:from-gray-600 to-transparent mt-3 mb-4" />

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
            aria-label={`Filter by ${category}`}
            aria-pressed={activeCategory === category}
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
            className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm z-60"
            onClick={() => setShowDetails(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {!showDetails && (
        <motion.div
          whileHover={{
            background: isDark
              ? "linear-gradient(135deg, #1c1c1c, #2a2a2a, #1c1c1c)"
              : "linear-gradient(135deg, #fbf5ea, #f3e4d0, #fbf5ea)",
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
            className="fixed top-1/2 left-1/2 w-[90vw] md:w-[900px] max-w-[900px] max-h-[90vh] glass-card bg-white dark:bg-gray-900 overflow-auto z-70"
          >
            {cardContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}