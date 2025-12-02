import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rafThrottle } from '../../utils/performanceOptimizations';
import styled from "styled-components";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
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
    const toggleVisibility = rafThrottle(() => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const scrollPercentage = (scrolled + windowHeight) / documentHeight;
      setIsVisible(scrollPercentage > 0.7);
    });

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsClicked(true);
    setIsFlying(true);
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setIsFlying(false);
      setIsClicked(false);
    }, 3000);
  };

  const RocketComponent = ({ isFlying: flying }: { isFlying: boolean }) => (
    <StyledRocket $isDark={isDark} $isFlying={flying} $isHovered={isHovered} $isClicked={isClicked}>
      <div className="rocket-section">
        <div className="loader">
          <span><span /><span /><span /><span /></span>
          <div className="base">
            <span />
            <div className="face" />
          </div>
        </div>
        {flying && (
          <div className="longfazers">
            <span /><span /><span /><span />
          </div>
        )}
      </div>
    </StyledRocket>
  );

  return (
    <AnimatePresence>
      {isVisible && !isFlying && (
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            duration: 0.2,
            ease: "easeOut"
          }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed left-4 md:left-8 bottom-6 md:bottom-8 z-50 p-3 transition-all"
          aria-label="Back to top"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <motion.div
            animate={{
              y: isHovered ? -6 : [0, -3, 0],
            }}
            transition={{
              duration: isHovered ? 0.3 : 2,
              repeat: isHovered ? 0 : Infinity,
              ease: "easeInOut"
            }}
          >
            <RocketComponent isFlying={false} />
          </motion.div>
        </motion.button>
      )}

      {isFlying && (
        <motion.div
          initial={{ 
            bottom: '6vh',
            left: '32px',
            opacity: 1,
            scale: 1
          }}
          animate={{ 
            bottom: '120vh',
            opacity: [1, 1, 1, 0.8, 0],
            scale: [1, 1.1, 1.2, 1.3, 1.3]
          }}
          transition={{ 
            duration: 3,
            ease: "easeOut"
          }}
          className="fixed z-60"
          style={{
            pointerEvents: 'none'
          }}
        >
          <RocketComponent isFlying={true} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const StyledRocket = styled.div<{ $isDark: boolean; $isFlying: boolean; $isHovered: boolean; $isClicked: boolean }>`
  .rocket-section {
    position: relative;
    width: 50px;
    height: 25px;
    transform: rotate(-90deg) scale(0.5);
    transform-origin: center center;
    will-change: transform;
    transition: filter 0.3s ease;
    filter: ${props => {
      if (props.$isClicked) return 'drop-shadow(0 0 8px #ff6b35) brightness(1.2)';
      if (props.$isHovered) return 'drop-shadow(0 0 8px #22c55e) brightness(1.1)';
      return 'none';
    }};
  }

  .loader {
    position: absolute;
    top: 50%;
    margin-left: -50px;
    left: 50%;
    animation: ${props => props.$isFlying ? 'none' : 'speeder 0.4s linear infinite'};
    will-change: transform;
  }

  .loader > span {
    height: 5px;
    width: 35px;
    background: ${props => {
      if (props.$isClicked) return '#ff6b35';
      if (props.$isHovered) return '#22c55e';
      return props.$isDark ? '#ffffff' : '#000000';
    }};
    position: absolute;
    top: -19px;
    left: 60px;
    border-radius: 2px 10px 1px 0;
    transition: background 0.3s ease;
  }

  .base span {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-right: ${props => {
      if (props.$isClicked) return '100px solid #ff6b35';
      if (props.$isHovered) return '100px solid #22c55e';
      return `100px solid ${props.$isDark ? '#ffffff' : '#000000'}`;
    }};
    border-bottom: 6px solid transparent;
    transition: border-color 0.3s ease;
  }

  .base span:before {
    content: "";
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: ${props => {
      if (props.$isClicked) return '#ff6b35';
      if (props.$isHovered) return '#22c55e';
      return props.$isDark ? '#ffffff' : '#000000';
    }};
    position: absolute;
    right: -110px;
    top: -16px;
    transition: background 0.3s ease;
  }

  .base span:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 0 solid transparent;
    border-right: ${props => {
      if (props.$isClicked) return '55px solid #ff6b35';
      if (props.$isHovered) return '55px solid #22c55e';
      return `55px solid ${props.$isDark ? '#ffffff' : '#000000'}`;
    }};
    border-bottom: 16px solid transparent;
    top: -16px;
    right: -98px;
    transition: border-color 0.3s ease;
  }

  .face {
    position: absolute;
    height: 12px;
    width: 20px;
    background: ${props => {
      if (props.$isClicked) return '#ff6b35';
      if (props.$isHovered) return '#22c55e';
      return props.$isDark ? '#ffffff' : '#000000';
    }};
    border-radius: 20px 20px 0 0;
    transform: rotate(-40deg);
    right: -125px;
    top: -15px;
    transition: background 0.3s ease;
  }

  .face:after {
    content: "";
    height: 12px;
    width: 12px;
    background: ${props => {
      if (props.$isClicked) return '#ff6b35';
      if (props.$isHovered) return '#22c55e';
      return props.$isDark ? '#ffffff' : '#000000';
    }};
    right: 4px;
    top: 7px;
    position: absolute;
    transform: rotate(40deg);
    transform-origin: 50% 50%;
    border-radius: 0 0 0 2px;
    transition: background 0.3s ease;
  }

  .loader > span > span:nth-child(1),
  .loader > span > span:nth-child(2),
  .loader > span > span:nth-child(3),
  .loader > span > span:nth-child(4) {
    width: 30px;
    height: 1px;
    background: ${props => {
      if (props.$isClicked) return '#ff6b35';
      if (props.$isHovered) return '#22c55e';
      return props.$isDark ? '#ffffff' : '#000000';
    }};
    position: absolute;
    animation: fazer1 0.2s linear infinite;
    will-change: transform, opacity;
    transition: background 0.3s ease;
  }

  .loader > span > span:nth-child(2) {
    top: 3px;
    animation: fazer2 0.4s linear infinite;
  }

  .loader > span > span:nth-child(3) {
    top: 1px;
    animation: fazer3 0.4s linear infinite;
    animation-delay: -1s;
  }

  .loader > span > span:nth-child(4) {
    top: 4px;
    animation: fazer4 1s linear infinite;
    animation-delay: -1s;
  }

  .longfazers {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .longfazers span {
    position: absolute;
    height: 2px;
    width: 20%;
    background: ${props => {
      if (props.$isClicked) return '#ff6b35';
      return props.$isDark ? '#ffffff' : '#000000';
    }};
    will-change: transform, opacity;
    transition: background 0.3s ease;
  }

  .longfazers span:nth-child(1) {
    top: 20%;
    animation: lf 0.6s linear infinite;
    animation-delay: -5s;
  }

  .longfazers span:nth-child(2) {
    top: 40%;
    animation: lf2 0.8s linear infinite;
    animation-delay: -1s;
  }

  .longfazers span:nth-child(3) {
    top: 60%;
    animation: lf3 0.6s linear infinite;
  }

  .longfazers span:nth-child(4) {
    top: 80%;
    animation: lf4 0.5s linear infinite;
    animation-delay: -3s;
  }

  @keyframes fazer1 {
    0% { left: 0; opacity: 1; }
    100% { left: -80px; opacity: 0; }
  }

  @keyframes fazer2 {
    0% { left: 0; opacity: 1; }
    100% { left: -100px; opacity: 0; }
  }

  @keyframes fazer3 {
    0% { left: 0; opacity: 1; }
    100% { left: -50px; opacity: 0; }
  }

  @keyframes fazer4 {
    0% { left: 0; opacity: 1; }
    100% { left: -150px; opacity: 0; }
  }

  @keyframes speeder {
    0% { transform: translate(1px, 0.5px) rotate(0deg); }
    10% { transform: translate(-0.5px, -1.5px) rotate(-0.5deg); }
    20% { transform: translate(-1px, 0px) rotate(0.5deg); }
    30% { transform: translate(0.5px, 1px) rotate(0deg); }
    40% { transform: translate(0.5px, -0.5px) rotate(0.5deg); }
    50% { transform: translate(-0.5px, 1.5px) rotate(-0.5deg); }
    60% { transform: translate(-0.5px, 0.5px) rotate(0deg); }
    70% { transform: translate(1.5px, 0.5px) rotate(-0.5deg); }
    80% { transform: translate(-1px, -0.5px) rotate(0.5deg); }
    90% { transform: translate(1px, 0.5px) rotate(0deg); }
    100% { transform: translate(0.5px, -1px) rotate(-0.5deg); }
  }

  @keyframes lf {
    0% { left: 200%; opacity: 1; }
    100% { left: -200%; opacity: 0; }
  }

  @keyframes lf2 {
    0% { left: 200%; opacity: 1; }
    100% { left: -200%; opacity: 0; }
  }

  @keyframes lf3 {
    0% { left: 200%; opacity: 1; }
    100% { left: -100%; opacity: 0; }
  }

  @keyframes lf4 {
    0% { left: 200%; opacity: 1; }
    100% { left: -100%; opacity: 0; }
  }
`;