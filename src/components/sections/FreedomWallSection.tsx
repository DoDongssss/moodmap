import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Clock, ChevronDown, ChevronUp, X, AlertCircle } from "lucide-react";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  where,
  getDocs,
  Timestamp 
} from "firebase/firestore";
import { db } from "../../firebase/config";

type FreedomWallProps = {
  activeCard: string;
  isDark: boolean;
  isMobile: boolean;
  setActiveCard: (card: string) => void;
};

interface Post {
  id: string;
  name: string;
  message: string;
  timestamp: number;
  ipHash: string;
  position?: {
    x: number;
    y: number;
    rotation: number;
    color: number;
  };
}

export default function FreedomWallSection({
  activeCard,
  isDark,
  isMobile,
  setActiveCard,
}: FreedomWallProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Get or create unique user identifier
  const getUserIPHash = () => {
    const stored = localStorage.getItem("userIPHash");
    if (stored) return stored;
    
    const hash = `user_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
    localStorage.setItem("userIPHash", hash);
    return hash;
  };

  // Generate random position for new post
  const generateRandomPosition = (index: number) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    
    return {
      x: column * 33.33 + (Math.random() * 30 - 15), // Random offset -15 to +15
      y: row * 180 + (Math.random() * 20 - 10), // Random offset -10 to +10
      rotation: Math.random() * 6 - 3, // Random rotation -3 to +3 degrees
      color: Math.floor(Math.random() * 6) // Random color index 0-5
    };
  };

  // Load posts from Firestore (real-time)
  useEffect(() => {
    const postsRef = collection(db, "freedomWall");
    const q = query(postsRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedPosts: Post[] = [];
      snapshot.forEach((doc) => {
        loadedPosts.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toMillis() || Date.now()
        } as Post);
      });
      setPosts(loadedPosts);
      setLoading(false);
    }, (error) => {
      console.error("Error loading posts:", error);
      setError("Failed to load posts");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check if user has already posted
  useEffect(() => {
    const checkUserPosted = async () => {
      const userHash = getUserIPHash();
      const postsRef = collection(db, "freedomWall");
      const q = query(postsRef, where("ipHash", "==", userHash));
      
      try {
        const snapshot = await getDocs(q);
        setHasPosted(!snapshot.empty);
      } catch (error) {
        console.error("Error checking user posts:", error);
      }
    };

    checkUserPosted();
  }, []);

  const handleSubmit = async () => {
    if (!newPost.name.trim() || !newPost.message.trim()) {
      setError("Please fill in both name and message");
      return;
    }

    if (hasPosted) {
      setError("You have already posted a message");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const userHash = getUserIPHash();
      const postsRef = collection(db, "freedomWall");

      // Generate random position for this post
      const position = generateRandomPosition(posts.length);

      await addDoc(postsRef, {
        name: newPost.name.trim(),
        message: newPost.message.trim(),
        timestamp: Timestamp.now(),
        ipHash: userHash,
        createdAt: new Date().toISOString(),
        position: position // Save position to database
      });

      setNewPost({ name: "", message: "" });
      setHasPosted(true);
      setError("");
    } catch (error) {
      console.error("Error posting message:", error);
      setError("Failed to post message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const cardContent = (
    <div className="w-full p-3 md:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageCircle size={18} className="text-gray-800 dark:text-gray-200 md:w-5 md:h-5" strokeWidth={2.5} />
          <h1 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100">
            Freedom Wall
          </h1>
          <span className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
        </div>
        <div className="flex items-center gap-2">
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
          <AnimatePresence>
            {showDetails && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setShowDetails(false)}
                className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                <X size={16} strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative h-px bg-linear-to-r from-gray-300 dark:from-gray-600 to-transparent mt-3 mb-4"></div>

      {/* Post Form */}
      <div className="mb-4 md:mb-6">
        <h3 className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
          Share your thoughts
        </h3>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 mb-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          >
            <AlertCircle size={16} className="text-red-500 shrink-0" />
            <p className="text-[11px] md:text-xs text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        )}

        <div className="space-y-3">
          <input
            type="text"
            value={newPost.name}
            onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
            placeholder="Your name"
            disabled={hasPosted || isSubmitting}
            maxLength={50}
            className="w-full px-3 py-2 text-[11px] md:text-xs rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <textarea
            value={newPost.message}
            onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
            placeholder="Your message (max 500 characters)"
            disabled={hasPosted || isSubmitting}
            rows={3}
            maxLength={500}
            className="w-full px-3 py-2 text-[11px] md:text-xs rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 dark:text-gray-400">
              {newPost.message.length}/500 characters
            </span>
            <motion.button
              onClick={handleSubmit}
              disabled={isSubmitting || hasPosted || !newPost.name || !newPost.message}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-2 px-4 rounded-lg bg-gray-800 dark:bg-white text-white dark:text-gray-900 text-[11px] md:text-xs font-medium hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  Posting...
                </>
              ) : hasPosted ? (
                "Already Posted"
              ) : (
                <>
                  <Send size={14} />
                  Post
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Posts Feed - Collage Style */}
      <div className="relative min-h-[400px] max-h-[500px] overflow-y-auto pr-2 custom-scrollbar bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-3 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Loading posts...
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle size={40} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              No posts yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="relative" style={{ minHeight: `${Math.ceil(posts.length / 3) * 180}px` }}>
            {posts.map((post, index) => {
              // Use saved position from database, or generate fallback
              const position = post.position || {
                x: (index % 3) * 33.33,
                y: Math.floor(index / 3) * 180,
                rotation: 0,
                color: index % 6
              };

              const colors = [
                'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800',
                'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
                'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800',
                'bg-pink-100 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800',
                'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800',
                'bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800'
              ];
              const colorClass = colors[position.color];
              
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: position.rotation 
                  }}
                  transition={{ delay: index * 0.05 }}
                  className={`absolute p-4 rounded-sm shadow-md border-2 ${colorClass}`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}px`,
                    width: '28%',
                    minWidth: '200px',
                    transform: `rotate(${position.rotation}deg)`,
                    fontFamily: "'Indie Flower', cursive"
                  }}
                >
                  <div className="mb-3">
                    <p className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 mb-1">
                      {post.name}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-gray-600 dark:text-gray-400">
                      <Clock size={10} />
                      <span>{formatTime(post.timestamp)}</span>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-800 dark:text-gray-200 leading-relaxed wrap-break-words">
                    {post.message}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop overlay */}
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

      {/* Normal Card */}
      {!showDetails && (
        <motion.div
          drag={!isMobile}
          dragMomentum={!isMobile}
          dragElastic={!isMobile ? 0.1 : 0}
          onDragStart={() => setActiveCard("freedom")}
          onDragEnd={() => setActiveCard("")}
          style={{ zIndex: activeCard === "freedom" ? 50 : 10 }}
          whileHover={{
            background: isDark
              ? "linear-gradient(135deg, #1c1c1c, #2a2a2a, #1c1c1c)"
              : "linear-gradient(135deg, #fbf5ea, #f3e4d0, #fbf5ea)",
            backgroundSize: "300% 300%",
            scale: 1.01,
          }}
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
            background:
              "linear-linear(94deg, rgba(232,232,232,0.3) 0%, rgba(242,228,213,0.3) 76%, rgba(222,222,222,0.3) 101%)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full md:w-[800px] h-auto text-gray-700 dark:text-gray-300 glass-card overflow-hidden group"
        >
          {cardContent}
        </motion.div>
      )}

      {/* Modal Card */}
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

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #9ca3af;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </>
  );
}