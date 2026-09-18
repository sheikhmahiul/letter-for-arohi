import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function SakuraPetals() {
  // Generate a set of 18 unique falling petals
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      xStart: Math.random() * 100,
      xEndDelta: (Math.random() - 0.5) * 30,
      size: 14 + Math.random() * 16,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 6,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 720 + 360,
      opacity: 0.5 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-pink-300"
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
          {/* Detailed SVG Sakura Petal */}
          <svg viewBox="0 0 30 30" fill="currentColor" className="w-full h-full drop-shadow-sm">
            <path d="M15,2 C18,7 26,9 26,16 C26,23 19,28 15,28 C11,28 4,23 4,16 C4,9 12,7 15,2 Z" fill="#FBCFE8" fillOpacity="0.85" stroke="#F472B6" strokeWidth="0.8" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
