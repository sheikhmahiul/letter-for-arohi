import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';

export default function RejectionScene({ onReplay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative z-10"
    >
      <div className="w-full max-w-lg bg-amber-50/95 border-2 border-pink-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl text-center relative overflow-hidden backdrop-blur-md">
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-semibold mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Goodbye Message 💔</span>
        </div>

        {/* Heart Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-rose-100 to-pink-100 border border-pink-200 flex items-center justify-center shadow-inner">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500 fill-rose-200" />
        </div>

        {/* Main Heading */}
        <h1 className="font-bengali text-2xl sm:text-4xl font-bold text-pink-900 mb-6 leading-tight">
          ওহ sorry… 💔
        </h1>

        {/* Main Message Box */}
        <div className="font-bengali text-pink-950 text-lg sm:text-xl leading-relaxed space-y-3 font-medium bg-white/70 p-6 rounded-2xl border border-pink-200/80 shadow-xs mb-8">
          <p className="font-semibold text-rose-700 text-xl sm:text-2xl">
            আজকেই আমার সাথে তোমার শেষ কথা।
          </p>
        </div>

        {/* Replay / Read Again Button */}
        <div className="flex items-center justify-center pt-2">
          <button
            onClick={onReplay}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-pink-300"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Read Letter Again</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
