import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Loader from "../components/ui/Loader";
import HeaderSection from "../components/sections/HeaderSection";
import AboutSection from "../components/sections/AboutSection";
import EducationSection from "../components/sections/EducationSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import SkillSection from "../components/sections/SkillSection";
import ProjectsSection from "../components/sections/ProjectSection";
import ContactSection from "../components/sections/ContactSection";
import FreedomWallSection from "../components/sections/FreedomWallSection";
import GallerySection from "../components/sections/GallerySection";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [activeCard, setActiveCard] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <motion.div 
      className="relative min-h-screen w-full overflow-y-auto py-6 px-4 md:px-6"
      initial={{ backgroundColor: "#ffffff", opacity: 0 }}
      animate={{ 
        backgroundColor: isDark ? "#000000" : "#ffffff",
        opacity: 1
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div
        className="absolute inset-0 rounded-[inherit]
                   bg-[url('./assets/home_background.png')]
                   bg-repeat bg-position-[center_top]
                   bg-size-[648px_auto]
                   border-0 opacity-100"
      ></div>

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

      <div className="relative z-10 flex flex-col items-center gap-4 h-full text-white text-4xl max-w-[800px] mx-auto">

        <AnimatedSection className="w-full">
          <HeaderSection activeCard={activeCard} isDark={isDark} isMobile={isMobile} setActiveCard={setActiveCard} />
        </AnimatedSection>

        <AnimatedSection className="w-full">
          <AboutSection activeCard={activeCard} isDark={isDark} isMobile={isMobile} setActiveCard={setActiveCard} />
        </AnimatedSection>

        <AnimatedSection className="w-full">
          <div className="w-full flex flex-col md:flex-row gap-4">
            <EducationSection activeCard={activeCard} isDark={isDark} isMobile={isMobile} setActiveCard={setActiveCard} />
            <ExperienceSection activeCard={activeCard} isDark={isDark} isMobile={isMobile} setActiveCard={setActiveCard} />
          </div>
        </AnimatedSection>

        <AnimatedSection className="w-full">
          <SkillSection activeCard={activeCard} isDark={isDark} isMobile={isMobile} setActiveCard={setActiveCard} />
        </AnimatedSection>

        <AnimatedSection className="w-full">
          <ProjectsSection activeCard={activeCard} isDark={isDark} isMobile={isMobile} setActiveCard={setActiveCard} />
        </AnimatedSection>

        <AnimatedSection className="w-full">
          <GallerySection activeCard={activeCard} isDark={isDark} isMobile={isMobile} setActiveCard={setActiveCard} />
        </AnimatedSection>

        <AnimatedSection className="w-full">
          <FreedomWallSection activeCard={activeCard} isDark={isDark} isMobile={isMobile} setActiveCard={setActiveCard} />
        </AnimatedSection>

        <AnimatedSection className="w-full">
          <ContactSection activeCard={activeCard} isDark={isDark} isMobile={isMobile} setActiveCard={setActiveCard} />
        </AnimatedSection>
      </div>
    </motion.div>
  );
}