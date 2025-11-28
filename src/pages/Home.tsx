import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeaderSection from "../components/sections/HeaderSection";
import AboutSection from "../components/sections/AboutSection";
import EducationSection from "../components/sections/EducationSection";
import ExperienceSection from "../components/sections/ExperienceSection";

export default function Home() {
  const [activeCard, setActiveCard] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] =  useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      className="relative min-h-screen w-full overflow-y-auto py-6 px-4 md:px-6"
      initial={{ backgroundColor: "#ffffff" }}
      animate={{ backgroundColor: isDark ? "#000000" : "#ffffff" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Background Image - Always visible */}
      <div
        className="absolute inset-0 rounded-[inherit]
                   bg-[url('./assets/home_background.png')]
                   bg-repeat bg-position-[center_top]
                   bg-size-[648px_auto]
                   border-0 opacity-100"
      ></div>

      {/* Animated overlay for light mode */}
      <motion.div
        className="absolute inset-0 rounded-[inherit]
                   bg-[url('./assets/home_background.png')]
                   bg-repeat bg-position-[center_top]
                   bg-size-[648px_auto]
                   border-0 opacity-100"
        initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        animate={{ 
          clipPath: isDark 
            ? "polygon(100% 100%, 100% 100%, 100% 100%)" 
            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      ></motion.div>

      <div className="relative z-10 flex flex-col items-center gap-4 h-full text-white text-4xl font-bold max-w-[800px] mx-auto">

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <HeaderSection activeCard={activeCard} isDark={isDark} isMobile={isMobile} setActiveCard={setActiveCard}  />
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AboutSection activeCard={activeCard} isDark={isDark} isMobile={isMobile}  setActiveCard={setActiveCard} />
        </motion.div>

        <motion.div
          className="w-full flex flex-col md:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <EducationSection activeCard={activeCard} isDark={isDark} isMobile={isMobile}  setActiveCard={setActiveCard} />
          <ExperienceSection activeCard={activeCard} isDark={isDark} isMobile={isMobile}  setActiveCard={setActiveCard} />
        </motion.div>
      </div>
    </motion.div>
  );
}