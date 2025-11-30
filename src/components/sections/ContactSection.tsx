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
} from "lucide-react";

type ContactSectionProps = {
  activeCard: string;
  isDark: boolean;
  isMobile: boolean;
  setActiveCard: (card: string) => void;
};

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
  background: "linear-linear(94deg, rgba(232,232,232,0.3) 0%, rgba(242,228,213,0.3) 76%, rgba(222,222,222,0.3) 101%)",
};

export default function ContactSection({
  activeCard,
  isDark,
  isMobile,
  setActiveCard,
}: ContactSectionProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
    alert("Message sent successfully!");
  };

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

      <div className="relative h-px bg-linear-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-6"></div>

      <div className="grid md:grid-cols-5 gap-5">
        <div className="md:col-span-2 space-y-4">
          <div>
            <h2 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Let's work together
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm currently available for freelance work and new opportunities. Let's discuss your project!
            </p>
          </div>

          <div className="space-y-2.5">
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
                className="flex items-start gap-3 group"
              >
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <item.icon size={14} className="text-gray-600 dark:text-gray-400" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-500 dark:text-gray-500 font-medium">{item.title}</p>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 space-y-3">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            className="w-full px-3 py-2.5 text-xs md:text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Your email"
            className="w-full px-3 py-2.5 text-xs md:text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
          />
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Your message"
            rows={5}
            className="w-full px-3 py-2.5 text-xs md:text-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors resize-none"
          />
          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.email || !formData.message}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs md:text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={14} />
                <span>Send Message</span>
              </>
            )}
          </motion.button>
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2.5">
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
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <social.icon className="w-4 h-4 text-gray-700 dark:text-gray-300" strokeWidth={2} />
              </motion.a>
            ))}
          </div>
          <div className="text-center sm:text-right">
            <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} Johnny Asumbra
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-0.5">
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
            backgroundSize: "300% 300%",
            scale: 1.01,
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