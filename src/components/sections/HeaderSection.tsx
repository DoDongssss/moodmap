import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeXml, Github, Linkedin, Mail, Facebook, Instagram, Menu, X } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

import logo from "../../assets/images/logo.webp"

type HeaderSectionProps = {
  isDark: boolean;
};

type SocialIconProps = {
  icon: any;
  name: string;
  color: string;
  href: string;
  textWidth: number;
  isDark: boolean;
  showLabel?: boolean;
};

const SocialIcon = ({ 
  icon: Icon, 
  name, 
  color, 
  href,
  textWidth,
  isDark,
  showLabel = false
}: SocialIconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const baseColor = isDark ? "#d1d5db" : "#6b7280";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center"
      animate={{ marginRight: isHovered && !showLabel ? 8 : 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ color: isHovered || showLabel ? color : baseColor }}
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Icon size={17} strokeWidth={2} />
      </motion.div>

      <AnimatePresence>
        {(isHovered || showLabel) && (
          <motion.span
            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
            animate={{ opacity: 1, width: showLabel ? "auto" : textWidth, marginLeft: 8 }}
            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-medium whitespace-nowrap overflow-hidden"
            style={{ color }}
          >
            {name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

const socialLinks = [
  { 
    icon: Github, 
    name: "GitHub", 
    color: "#181717",
    href: "https://github.com/DoDongssss",
    textWidth: 42
  },
  { 
    icon: Linkedin, 
    name: "LinkedIn", 
    color: "#0A66C2",
    href: "https://www.linkedin.com/in/johnny-asumbra-0b8b5a25a/",
    textWidth: 52
  },
  { 
    icon: Mail, 
    name: "Email", 
    color: "#EA4335",
    href: "mailto:your.dong.asumbra@gmail.com",
    textWidth: 35
  },
  { 
    icon: Facebook, 
    name: "Facebook", 
    color: "#1877F2",
    href: "https://www.facebook.com/dong.asumbra/",
    textWidth: 58
  },
  { 
    icon: Instagram, 
    name: "Instagram", 
    color: "#E4405F",
    href: "https://www.instagram.com/asumbra_/",
    textWidth: 65
  },
];

export default function HeaderSection({
  isDark,
}: HeaderSectionProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full">
      <motion.div
        whileHover={{
          background: isDark
            ? "linear-gradient(135deg, #1c1c1c, #2a2a2a, #1c1c1c)"
            : "linear-gradient(135deg, #fbf5ea, #f3e4d0, #fbf5ea)",
        }}      
        className="relative w-full h-[40px] flex items-center glass-card py-1 px-3"
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
          background: "linear-gradient(94deg, rgba(232,232,232,0.3) 0%, rgba(242,228,213,0.3) 76%, rgba(222,222,222,0.3) 101%)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.div className="text-gray-900 flex items-center dark:text-gray-100 gap-1">
        <motion.div
          className="flex items-center"
          animate={{ y: [0, -6, 0] }} // slightly larger for visibility
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={logo}
            alt="Logo"
            loading="eager"
            decoding="async"
            className="w-9"
          />
        </motion.div>
          {/* <motion.div
            animate={{ y: [0, -2, 0], rotate: [0, 5, -5, 0] }} 
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <CodeXml size={17} strokeWidth={3} />
          </motion.div> */}
        </motion.div>
  
        <div className="hidden lg:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
          {socialLinks.map((social, index) => (
            <SocialIcon
              key={index}
              icon={social.icon}
              name={social.name}
              color={social.color}
              href={social.href}
              textWidth={social.textWidth}
              isDark={isDark}
            />
          ))}
        </div>

        <div className="hidden md:flex lg:hidden items-center gap-3 absolute left-1/2 -translate-x-1/2">
          {socialLinks.slice(0, 3).map((social, index) => (
            <SocialIcon
              key={index}
              icon={social.icon}
              name={social.name}
              color={social.color}
              href={social.href}
              textWidth={social.textWidth}
              isDark={isDark}
            />
          ))}
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm z-60"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed top-16 left-4 right-4 glass-card bg-white dark:bg-gray-900 p-4 z-70 shadow-xl rounded-lg"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Connect with me
                </h3>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <SocialIcon
                      icon={social.icon}
                      name={social.name}
                      color={social.color}
                      href={social.href}
                      textWidth={social.textWidth}
                      isDark={isDark}
                      showLabel={true}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}