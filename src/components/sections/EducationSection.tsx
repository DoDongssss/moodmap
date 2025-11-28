import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  BookOpen,
  ChevronUp,
  ChevronDown,
  GraduationCap,
  CalendarDays,
  X,
} from "lucide-react";

const dragStyles = {
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
};

type EducationSectionProps = {
  activeCard: string;
  isDark: boolean;
  isMobile: boolean;
  setActiveCard: (value: string) => void;
};

export default function EducationSection({
  activeCard,
  isDark,
  isMobile,
  setActiveCard,
}: EducationSectionProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const cardContent = (
    <div className="w-full flex flex-col text-gray-700 dark:text-gray-300 p-3 md:p-4">
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <GraduationCap size={18} className="text-gray-800 dark:text-gray-200 md:w-5 md:h-5" strokeWidth={3} />
            <h1 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100">Education</h1>
          </div>
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
        <div className="relative h-px bg-linear-to-r from-gray-300 dark:from-gray-600 to-transparent mt-3 mb-4"></div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">Bachelor of Science in Information Tech</h2>
          <h3 className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">- Notre Dame of Marbel University</h3>
          <div className="flex items-center gap-1">
            <CalendarDays size={12} className="text-gray-600 dark:text-gray-400" strokeWidth={3} />
            <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">July 2019-2023</p>
          </div>
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
                <div className="mt-2 flex flex-col gap-1.5 pl-1 border-l-2 border-blue-200 dark:border-blue-700">
                  <div className="flex items-center gap-1 pl-2">
                    <MapPin size={10} className="text-gray-600 dark:text-gray-400 shrink-0" strokeWidth={3} />
                    <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">
                      Koronadal City, South Cotabato
                    </p>
                  </div>
                  <div className="flex items-start gap-1 pl-2">
                    <BookOpen size={10} className="text-gray-600 dark:text-gray-400 mt-0.5 shrink-0" strokeWidth={3} />
                    <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">
                      Software Development, Database Management, Web Technologies
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">STI College Koronadal</h2>
          <h3 className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">- ICT in Mobile and Web Development</h3>
          <div className="flex items-center gap-1">
            <CalendarDays size={12} className="text-gray-600 dark:text-gray-400" strokeWidth={3} />
            <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">July 2017-2019</p>
          </div>
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
                <div className="mt-2 flex flex-col gap-1.5 pl-1 border-l-2 border-green-200 dark:border-green-700">
                  <div className="flex items-center gap-1 pl-2">
                    <MapPin size={10} className="text-gray-600 dark:text-gray-400 shrink-0" strokeWidth={3} />
                    <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">
                      Koronadal City, South Cotabato
                    </p>
                  </div>
                  <div className="flex items-start gap-1 pl-2">
                    <BookOpen size={10} className="text-gray-600 dark:text-gray-400 mt-0.5 shrink-0" strokeWidth={3} />
                    <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">
                      Mobile App Development, Web Design, Programming Fundamentals
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">High School</h2>
          <h3 className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">- Tampakan National High School</h3>
          <div className="flex items-center gap-1">
            <CalendarDays size={12} className="text-gray-600 dark:text-gray-400" strokeWidth={3} />
            <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">July 2013-2017</p>
          </div>
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
                <div className="mt-2 flex flex-col gap-1.5 pl-1 border-l-2 border-purple-200 dark:border-purple-700">
                  <div className="flex items-center gap-1 pl-2">
                    <MapPin size={10} className="text-gray-600 dark:text-gray-400 shrink-0" strokeWidth={3} />
                    <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">
                      Tampakan, South Cotabato
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">Elementary School</h2>
          <h3 className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">- Lanton Elementary School</h3>
          <div className="flex items-center gap-1">
            <CalendarDays size={12} className="text-gray-600 dark:text-gray-400" strokeWidth={3} />
            <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">July 2007-2013</p>
          </div>
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
                <div className="mt-2 flex flex-col gap-1.5 pl-1 border-l-2 border-orange-200 dark:border-orange-700">
                  <div className="flex items-center gap-1 pl-2">
                    <MapPin size={10} className="text-gray-600 dark:text-gray-400 shrink-0" strokeWidth={3} />
                    <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">
                      PUROK-5 LANTON, E Salamanca Ave, General Santos City
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
          drag={!isMobile} 
          dragMomentum={!isMobile}
          dragElastic={!isMobile ? 0.1 : 0}
          onDragStart={() => setActiveCard("education")}
          onDragEnd={() => setActiveCard("")}
          style={{ zIndex: activeCard === "education" ? 50 : 10 }}
          whileHover={{
            background: isDark
              ? "linear-gradient(135deg, #1c1c1c, #2a2a2a, #1c1c1c)"
              : "linear-gradient(135deg, #fbf5ea, #f3e4d0, #fbf5ea)",
            backgroundSize: "300% 300%",
            scale: 1.01,
          }}  
          whileDrag={dragStyles}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="h-full w-full md:w-[400px] glass-card overflow-auto"
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
            className="fixed top-1/2 left-1/2 w-[90vw] md:w-[600px] max-w-[600px] max-h-[90vh] glass-card bg-white dark:bg-gray-900 overflow-auto z-70"
          >
            {cardContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}