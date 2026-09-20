import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Stars, RefreshCw } from 'lucide-react';

export default function CelebrationScene({ noClickCount, onReplay }) {
  useEffect(() => {
    // Grand celebration confetti sequence
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#EC4899', '#F43F5E', '#FBCFE8', '#F59E0B'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#EC4899', '#F43F5E', '#FBCFE8', '#F59E0B'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative z-10"
    >
      <div className="w-full max-w-xl bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 border-2 border-pink-300 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-rose-300/60 text-center relative overflow-hidden backdrop-blur-md">
        
        {/* Pulsing Big Heart Visual */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-xl shadow-rose-500/40 border-4 border-white"
        >
          <Heart className="w-10 h-10 fill-current text-white" />
        </motion.div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold mb-4 shadow-2xs">
          <Stars className="w-4 h-4 text-rose-500" />
          <span>Forever With You 🌸</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-bengali text-2xl sm:text-4xl font-bold text-pink-900 mb-6 leading-tight">
          তুমি আমাকে সত্যিই accept করেছো! ❤️
        </h1>

        {/* Main Message */}
        <div className="font-bengali text-pink-950 text-lg sm:text-xl leading-relaxed space-y-3 font-medium bg-white/70 p-6 rounded-2xl border border-pink-200/80 shadow-xs mb-8">
          <p>আমি জীবনে ভাবিনি যে তুমি আমাকে accept করবে।</p>
          <p>কিন্তু আজকে সবকিছু সত্যি স্বপ্নের মতো লাগছে।</p>
          <p className="font-semibold text-rose-700">আমি চাই সারাজীবন তোমার সাথে কাটাতে।</p>
          <p className="font-handwriting text-3xl sm:text-4xl text-rose-600 font-bold pt-2">
            I love you, Arohi. ❤️🌸
          </p>
        </div>

        {/* Interactive Replay */}
        <div className="flex items-center justify-center pt-4 border-t border-pink-200 text-xs text-pink-700 font-medium">
          <button
            onClick={onReplay}
            className="flex items-center gap-1.5 text-pink-700 hover:text-pink-900 font-semibold cursor-pointer underline transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Read Letter Again</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
