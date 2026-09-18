import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function SakuraPetals() {
  // Mobile-optimized petal count (9 lightweight GPU-accelerated petals)
  const petals = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      xStart: Math.random() * 95,
      xEndDelta: (Math.random() - 0.5) * 20,
      size: 14 + Math.random() * 12,
      duration: 10 + Math.random() * 6,
      delay: Math.random() * 5,
      rotateStart: Math.random() * 180,
      rotateEnd: Math.random() * 360 + 180,
      opacity: 0.6 + Math.random() * 0.3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transform-gpu">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-pink-300 will-change-transform"
          style={{
            left: `${p.xStart}%`,
            top: '-5%',
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [`0vw`, `${p.xEndDelta}vw`],
            rotate: [p.rotateStart, p.rotateEnd],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {/* Clean GPU-friendly Sakura Petal SVG */}
          <svg viewBox="0 0 30 30" className="w-full h-full">
            <path d="M15,2 C18,7 26,9 26,16 C26,23 19,28 15,28 C11,28 4,23 4,16 C4,9 12,7 15,2 Z" fill="#FBCFE8" fillOpacity="0.85" stroke="#F472B6" strokeWidth="0.8" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
