import { useState, useEffect, useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      ready: (callback: () => void) => void;
    };
  }
}

export function useRecaptcha(siteKey: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsReady(true);
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll(`script[src*="recaptcha"]`);
      scripts.forEach(s => s.remove());
      const badge = document.querySelector('.grecaptcha-badge');
      badge?.remove();
    };
  }, [siteKey]);

  const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
    if (!isReady || !window.grecaptcha) {
      return null;
    }

    try {
      const token = await window.grecaptcha.execute(siteKey, { action });
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution error:', error);
      return null;
    }
  }, [isReady, siteKey]);

  return { executeRecaptcha, isReady };
}