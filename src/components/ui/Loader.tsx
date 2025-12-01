import { useState, useEffect } from 'react';
import { CodeXml } from 'lucide-react';
import styled from 'styled-components';

const Loader = () => {
  const [isDark, setIsDark] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const checkTheme = () => {
      const localStorageTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const htmlHasDarkClass = document.documentElement.classList.contains('dark');
      
      if (localStorageTheme === 'dark' || htmlHasDarkClass) {
        setIsDark(true);
      } else if (localStorageTheme === 'light') {
        setIsDark(false);
      } else {
        setIsDark(systemPrefersDark);
      }
    };
    
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => checkTheme();
    mediaQuery.addEventListener('change', handleChange);
    
    window.addEventListener('storage', checkTheme);
    
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('storage', checkTheme);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledWrapper $isDark={isDark}>
      <div className="loader-container">
        <div className="brand-section">
          <div className="brand-name">
            <span className="brand-text chokokutai-regular">VibeMesh</span>
            <CodeXml className="brand-icon" size={24} strokeWidth={3} />
          </div>
          <div className="tagline">Johnny Asumbra Portfolio</div>
        </div>

        <div className="rocket-section">
          <div className="loader">
            <span><span /><span /><span /><span /></span>
            <div className="base">
              <span />
              <div className="face" />
            </div>
          </div>
          <div className="longfazers">
            <span /><span /><span /><span />
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ $isDark: boolean }>`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$isDark ? '#000000' : '#ffffff'};
  z-index: 9999;

  .loader-container {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }

  .brand-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    animation: fadeInDown 0.6s ease-out;
  }

  .brand-name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Modak', cursive;
  }

  .brand-text {
    font-size: 3rem;
    font-weight: bold;
    color: ${props => props.$isDark ? '#ffffff' : '#1a1a1a'};
    animation: pulse 2s ease-in-out infinite;
  }

  .brand-icon {
    color: ${props => props.$isDark ? '#ffffff' : '#1a1a1a'};
    animation: rotate 2s ease-in-out infinite;
  }

  .tagline {
    font-size: 0.875rem;
    color: ${props => props.$isDark ? '#9ca3af' : '#6b7280'};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 500;
  }

  .rocket-section {
    position: relative;
    width: 300px;
    height: 100px;
  }

  .loader {
    position: absolute;
    top: 50%;
    margin-left: -50px;
    left: 50%;
    animation: speeder 0.4s linear infinite;
  }

  .loader > span {
    height: 5px;
    width: 35px;
    background: ${props => props.$isDark ? '#ffffff' : '#000000'};
    position: absolute;
    top: -19px;
    left: 60px;
    border-radius: 2px 10px 1px 0;
  }

  .base span {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-right: 100px solid ${props => props.$isDark ? '#ffffff' : '#000000'};
    border-bottom: 6px solid transparent;
  }

  .base span:before {
    content: "";
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: ${props => props.$isDark ? '#ffffff' : '#000000'};
    position: absolute;
    right: -110px;
    top: -16px;
  }

  .base span:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 0 solid transparent;
    border-right: 55px solid ${props => props.$isDark ? '#ffffff' : '#000000'};
    border-bottom: 16px solid transparent;
    top: -16px;
    right: -98px;
  }

  .face {
    position: absolute;
    height: 12px;
    width: 20px;
    background: ${props => props.$isDark ? '#ffffff' : '#000000'};
    border-radius: 20px 20px 0 0;
    transform: rotate(-40deg);
    right: -125px;
    top: -15px;
  }

  .face:after {
    content: "";
    height: 12px;
    width: 12px;
    background: ${props => props.$isDark ? '#ffffff' : '#000000'};
    right: 4px;
    top: 7px;
    position: absolute;
    transform: rotate(40deg);
    transform-origin: 50% 50%;
    border-radius: 0 0 0 2px;
  }

  .loader > span > span:nth-child(1),
  .loader > span > span:nth-child(2),
  .loader > span > span:nth-child(3),
  .loader > span > span:nth-child(4) {
    width: 30px;
    height: 1px;
    background: ${props => props.$isDark ? '#ffffff' : '#000000'};
    position: absolute;
    animation: fazer1 0.2s linear infinite;
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
    background: ${props => props.$isDark ? '#ffffff' : '#000000'};
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

  .progress-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 300px;
    animation: fadeInUp 0.6s ease-out;
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: ${props => props.$isDark ? '#2a2a2a' : '#e5e5e5'};
    border-radius: 9999px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: ${props => props.$isDark 
      ? 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
      : 'linear-gradient(90deg, #3b82f6, #8b5cf6)'};
    border-radius: 9999px;
    transition: width 0.3s ease-out;
  }

  .loading-text {
    font-size: 0.875rem;
    color: ${props => props.$isDark ? '#9ca3af' : '#6b7280'};
    font-weight: 500;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.02);
    }
  }

  @keyframes rotate {
    0%, 100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(5deg);
    }
    75% {
      transform: rotate(-5deg);
    }
  }

  @keyframes fazer1 {
    0% { left: 0; }
    100% { left: -80px; opacity: 0; }
  }

  @keyframes fazer2 {
    0% { left: 0; }
    100% { left: -100px; opacity: 0; }
  }

  @keyframes fazer3 {
    0% { left: 0; }
    100% { left: -50px; opacity: 0; }
  }

  @keyframes fazer4 {
    0% { left: 0; }
    100% { left: -150px; opacity: 0; }
  }

  @keyframes speeder {
    0% { transform: translate(2px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -3px) rotate(-1deg); }
    20% { transform: translate(-2px, 0px) rotate(1deg); }
    30% { transform: translate(1px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 3px) rotate(-1deg); }
    60% { transform: translate(-1px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-2px, -1px) rotate(1deg); }
    90% { transform: translate(2px, 1px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }

  @keyframes lf {
    0% { left: 200%; }
    100% { left: -200%; opacity: 0; }
  }

  @keyframes lf2 {
    0% { left: 200%; }
    100% { left: -200%; opacity: 0; }
  }

  @keyframes lf3 {
    0% { left: 200%; }
    100% { left: -100%; opacity: 0; }
  }

  @keyframes lf4 {
    0% { left: 200%; }
    100% { left: -100%; opacity: 0; }
  }

  @media (max-width: 640px) {
    .brand-text {
      font-size: 2.5rem;
    }

    .progress-section {
      width: 250px;
    }
  }
`;

export default Loader;