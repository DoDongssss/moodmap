import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  Facebook, 
  Instagram,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Shield,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import emailjs from '@emailjs/browser';
import { useRecaptcha } from '../../hooks/useRecaptcha';

type ContactSectionProps = {
  activeCard: string;
  isDark: boolean;
  isMobile: boolean;
  setActiveCard: (card: string) => void;
};

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "dong.asumbra@gmail.com",
    link: "mailto:dong.asumbra@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+63 909 098 3141",
    link: "tel:+639090983141",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Tampakan, South Cotabato",
    link: "https://maps.google.com/?q=Tampakan+South+Cotabato",
  }
];

const socialLinks = [
  { icon: Github, href: "https://github.com/DoDongssss?tab=repositories&q=tabulation&type=&language=&sort=", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/johnny-asumbra-0b8b5a25a/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/dong.asumbra/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/asumbra_/", label: "Instagram" }
];

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
};

export default function ContactSection({
  activeCard,
  isDark,
  isMobile,
  setActiveCard,
}: ContactSectionProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { executeRecaptcha, isReady } = useRecaptcha(RECAPTCHA_SITE_KEY);

  const handleSubmit = async () => {
    if (!formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields');
      setSubmitStatus('error');
      return;
    }

    if (!isReady) {
      setErrorMessage('Security check not ready. Please wait a moment.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const recaptchaToken = await executeRecaptcha('contact_form');
      
      if (!recaptchaToken) {
        throw new Error('Security verification failed');
      }

      const templateParams = {
        from_name: formData.name || 'Anonymous',
        from_email: formData.email,
        message: formData.message,
        to_email: 'dong.asumbra@gmail.com',
        'g-recaptcha-response': recaptchaToken,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardContent = (
    <div className="w-full p-3 md:p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-gray-800 dark:text-gray-200 md:w-5 md:h-5" strokeWidth={2.5} />
          <h1 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100">
            Contact
          </h1>
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
              <span className="hidden sm:inline">Expand</span>
            </>
          )}
        </button>
      </div>

      <div className="relative h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-6"></div>

      <div className="grid md:grid-cols-5 gap-4 md:gap-5">
        <div className="md:col-span-2 space-y-3 md:space-y-4">
          <div>
            <h2 className="text-xs md:text-sm lg:text-base font-semibold text-gray-800 dark:text-gray-100 mb-1.5 md:mb-2">
              Let's work together
            </h2>
            <p className="text-[11px] md:text-xs lg:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm currently available for freelance work and new opportunities. Let's discuss your project!
            </p>
          </div>

          <div className="space-y-2 md:space-y-2.5">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 3 }}
                className="flex items-start gap-2 md:gap-3 group"
              >
                <div className="p-1.5 md:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <item.icon size={12} className="md:w-3.5 md:h-3.5 text-gray-600 dark:text-gray-400" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] md:text-[10px] text-gray-500 dark:text-gray-500 font-medium">{item.title}</p>
                  <p className="text-[11px] md:text-xs lg:text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 space-y-2.5 md:space-y-3">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name (optional)"
            disabled={isSubmitting}
            className="w-full px-2.5 md:px-3 py-2 md:py-2.5 text-[11px] md:text-xs lg:text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Your email *"
            disabled={isSubmitting}
            required
            className="w-full px-2.5 md:px-3 py-2 md:py-2.5 text-[11px] md:text-xs lg:text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Your message *"
            rows={4}
            disabled={isSubmitting}
            required
            className="w-full px-2.5 md:px-3 py-2 md:py-2.5 text-[11px] md:text-xs lg:text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed md:rows-5"
          />

          <AnimatePresence mode="wait">
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-1.5 md:gap-2 p-2 md:p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              >
                <CheckCircle2 size={14} className="md:w-4 md:h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <p className="text-[10px] md:text-xs text-green-700 dark:text-green-300 font-medium">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </motion.div>
            )}
            
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-1.5 md:gap-2 p-2 md:p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              >
                <AlertCircle size={14} className="md:w-4 md:h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-[10px] md:text-xs text-red-700 dark:text-red-300 font-medium">
                  {errorMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.email || !formData.message || !isReady}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-2 md:py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] md:text-xs lg:text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5 md:gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={12} className="md:w-3.5 md:h-3.5" />
                <span>Send Message</span>
              </>
            )}
          </motion.button>

          <div className="flex items-center justify-center gap-1 md:gap-1.5 text-[9px] md:text-[10px] text-gray-400 dark:text-gray-600">
            <Shield size={10} className="md:w-3 md:h-3" strokeWidth={2.5} />
            <span>Protected by reCAPTCHA v3</span>
          </div>
        </div>
      </div>

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
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                I typically respond within 24 hours during weekdays. For urgent matters, feel free to reach out via phone.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
          <div className="flex gap-2 md:gap-2.5">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-1.5 md:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <social.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-700 dark:text-gray-300" strokeWidth={2} />
              </motion.a>
            ))}
          </div>
          <div className="text-center sm:text-right">
            <p className="text-[9px] md:text-[10px] lg:text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} Johnny Asumbra
            </p>
            <p className="text-[8px] md:text-[10px] text-gray-400 dark:text-gray-600 mt-0.5">
              All rights reserved
            </p>
          </div>
        </div>
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

      {!showDetails && (
        <motion.div
          drag={!isMobile}
          dragMomentum={!isMobile}
          dragElastic={!isMobile ? 0.1 : 0}
          onDragStart={() => setActiveCard("contact")}
          onDragEnd={() => setActiveCard("")}
          style={{ zIndex: activeCard === "contact" ? 50 : 10 }}
          whileHover={{
            background: isDark
              ? "linear-gradient(135deg, #1c1c1c, #2a2a2a, #1c1c1c)"
              : "linear-gradient(135deg, #fbf5ea, #f3e4d0, #fbf5ea)",
          }}
          whileDrag={dragStyles}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full md:w-[800px] h-auto text-gray-700 dark:text-gray-300 glass-card overflow-hidden group"
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
            className="fixed top-1/2 left-1/2 w-[90vw] md:w-[850px] max-w-[850px] max-h-[90vh] glass-card bg-white dark:bg-gray-900 overflow-auto z-70"
          >
            {cardContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}