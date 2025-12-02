import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { debounce, rafThrottle } from '../utils/performanceOptimizations';
import Loader from "../components/ui/Loader";
import HeaderSection from "../components/sections/HeaderSection";
import AboutSection from "../components/sections/AboutSection";
import EducationSection from "../components/sections/EducationSection";
import ExperienceSection from "../components/sections/ExperienceSection";

const SkillSection = lazy(() => import("../components/sections/SkillSection"));
const ProjectsSection = lazy(() => import("../components/sections/ProjectSection"));
const GallerySection = lazy(() => import("../components/sections/GallerySection"));
const FreedomWallSection = lazy(() => import("../components/sections/FreedomWallSection"));
const ContactSection = lazy(() => import("../components/sections/ContactSection"));
const BackTotop = lazy(() => import('../components/ui/BackToTop'))

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2, 
    margin: "0px 0px -100px 0px" 
  });

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

const SectionFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1000);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = debounce(() => {
      rafThrottle(() => {
        setIsMobile(window.innerWidth < 1000);
      })();
    }, 150);

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const checkTheme = rafThrottle(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    
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
    }, 1000);

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
                   bg-[url('./assets/images/home_background.webp')]
                   bg-repeat bg-position-[center_top]
                   bg-size-[648px_auto]
                   border-0 opacity-100"
      ></div>

      <motion.div
        className="absolute inset-0 rounded-[inherit]
                   bg-[url('./assets/images/home_background.webp')]
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

      <div className="relative z-10 flex flex-col items-center gap-4 h-full max-w-[800px] mx-auto">

        <AnimatedSection className="w-full">
          <HeaderSection 
            isDark={isDark} 
          />
        </AnimatedSection>

        <AnimatedSection className="w-full">
          <AboutSection 
            isDark={isDark} 
          />
        </AnimatedSection>

        <AnimatedSection className="w-full">
          <div className="w-full flex flex-col md:flex-row gap-4">
            <EducationSection 
              isDark={isDark} 
            />
            <ExperienceSection 
              isDark={isDark} 
            />
          </div>
        </AnimatedSection>

        <Suspense fallback={<SectionFallback />}>

          <AnimatedSection className="w-full">
            <SkillSection 
              isDark={isDark} 
            />
          </AnimatedSection>

          <AnimatedSection className="w-full">
            <ProjectsSection 
              isDark={isDark}
              isMobile={isMobile}  
            />
          </AnimatedSection>

          <AnimatedSection className="w-full">
            <GallerySection 
              isDark={isDark} 
            />
          </AnimatedSection>

          <AnimatedSection className="w-full">
            <FreedomWallSection 
              isDark={isDark} 
            />
          </AnimatedSection>

          <AnimatedSection className="w-full">
            <ContactSection 
              isDark={isDark} 
            />
          </AnimatedSection>


          <BackTotop/>
        </Suspense>
      </div>
    </motion.div>
  );
}