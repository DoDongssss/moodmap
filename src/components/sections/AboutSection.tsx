import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Circle, ChevronDown, ChevronUp, Braces, Server, Database, GitBranch, Shield, Trello, User, X, Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"; 
import me from "../../assets/images/me.webp";
import avatar from "../../assets/images/avatar.webp";

type AboutSectionProps = {
  activeCard: string;
  isDark: boolean;
  isMobile: boolean;
  setActiveCard: (card: string) => void;
};

export default function AboutSection({
  activeCard,
  isDark,
  isMobile,
  setActiveCard,
}: AboutSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const [pdfZoom, setPdfZoom] = useState(100);

  const CV_GOOGLE_DRIVE_URL = "https://drive.google.com/file/d/18QWxUnskOEKvlW7hvqjEAuKWpmP4vKUY";
  const EMAIL = "your.dong.asumbra@gmail.com";
  const PHONE = "+639123456789";

  const handleDownloadCV = () => {
    setShowCVModal(true);
  };

  const handleSendEmail = () => {
    window.location.href = `mailto:${EMAIL}?subject=Hello Johnny&body=Hi Johnny, I would like to get in touch with you.`;
  };

  const handleCallMe = () => {
    window.location.href = `tel:${PHONE}`;
  };

  const handleDirectDownload = () => {
    const link = document.createElement('a');
    link.href = `${CV_GOOGLE_DRIVE_URL}/export?format=pdf`;
    link.download = 'Johnny_Asumbra_CV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setPdfZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setPdfZoom(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setPdfZoom(100);
  };

  const ExpertiseTag = ({ icon: Icon, text }: { icon: any; text: string }) => (
    <motion.div
      whileHover={{ y: -2 }}
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
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 h-full w-full object-cover rounded-md"
            />
          </AnimatePresence>
        </div>

        <div className="flex-1 flex flex-col justify-between gap-2 md:gap-0">
          <div className="flex flex-col md:flex-row gap-2 md:gap-1 items-center md:items-center text-sm">
            <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 text-center md:text-left">
              Asumbra, Johnny A.
            </span>
            <motion.div 
              className="flex items-center gap-1 py-1 px-2 border border-green-300 dark:border-green-600 rounded-full text-[0.6rem] md:text-[0.65rem] shadow-sm"
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(34, 197, 94, 0)",
                  "0 0 0 4px rgba(34, 197, 94, 0.1)",
                  "0 0 0 0 rgba(34, 197, 94, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Circle
                  size={10}
                  strokeWidth={3}
                  className="fill-green-500 text-green-500"
                />
              </motion.div>
              <span className="font-medium text-green-600 dark:text-green-400">Available</span>
            </motion.div>
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
          
          <div className="w-full flex flex-col gap-2 mt-2 justify-center md:justify-normal sm:flex-row md:gap-2">
            <button 
              onClick={handleDownloadCV}
              className="flex gap-1 items-center justify-center whitespace-nowrap bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 md:px-2 md:py-1 rounded-sm text-[.65rem] md:text-[.7rem] font-light transition-all duration-300 hover:bg-[#222] dark:hover:bg-gray-200 hover:scale-105 hover:shadow-md"
            >
              <span>📄</span>
              <span>Download CV</span>
            </button>

            <div className="flex gap-2">
              <button 
                onClick={handleSendEmail}
                className="flex flex-1 md:flex-none gap-1 items-center justify-center whitespace-nowrap bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-3 py-1.5 md:px-2 md:py-1 rounded-sm text-[.65rem] md:text-[.7rem] font-light transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white hover:scale-105 hover:shadow-md"
              >
                <Mail size={14} className="text-gray-800 dark:text-gray-200" />
                <span>Send Email</span>
              </button>

              <button 
                onClick={handleCallMe}
                className="flex flex-1 md:flex-none gap-1 items-center justify-center whitespace-nowrap bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-3 py-1.5 md:px-2 md:py-1 rounded-sm text-[.65rem] md:text-[.7rem] font-light transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white hover:scale-105 hover:shadow-md"
              >
                <Phone size={14} className="text-gray-800 dark:text-gray-200" />
                <span>Call Me</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-px bg-linear-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-4 md:my-6"></div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <User size={18} strokeWidth={2.5} className="text-gray-700 dark:text-gray-300" />
            About Me
          </h2>
          <button
            onClick={() => setShowDetails(!showDetails)}
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
                height: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.25, ease: "easeOut" }
              }}
              style={{ overflow: "hidden", willChange: "height, opacity" }}
            >
              <div className="space-y-3">
                <p className="text-xs md:text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                  I specialize in creating elegant, high-performance solutions that balance thoughtful
                  design with real-world functionality. Explore my work, gallery, freedom wall, and professional
                  background, and let's connect to collaborate on exciting projects. Thank you for visiting!
                </p>
              </div>
              
              <div className="mt-6 md:mt-8">
                <h2 className="text-sm md:text-base font-semibold italic text-gray-800 dark:text-gray-200">
                  Key Expertise:
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
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

      <AnimatePresence>
        {showCVModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-80"
              onClick={() => setShowCVModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-1/2 left-1/2 w-[95vw] h-[90vh] md:w-[90vw] md:h-[85vh] max-w-[1200px] bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden z-90 flex flex-col"
            >
              <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <h3 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100">
                  My CV - Johnny Asumbra
                </h3>
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <button
                      onClick={handleZoomOut}
                      className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 min-w-[50px] text-center">
                      {pdfZoom}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn size={16} />
                    </button>
                    <button
                      onClick={handleResetZoom}
                      className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors ml-1"
                      title="Reset Zoom"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                  <button
                    onClick={handleDirectDownload}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-gray-800 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
                  >
                    <Download size={14} />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                  <button
                    onClick={() => setShowCVModal(false)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-800">
                <div 
                  className="min-h-full w-contain flex items-start justify-center p-4"
                  style={{
                    transform: `scale(${pdfZoom / 100})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <iframe
                    src={`${CV_GOOGLE_DRIVE_URL}/preview`}
                    className="w-full h-[1100px] md:h-[1400px] bg-white shadow-lg"
                    title="CV Preview"
                    allow="autoplay"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!showDetails && (
        <motion.div
          drag={!isMobile} 
          dragMomentum={!isMobile}
          dragElastic={!isMobile ? 0.1 : 0}
          onDragStart={() => setActiveCard("about")}
          onDragEnd={() => setActiveCard("")}
          style={{ zIndex: activeCard === "about" ? 50 : 10 }}
          whileHover={{
            background: isDark
              ? "linear-gradient(135deg, #1c1c1c, #2a2a2a, #1c1c1c)"
              : "linear-gradient(135deg, #fbf5ea, #f3e4d0, #fbf5ea)"
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
        {showDetails && !showCVModal && (
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
            {cardContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}