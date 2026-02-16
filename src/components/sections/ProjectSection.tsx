import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ChevronDown, ChevronUp, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

import portfolio_1 from "../../assets/images/projects/portfolio/1.jpg"
import portfolio_2 from "../../assets/images/projects/portfolio/2.jpg"
import portfolio_3 from "../../assets/images/projects/portfolio/3.jpg"

import pageant_1 from "../../assets/images/projects/pageant-tabulation/1.jpg"
import pageant_2 from "../../assets/images/projects/pageant-tabulation/2.jpg"
import pageant_3 from "../../assets/images/projects/pageant-tabulation/3.jpg"

import research_1 from "../../assets/images/projects/research-tabulation/1.jpg"
import research_2 from "../../assets/images/projects/research-tabulation/2.jpg"
import research_3 from "../../assets/images/projects/research-tabulation/3.jpg"

import pos_1 from "../../assets/images/projects/pos-inventory/1.jpg"
import pos_2 from "../../assets/images/projects/pos-inventory/2.jpg"
import pos_3 from "../../assets/images/projects/pos-inventory/3.jpg"

type ProjectsSectionProps = {
  isDark: boolean;
  isMobile: boolean;
};

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  images: string[];
  color: string;
  darkColor: string;
}

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
  background: "linear-gradient(94deg, rgba(232,232,232,0.3) 0%, rgba(242,228,213,0.3) 76%, rgba(222,222,222,0.3) 101%)",
};

const ProjectCard = ({
  project,
  index,
  isDark,
}: {
  project: Project;
  index: number;
  isDark: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isReversed = index % 2 === 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden">
        <div className={`flex flex-col md:flex-row ${isReversed ? "md:flex-row-reverse" : ""}`}>
          
          <div className="relative w-full md:w-auto overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-center justify-center p-3 "
            >
              <motion.img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.4 }}
                className="h-[150px] rounded-lg w-auto object-contain"
              />
            </motion.div>

            {/* Image Navigation Dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex
                      ? "bg-white w-4"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>

            {/* Image Navigation Arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} className="text-gray-800 dark:text-gray-200" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight size={16} className="text-gray-800 dark:text-gray-200" />
                </button>
              </>
            )}

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center gap-3"
                >
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ delay: 0.05, duration: 0.3, type: "spring" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-shadow"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={20} className="text-gray-800 dark:text-gray-200" />
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ delay: 0.1, duration: 0.3, type: "spring" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-shadow"
                      aria-label="View source code"
                    >
                      <Github size={20} className="text-gray-800 dark:text-gray-200" />
                    </motion.a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full md:flex-1 p-4 md:p-6 flex flex-col justify-center">
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight mb-1">
              {project.title}
            </h3>

            <p
              className="text-xs md:text-sm font-semibold mb-2"
              style={{ color: isDark ? project.darkColor : project.color }}
            >
              {project.subtitle}
            </p>

            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 font-medium bg-gray-100 dark:bg-gray-700 text-[9px] text-gray-700 dark:text-gray-300 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="h-1 origin-left"
          style={{ backgroundColor: isDark ? project.darkColor : project.color }}
        />
      </div>
    </motion.div>
  );
};

export default function ProjectsSection({
  isDark = false,
  isMobile = false,
}: ProjectsSectionProps) {
  const [showDetails, setShowDetails] = useState(false);

  const projects: Project[] = [
    {
      id: "1",
      title: "VibeMesh",
      subtitle: "Personal Portfolio Website",
      description:
        "This is my personal portfolio, it contains my information about skills, experience and projects. Built with modern web technologies for optimal performance and user experience.",
      technologies: ["React", "TypeScript", "HTML", "TailwindCSS", "Firebase", "EmailJS", "reCaptchaV3"],
      liveUrl: "https://vibemesh-chi.vercel.app/",
      githubUrl: "https://github.com/DoDongssss/moodmap",
      images: [
        portfolio_1,
        portfolio_2,
        portfolio_3,
      ],
      color: "#14B8A6",
      darkColor: "#5EEAD4",
    },
    {
      id: "2",
      title: "Pageant Tabulation System",
      subtitle: "Lakambini ng Koronadal Tabulation",
      description:
        "A fast and accurate tabulation system built for the Lakambini ng Koronadal. Supports multiple judges, real-time scoring and automated ranking.",
      technologies: ["Vue", "ElementPlus", "DaisyUI", "Laravel", "TailwindCSS", "MySQL"],
      liveUrl: "",
      githubUrl: "https://github.com/DoDongssss/lakor-pageant-tabulation.git",
      images: [
        pageant_1,
        pageant_2,
        pageant_3,
      ],
      color: "#8B5CF6",
      darkColor: "#A78BFA",
    },
    {
      id: "3",
      title: "Research Contest Tabulation",
      subtitle: "DepEd Academic Scoring System",
      description:
        "A tabulation system built for the DepEd Research Competition. Features category-based scoring, weighted criteria, multiple evaluators, and real-time score auditing.",
      technologies: ["React", "TypeScript", "Laravel", "TailwindCSS", "MySQL"],
      githubUrl: "https://github.com/DoDongssss/deped-research-tabulation.git",
      images: [
        research_3,
        research_2,
        research_1,
      ],
      color: "#EC4899",
      darkColor: "#F472B6",
    },
    {
      id: "4",
      title: "POS & Inventory System",
      subtitle: "Retail Store Inventory + Sales",
      description:
        "A complete POS and inventory management system for BJS Store. Handles product tracking, stock adjustments, sales monitoring, and receipt generation.",
      technologies: ["Vue", "Laravel", "TailwindCSS", "MySQL", "ElementPlus", "DaisyUI"],
      githubUrl: "",
      images: [
        pos_3,
        pos_2,
        pos_1,
      ],
      color: "#22C55E",
      darkColor: "#4ADE80",
    },
  ];

  const displayedProjects = isMobile && !showDetails ? [projects[0]] : projects;

  const cardContent = (
    <div className="w-full p-3 md:p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FolderGit2 size={18} className="text-gray-800 dark:text-gray-200 md:w-5 md:h-5" strokeWidth={2.5} />
          <h1 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100">
            Projects
          </h1>
          <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-[10px] font-semibold">
            {isMobile && !showDetails ? `1/${projects.length}` : projects.length}
          </span>
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
              <span className="hidden sm:inline">View All</span>
            </>
          )}
        </button>
      </div>

      <div className="relative h-px bg-linear-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-6 md:mb-8"></div>

      <div className="flex flex-col gap-4 md:gap-5">
        {displayedProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} isDark={isDark} />
        ))}
      </div>

      {isMobile && !showDetails && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowDetails(true)}
            className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            + {projects.length - 1} more projects
          </button>
        </div>
      )}

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: "easeOut" },
              opacity: { duration: 0.25, ease: "easeOut" },
            }}
            style={{ overflow: "hidden", willChange: "height, opacity" }}
          >
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs md:text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                Each project showcases my ability to transform ideas into functional, beautiful applications. I focus on clean code, modern best practices, and creating exceptional user experiences. Hover over project images to source code.
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
            className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setShowDetails(false)}
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
          whileDrag={dragStyles}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full md:w-[800px] h-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg overflow-hidden group"
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
            className="fixed top-1/2 left-1/2 w-[90vw] md:w-[900px] max-w-[900px] max-h-[90vh] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-auto z-50"
          >
            {cardContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}