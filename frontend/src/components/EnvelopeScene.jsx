import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function EnvelopeScene({ onOpenLetter }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleHeartClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      onOpenLetter();
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 relative z-10">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs font-semibold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Confession Letter</span>
        </div>
        <h1 className="font-handwriting text-4xl sm:text-5xl md:text-6xl text-pink-900 font-bold tracking-wide">
          A Little Letter For You 💗
        </h1>
        <p className="text-pink-700 text-sm sm:text-base mt-2 font-medium">
          Tap the heart to open my heart
        </p>
      </motion.div>

      {/* 3D Envelope Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-sm sm:max-w-md aspect-[1.4/1] relative cursor-pointer group"
        onClick={handleHeartClick}
      >
        {/* Outer Shadow */}
        <div className="absolute inset-0 rounded-2xl bg-pink-300/30 blur-xl transform group-hover:scale-105 transition-transform duration-500" />

        {/* Envelope Body */}
        <div className="relative w-full h-full bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-2xl border-2 border-pink-200 shadow-2xl overflow-hidden flex items-center justify-center">
          
          {/* Back Pocket & Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#FBCFE8_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          {/* Letter Peek-out Animation */}
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={isOpen ? { y: -140, opacity: 1 } : { y: 0, opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute w-[88%] h-[80%] bg-amber-50/95 border border-pink-200 rounded-xl p-4 shadow-lg text-center flex flex-col justify-center items-center z-10"
          >
            <p className="font-bengali text-pink-900 font-semibold text-sm sm:text-base">
              প্রিয় আরোহী...
            </p>
            <p className="text-xs text-pink-500 mt-1 italic">
              (Opening your letter...)
            </p>
          </motion.div>

          {/* Envelope Bottom & Side Triangular Folds (CSS SVG overlays) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-15" viewBox="0 0 400 280" preserveAspectRatio="none">
            {/* Left triangle fold */}
            <polygon points="0,0 0,280 200,150" fill="#FCE7F3" fillOpacity="1" stroke="#FBCFE8" strokeWidth="1" />
            {/* Right triangle fold */}
            <polygon points="400,0 400,280 200,150" fill="#FCE7F3" fillOpacity="1" stroke="#FBCFE8" strokeWidth="1" />
            {/* Bottom triangle fold */}
            <polygon points="0,280 400,280 200,135" fill="#FFF0F5" fillOpacity="1" stroke="#F9A8D4" strokeWidth="1.5" />
          </svg>

          {/* Envelope Top Triangular Flap (Animated opening) */}
          <motion.svg
            className="absolute top-0 left-0 w-full h-[55%] pointer-events-none origin-top"
            viewBox="0 0 400 150"
            preserveAspectRatio="none"
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <polygon points="0,0 400,0 200,140" fill="#FBCFE8" stroke="#F472B6" strokeWidth="1.5" />
          </motion.svg>

          {/* Centered Wax Heart Seal */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            animate={isOpen ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] } : { scale: [1, 1.06, 1] }}
            transition={isOpen ? { duration: 0.5 } : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="relative z-30 w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/40 border-2 border-rose-300 cursor-pointer"
            aria-label="Open Love Letter"
          >
            <Heart className="w-8 h-8 fill-current text-rose-100 drop-shadow-sm" />
            <div className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-30" />
          </motion.button>
        </div>
      </motion.div>

      {/* Decorative Footnote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-pink-600/80 mt-6 font-medium text-center"
      >
        Wrapped with warmth & love for <span className="font-bold text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-full border border-rose-300">Arohi 🌸</span>
      </motion.p>
    </div>
  );
}
