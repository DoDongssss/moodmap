import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  BriefcaseBusiness,
  CalendarDays,
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

type ExperienceSectionProps = {
  activeCard: string;
  isDark: boolean;
  isMobile: boolean;
  setActiveCard: (value: string) => void;
};

export default function ExperienceSection({
  activeCard,
  isDark,
  isMobile,
  setActiveCard,
}: ExperienceSectionProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const cardContent = (
    <div className="w-full flex flex-col text-gray-700 dark:text-gray-300 p-3 md:p-4">
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <BriefcaseBusiness size={18} className="text-gray-800 dark:text-gray-200 md:w-5 md:h-5" strokeWidth={3} />
            <h1 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100">Experience</h1>
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
          </div>
        </div>
        <div className="relative h-px bg-linear-to-r from-gray-300 dark:from-gray-600 to-transparent mt-3 mb-4"></div>
      </div>

      <div className="flex flex-col">
        {/* SD Solutions */}
        <div className="flex items-start gap-2 mb-3">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-[10px] md:text-xs">S</span>
          </div>
          <div>
            <h2 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">
              SD Solutions I.T. Outsourcing, Inc.
            </h2>
            <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">Nov 2023 – Present (2 yrs)</p>
            <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">Pasig City, Philippines</p>
          </div>
        </div>

        <div className="relative ml-3 md:ml-4 mb-6">
          <div className="relative">
            <div className="ml-2 flex flex-col gap-0.5">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <h2 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">Full Stack Developer</h2>
                <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[9px] md:text-[10px] font-medium rounded-full">
                  Full-time
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays size={12} className="text-gray-600 dark:text-gray-400 shrink-0" strokeWidth={3} />
                <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">Nov 2023 - Present · 2 yrs</p>
              </div>
              <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">Remote</p>
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      height: { duration: 0.5, ease: "easeOut" },
                      opacity: { duration: 0.4, ease: "easeOut" }
                    }}
                    style={{ overflow: "hidden", willChange: "height, opacity" }}
                  >
                    <div className="mt-2 flex flex-col gap-2 pl-1 border-l-2 border-blue-200 dark:border-blue-700">
                      <div className="flex flex-col gap-1 pl-2">
                        <p className="text-[11px] md:text-xs font-semibold text-gray-700 dark:text-gray-300">Key Projects:</p>
                        <ul className="space-y-1.5 text-[11px] md:text-[.72rem] font-medium text-gray-600 dark:text-gray-400 leading-5">
                          <li className="flex items-start gap-1">
                            <span className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0">▸</span>
                            <span>
                              <strong className="text-gray-700 dark:text-gray-300">Payment Gateway Plugins:</strong> Developed Shopify and Magento plugins
                              for payment processing using React and Laravel
                            </span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0">▸</span>
                            <span>
                              <strong className="text-gray-700 dark:text-gray-300">School Management System:</strong> Full-stack developer in large team
                              project, implementing features and bug fixes with React, Blade, and Laravel
                            </span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0">▸</span>
                            <span>
                              <strong className="text-gray-700 dark:text-gray-300">Property Management System:</strong> Built property management features
                              using Laravel framework
                            </span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0">▸</span>
                            <span>
                              <strong className="text-gray-700 dark:text-gray-300">BTSI Project (bicolisarog.com):</strong> Maintaining and developing features
                              for this Laravel-based system
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* EULAP */}
        <div className="flex items-start gap-2 mb-3">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-linear-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-[10px] md:text-xs">E</span>
          </div>
          <div>
            <h2 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">EULAP</h2>
            <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">May 2023 – Oct 2023 (6 mos)</p>
            <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">Philippines</p>
          </div>
        </div>

        <div className="relative ml-3 md:ml-4 mb-6">
          <div className="relative">
            <div className="ml-2 flex flex-col gap-0.5">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <h2 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">Web Developer</h2>
                <span className="px-2 py-0.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[9px] md:text-[10px] font-medium rounded-full">
                  Full-time
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays size={12} className="text-gray-600 dark:text-gray-400 shrink-0" strokeWidth={3} />
                <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">May 2023 - Oct 2023 · 6 mos</p>
              </div>
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      height: { duration: 0.5, ease: "easeOut" },
                      opacity: { duration: 0.4, ease: "easeOut" }
                    }}
                    style={{ overflow: "hidden", willChange: "height, opacity" }}
                  >
                    <div className="mt-2 flex flex-col gap-2 pl-1 border-l-2 border-green-200 dark:border-green-700">
                      <div className="flex flex-col gap-1 pl-2">
                        <p className="text-[11px] md:text-xs font-semibold text-gray-700 dark:text-gray-300">Commercial Websites:</p>
                        <ul className="space-y-1.5 text-[11px] md:text-[.72rem] font-medium text-gray-600 dark:text-gray-400 leading-5">
                          <li className="flex items-start gap-1">
                            <span className="text-green-500 dark:text-green-400 mt-0.5 shrink-0">▸</span>
                            <span>
                              <strong className="text-gray-700 dark:text-gray-300">LKCCI:</strong> Corporate website (lkcci.vercel.app)
                            </span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-green-500 dark:text-green-400 mt-0.5 shrink-0">▸</span>
                            <span>
                              <strong className="text-gray-700 dark:text-gray-300">ARPCI:</strong> Staging website (stag-arpci.vercel.app)
                            </span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-green-500 dark:text-green-400 mt-0.5 shrink-0">▸</span>
                            <span>
                              <strong className="text-gray-700 dark:text-gray-300">EULAP SMS:</strong> School management site (eulapsms.vercel.app)
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Ideahub Solutions */}
        <div className="flex items-start gap-2 mb-3">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-linear-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-[10px] md:text-xs">I</span>
          </div>
          <div>
            <h2 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">Ideahub Solutions Inc.</h2>
            <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">2022 (6 mos)</p>
            <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">Philippines</p>
          </div>
        </div>

        <div className="relative ml-3 md:ml-4">
          <div className="relative">
            <div className="ml-2 flex flex-col gap-0.5">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <h2 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">Web Developer Intern</h2>
                <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[9px] md:text-[10px] font-medium rounded-full">
                  Internship
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays size={12} className="text-gray-600 dark:text-gray-400 shrink-0" strokeWidth={3} />
                <p className="text-[11px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">2022 · 6 mos</p>
              </div>
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      height: { duration: 0.5, ease: "easeOut" },
                      opacity: { duration: 0.4, ease: "easeOut" }
                    }}
                    style={{ overflow: "hidden", willChange: "height, opacity" }}
                  >
                    <div className="mt-2 flex flex-col gap-2 pl-1 border-l-2 border-purple-200 dark:border-purple-700">
                      <div className="flex flex-col gap-1 pl-2">
                        <p className="text-[11px] md:text-xs font-semibold text-gray-700 dark:text-gray-300">OJT Projects:</p>
                        <ul className="space-y-1.5 text-[11px] md:text-[.72rem] font-medium text-gray-600 dark:text-gray-400 leading-5">
                          <li className="flex items-start gap-1">
                            <span className="text-purple-500 dark:text-purple-400 mt-0.5 shrink-0">▸</span>
                            <span>
                              <strong className="text-gray-700 dark:text-gray-300">Dockoto Landing Page:</strong> Built product landing page using
                              WordPress and Magento builder (dockoto.com)
                            </span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-purple-500 dark:text-purple-400 mt-0.5 shrink-0">▸</span>
                            <span>
                              <strong className="text-gray-700 dark:text-gray-300">AWG Law Website:</strong> Maintenance team member - fixed bugs and added
                              features on WordPress (awglaw.com)
                            </span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-purple-500 dark:text-purple-400 mt-0.5 shrink-0">▸</span>
                            <span>
                              <strong className="text-gray-700 dark:text-gray-300">Multimedia Project:</strong> Started development but not completed before
                              OJT end
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
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
          onDragStart={() => setActiveCard("experience")}
          onDragEnd={() => setActiveCard("")}
          style={{ zIndex: activeCard === "experience" ? 50 : 10 }}
          whileHover={{
            background: isDark
              ? "linear-gradient(135deg, #1c1c1c, #2a2a2a, #1c1c1c)"
              : "linear-gradient(135deg, #fbf5ea, #f3e4d0, #fbf5ea)",
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