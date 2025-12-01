import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, ChevronDown, ChevronUp, X, Loader2 } from "lucide-react";

type GallerySectionProps = {
  activeCard: string;
  isDark: boolean;
  isMobile: boolean;
  setActiveCard: (card: string) => void;
};

interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  rotation: number;
  scale: number;
  zIndex: number;
}

const LazyImage = ({ 
  src, 
  alt, 
  className 
}: { 
  src: string; 
  alt: string; 
  className?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
          <Loader2 size={20} className="animate-spin text-gray-400" />
        </div>
      )}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
          <Image size={20} className="text-gray-400" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
    </div>
  );
};

const galleryImages: GalleryImage[] = [
  { id: 1, url: "../images/gallery/1.jpg", alt: "L", rotation: -3, scale: 0.98, zIndex: 1 },
  { id: 2, url: "../images/gallery/2.jpg", alt: "I", rotation: 4, scale: 1.01, zIndex: 2 },
  { id: 3, url: "../images/gallery/9.jpg", alt: "V", rotation: -2, scale: 0.97, zIndex: 3 },
  { id: 4, url: "../images/gallery/4.jpg", alt: "E", rotation: 3, scale: 1, zIndex: 4 },
  { id: 5, url: "../images/gallery/5.jpg", alt: "L", rotation: -4, scale: 1.02, zIndex: 5 },
  { id: 6, url: "../images/gallery/10.jpg", alt: "I", rotation: 2, scale: 0.99, zIndex: 6 },
  { id: 7, url: "../images/gallery/7.jpg", alt: "F", rotation: -3, scale: 0.98, zIndex: 7 },
  { id: 8, url: "../images/gallery/6.jpg", alt: "E", rotation: 5, scale: 1.01, zIndex: 8 },
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
  background: "linear-gradient(94deg, rgba(232,232,232,0.3) 0%, rgba(242,228,213,0.3) 76%, rgba(222,222,222,0.3) 101%)",
};

export default function GallerySection({
  activeCard,
  isDark,
  isMobile,
  setActiveCard,
}: GallerySectionProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const cardContent = (
    <div className="w-full p-3 md:p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image size={18} className="text-gray-800 dark:text-gray-200 md:w-5 md:h-5" strokeWidth={2.5} />
          <h1 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100">
            Gallery
          </h1>
          <span className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
            {galleryImages.length} photos
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
              <span className="hidden sm:inline">Expand</span>
            </>
          )}
        </button>
      </div>

      <div className="relative h-px bg-linear-to-r from-gray-300 dark:from-gray-600 to-transparent mt-3 mb-5"></div>

      <div className="relative min-h-[400px] md:min-h-[450px] bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl p-4 md:p-6 overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <div className="absolute top-8 left-8 w-24 h-24 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-8 right-8 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-pink-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative grid grid-cols-4 gap-2 md:gap-3 lg:gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.3, rotate: image.rotation * 2 }}
              animate={{ 
                opacity: 1, 
                scale: image.scale, 
                rotate: image.rotation,
              }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                type: "spring",
                stiffness: 120,
                damping: 18
              }}
              whileHover={{ 
                scale: image.scale * 1.12, 
                rotate: 0,
                zIndex: 50,
                transition: { duration: 0.25 }
              }}
              className="relative cursor-pointer group"
              style={{ zIndex: image.zIndex }}
              onClick={() => setSelectedImage(image)}
            >
              <motion.div
                animate={{ 
                  y: [0, -6, 0],
                }}
                transition={{ 
                  duration: 2.5 + (index * 0.3), 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.15
                }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 p-1.5 md:p-2 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-sm border border-gray-200 dark:border-gray-700">
                  <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-gray-100 dark:bg-gray-700">
                    <LazyImage
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  
                  <div className="mt-1 md:mt-1.5 text-center">
                    <p className="text-[8px] md:text-[9px] lg:text-[10px] text-gray-500 dark:text-gray-400 font-handwriting truncate">
                      {image.alt}
                    </p>
                  </div>
                </div>

                <motion.div
                  className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 w-3 h-3 md:w-4 md:h-4 bg-yellow-300/60 dark:bg-yellow-500/40 rounded-full shadow-sm"
                  animate={{ 
                    scale: [1, 1.15, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 3.5,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="absolute top-3 right-3 text-3xl md:text-4xl opacity-[0.08] dark:opacity-[0.12] pointer-events-none select-none"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          ✨
        </motion.div>
        
        <motion.div
          className="absolute bottom-3 left-3 text-2xl md:text-3xl opacity-[0.08] dark:opacity-[0.12] pointer-events-none select-none"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 8, -8, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          📸
        </motion.div>
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

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/92 backdrop-blur-sm z-80 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors z-10"
            >
              <X size={24} className="text-white" />
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 8 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 140 }}
              className="max-w-3xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-gray-800 p-4 md:p-5 rounded-lg shadow-2xl">
                <div className="relative max-h-[70vh] bg-gray-100 dark:bg-gray-700 rounded overflow-hidden flex items-center justify-center">
                  <LazyImage
                    src={selectedImage.url}
                    alt={selectedImage.alt}
                    className="w-full h-full object-contain max-h-[70vh]"
                  />
                </div>
                <div className="mt-3 text-center">
                  <h3 className="text-gray-900 dark:text-white text-base md:text-lg font-semibold font-handwriting">
                    {selectedImage.alt}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showDetails && (
        <motion.div
          drag={!isMobile}
          dragMomentum={!isMobile}
          dragElastic={!isMobile ? 0.1 : 0}
          onDragStart={() => setActiveCard("gallery")}
          onDragEnd={() => setActiveCard("")}
          style={{ zIndex: activeCard === "gallery" ? 50 : 10 }}
          whileHover={{
            background: isDark
              ? "linear-gradient(135deg, #1c1c1c, #2a2a2a, #1c1c1c)"
              : "linear-gradient(135deg, #fbf5ea, #f3e4d0, #fbf5ea)",
            backgroundSize: "300% 300%",
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