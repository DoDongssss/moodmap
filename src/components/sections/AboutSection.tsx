import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Circle, ChevronDown, ChevronUp, Braces, Server, Database, GitBranch, Shield,  Trello, X } from "lucide-react"; 
import me from "../../assets/me.jpg";
import avatar from "../../assets/avatar.jpg";

type AboutSectionProps = {
  activeCard: string;
  isDark: boolean;
  setActiveCard: (card: string) => void;
};

export default function AboutSection({
  activeCard,
  isDark,
  setActiveCard,
}: AboutSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const ExpertiseTag = ({
    icon: Icon,
    text,
  }: { icon: any; text: string }) => (
    <motion.div
      whileHover={{
        y: -2,
      }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex items-center gap-2 md:gap-3 p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-pointer"
    >
      <Icon size={16} strokeWidth={2.5} className="text-gray-700 dark:text-gray-300 shrink-0" />
      <span className="text-[10px] md:text-[11px] font-light">{text}</span>
    </motion.div>
  );
  
  const expertiseData = [
    { icon: Braces, text: "Frontend Development" },
    { icon: Server, text: "Backend Development" },
    { icon: Trello, text: "API Integration" },
    { icon: Database, text: "Database Design" },
    { icon: Shield, text: "Security" },
    { icon: GitBranch, text: "Version Control" },
  ];

  const cardContent = (
    <div className="w-full p-3 md:p-4">
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6">
        <div
          className="h-[100px] w-[100px] md:h-[115px] md:min-w-[115px] mx-auto md:mx-0 overflow-hidden rounded-md cursor-pointer relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={isHovered ? "avatar" : "me"}
              src={isHovered ? avatar : me}
              alt="Profile"
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.05, rotate: 2 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute inset-0 h-full w-full object-cover rounded-md"
            />
          </AnimatePresence>
        </div>

        <div className="flex-1 flex flex-col justify-between gap-2 md:gap-0">
          <div className="flex flex-col md:flex-row gap-2 md:gap-1 items-center md:items-center text-sm">
            <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 text-center md:text-left">
              Asumbra, Johnny A.
            </span>
            <div className="flex items-center gap-1 py-1 px-2 border border-orange-300 dark:border-orange-600 rounded-full text-[0.6rem] md:text-[0.65rem] shadow-sm hover:shadow-md transition-all duration-300">
              <Circle
                size={10}
                color="oklch(83.7% 0.128 66.29)"
                strokeWidth={3}
                className="fill-orange-400 text-orange-400 animate-pulse"
              />
              <span className="font-medium text-gray-600 dark:text-gray-300">Hustle Mode On</span>
            </div>
          </div>
          <div className="flex gap-1 items-center justify-center md:justify-start text-sm">
            <MapPin size={14} className="text-gray-500 dark:text-gray-400" />
            <span className="text-[11px] md:text-[12px] font-light text-gray-600 dark:text-gray-400">
              Tampakan, South Cotabato
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-1 md:mt-3">
            <span className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200">
              Full Stack Developer
            </span>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
            <button className="flex gap-1 items-center justify-center bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 md:px-2 md:py-1 rounded-sm text-[.65rem] md:text-[.7rem] font-light transition-all duration-300 hover:bg-[#222] dark:hover:bg-gray-200 hover:scale-105 hover:shadow-md">
              <span>📄</span>
              <span>Download CV</span>
            </button>

            <button className="flex gap-1 items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-3 py-1.5 md:px-2 md:py-1 rounded-sm text-[.65rem] md:text-[.7rem] font-light transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white hover:scale-105 hover:shadow-md">
              <Mail size={10} className="text-gray-800 dark:text-gray-200" />
              <span>Send Email</span>
            </button>

            <button className="flex gap-1 items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-3 py-1.5 md:px-2 md:py-1 rounded-sm text-[.65rem] md:text-[.7rem] font-light transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white hover:scale-105 hover:shadow-md">
              <Phone size={10} className="text-gray-800 dark:text-gray-200" />
              <span>Call Me</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative h-px bg-linear-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-4 md:my-6"></div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-1">
            <span className="w-1 h-3 md:h-4 bg-linear-to-b from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-600 rounded-full"></span>
            About Me
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleDetails}
              className="flex items-center gap-1 px-2 py-1 text-[.6rem] md:text-[.65rem] font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {showDetails ? (
                <>
                  <ChevronUp size={14} strokeWidth={2.5} />
                  <span className="hidden sm:inline">Hide Details</span>
                </>
              ) : (
                <>
                  <ChevronDown size={14} strokeWidth={2.5} />
                  <span className="hidden sm:inline">Show Details</span>
                </>
              )}
            </button>
            <AnimatePresence>
              {showDetails && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setShowDetails(false)}
                  className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  <X size={16} strokeWidth={2.5} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        <p className="text-xs md:text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
          Welcome to my portfolio! I'm a{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-300">Full Stack Developer</span>{" "}
          fluent in React, Vue, and Laravel, with over{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            2 years of professional experience
          </span>{" "}
          building scalable, user-focused web applications.
        </p>
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ 
                height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.2, ease: "easeOut" }
              }}
              style={{ overflow: "hidden", willChange: "height, opacity" }}
            >
              <div className="space-y-3">
                <p className="text-xs md:text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                  I specialize in creating elegant, high-performance solutions that balance thoughtful
                  design with real-world functionality. Explore my work, freedom wall, and professional
                  background, and let's connect to collaborate on exciting projects. Thank you for visiting!
                </p>
              </div>
              {/* KEY EXPERTISE SECTION */}
              <div className="mt-6 md:mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm md:text-base font-semibold italic text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    Key Expertise :  
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {expertiseData.map((item, index) => (
                    <ExpertiseTag key={index} icon={item.icon} text={item.text} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
          drag
          dragMomentum={false}
          dragElastic={0.1}
          onDragStart={() => setActiveCard("about")}
          onDragEnd={() => setActiveCard("")}
          style={{ zIndex: activeCard === "about" ? 50 : 10 }}
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
          <div className="absolute min-w-[6px] h-[6px] top-2 right-2 rounded-full bg-gray-400 dark:bg-gray-600 z-10"></div>
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
            className="fixed top-1/2 left-1/2 w-[90vw] md:w-[850px] max-w-[850px] max-h-[90vh] glass-card bg-white dark:bg-gray-900 overflow-auto z-70"
          >
            <div className="absolute min-w-[6px] h-[6px] top-2 right-2 rounded-full bg-gray-400 dark:bg-gray-600 z-10"></div>
            {cardContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}