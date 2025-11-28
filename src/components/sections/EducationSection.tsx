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
  setActiveCard: (value: string) => void;
};

export default function EducationSection({
  activeCard,
  setActiveCard,
}: EducationSectionProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const cardContent = (
    <div className="w-full flex flex-col text-gray-700">
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <GraduationCap size={20} color="#000000" strokeWidth={3} />
            <h1 className="text-base font-semibold text-gray-800">Education</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleDetails}
              className="flex items-center gap-1 px-2 py-1 text-[.65rem] font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
            >
              {showDetails ? (
                <>
                  <ChevronUp size={14} strokeWidth={2.5} />
                  <span>Less</span>
                </>
              ) : (
                <>
                  <ChevronDown size={14} strokeWidth={2.5} />
                  <span>More</span>
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
                  className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                >
                  <X size={16} strokeWidth={2.5} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="h-px bg-linear-to-r from-gray-300 to-transparent mt-3 mb-4"></div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-semibold text-gray-800">Bachelor of Science in Information Tech</h2>
          <h3 className="text-sm font-medium text-gray-700">- Notre Dame of Marbel University</h3>
          <div className="flex items-center gap-1">
            <CalendarDays size={13} color="#6a7282" strokeWidth={3} />
            <p className="text-xs text-gray-600 font-medium">July 2019-2023</p>
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
                <div className="mt-2 flex flex-col gap-1.5 pl-1 border-l-2 border-blue-200">
                  <div className="flex items-center gap-1 pl-2">
                    <MapPin size={11} color="#6a7282" strokeWidth={3} />
                    <p className="text-xs text-gray-600 font-medium">
                      Koronadal City, South Cotabato
                    </p>
                  </div>
                  <div className="flex items-start gap-1 pl-2">
                    <BookOpen size={11} color="#6a7282" strokeWidth={3} className="mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-600 font-medium">
                      Software Development, Database Management, Web Technologies
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-semibold text-gray-800">STI College Koronadal</h2>
          <h3 className="text-sm font-medium text-gray-700">- ICT in Mobile and Web Development</h3>
          <div className="flex items-center gap-1">
            <CalendarDays size={13} color="#6a7282" strokeWidth={3} />
            <p className="text-xs text-gray-600 font-medium">July 2017-2019</p>
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
                <div className="mt-2 flex flex-col gap-1.5 pl-1 border-l-2 border-green-200">
                  <div className="flex items-center gap-1 pl-2">
                    <MapPin size={11} color="#6a7282" strokeWidth={3} />
                    <p className="text-xs text-gray-600 font-medium">
                      Koronadal City, South Cotabato
                    </p>
                  </div>
                  <div className="flex items-start gap-1 pl-2">
                    <BookOpen size={11} color="#6a7282" strokeWidth={3} className="mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-600 font-medium">
                      Mobile App Development, Web Design, Programming Fundamentals
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-semibold text-gray-800">High School</h2>
          <h3 className="text-sm font-medium text-gray-700">- Tampakan National High School</h3>
          <div className="flex items-center gap-1">
            <CalendarDays size={13} color="#6a7282" strokeWidth={3} />
            <p className="text-xs text-gray-600 font-medium">July 2013-2017</p>
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
                <div className="mt-2 flex flex-col gap-1.5 pl-1 border-l-2 border-purple-200">
                  <div className="flex items-center gap-1 pl-2">
                    <MapPin size={11} color="#6a7282" strokeWidth={3} />
                    <p className="text-xs text-gray-600 font-medium">
                      Tampakan, South Cotabato
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-semibold text-gray-800">Elementary School</h2>
          <h3 className="text-sm font-medium text-gray-700">- Lanton Elementary School</h3>
          <div className="flex items-center gap-1">
            <CalendarDays size={13} color="#6a7282" strokeWidth={3} />
            <p className="text-xs text-gray-600 font-medium">July 2007-2013</p>
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
                <div className="mt-2 flex flex-col gap-1.5 pl-1 border-l-2 border-orange-200">
                  <div className="flex items-center gap-1 pl-2">
                    <MapPin size={11} color="#6a7282" strokeWidth={3} />
                    <p className="text-xs text-gray-600 font-medium">
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
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
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
          onDragStart={() => setActiveCard("education")}
          onDragEnd={() => setActiveCard("")}
          style={{ zIndex: activeCard === "education" ? 50 : 10 }}
          whileHover={{ background: "#fbf5ea" }}
          whileDrag={dragStyles}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="h-full w-[400px] glass-card overflow-auto"
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
              ease: [0.16, 1, 0.3, 1], // Smooth ease-out cubic bezier
            }}
            style={{ willChange: "transform, opacity" }}
            className="fixed top-1/2 left-1/2 w-[600px] max-h-[90vh] glass-card bg-white overflow-auto z-[70]"
          >
            {cardContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}