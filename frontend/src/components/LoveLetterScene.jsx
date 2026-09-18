import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MessageCircleHeart } from 'lucide-react';

export default function LoveLetterScene({ onAccept }) {
  const [noClickCount, setNoClickCount] = useState(0);
  const [noMessage, setNoMessage] = useState('');
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Playful Bangla messages for the "No" button interactions
  const noMessages = [
    'তুমি কি আরেকবার ভেবে দেখবে? 🥺',
    'আমি তোমাকে জোর করছি না, শুধু আরেকবার ভাবতে বলছি। 💗',
    'তোমার সিদ্ধান্তকে আমি সম্মান করব। ❤️',
    'তোমার সিদ্ধান্ত তোমারই। আমি শুধু আমার মনের কথাটা বলতে চেয়েছিলাম।',
  ];

  // Bounded vertical & diagonal positions (guaranteed ZERO overlap with Yes button & ZERO container overflow)
  const safePositions = [
    { x: -50, y: -55 },  // Top-Center (Above Yes button)
    { x: -50, y: 55 },   // Bottom-Center (Below Yes button)
    { x: -15, y: -55 },  // Top-Right (Above & Right of Yes)
    { x: -15, y: 55 },   // Bottom-Right (Below & Right of Yes)
    { x: 10, y: -55 },   // Top-Far-Right (Safe from right border)
    { x: 10, y: 55 },    // Bottom-Far-Right (Safe from right border)
  ];

  const handleNoInteraction = () => {
    const nextCount = noClickCount + 1;
    setNoClickCount(nextCount);

    // Pick message index based on click count
    const msgIndex = Math.min(nextCount - 1, noMessages.length - 1);
    setNoMessage(noMessages[msgIndex]);

    // Pick safe coordinates that move right/up/down cleanly away from Yes button
    const pos = safePositions[(nextCount - 1) % safePositions.length];
    setNoButtonPos(pos);
  };

  const handleYesClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Trigger romantic confetti effect
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#E63946', '#FBCFE8', '#FFF'],
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }

    // Submit to Laravel API backend
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
    try {
      await fetch(`${apiUrl}/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          recipient_name: 'Arohi',
          response_status: 'accepted',
          no_click_count: noClickCount,
        }),
      });
    } catch (err) {
      console.warn('Backend API request skipped or offline:', err);
    }

    setTimeout(() => {
      onAccept(noClickCount);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative z-10"
    >
      {/* Paper Card */}
      <div className="w-full max-w-2xl bg-amber-50/95 border-2 border-pink-200 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-pink-200/50 relative overflow-hidden backdrop-blur-sm">
        
        {/* Decorative Floral/Heart Corners */}
        <div className="absolute top-3 left-3 text-pink-300 opacity-60">
          <Heart className="w-6 h-6 fill-pink-200" />
        </div>
        <div className="absolute top-3 right-3 text-pink-300 opacity-60">
          <Heart className="w-6 h-6 fill-pink-200" />
        </div>
        <div className="absolute bottom-3 left-3 text-pink-300 opacity-60">
          <Sparkles className="w-5 h-5 text-pink-300" />
        </div>
        <div className="absolute bottom-3 right-3 text-pink-300 opacity-60">
          <Sparkles className="w-5 h-5 text-pink-300" />
        </div>

        {/* Letter Header */}
        <div className="mb-6 text-left">
          <h2 className="font-bengali text-2xl sm:text-3xl font-bold text-pink-900 border-b border-pink-200/80 pb-2 inline-block">
            প্রিয় আরোহী,
          </h2>
        </div>

        {/* Exact Confession Letter Text */}
        <div className="font-bengali text-pink-950 text-base sm:text-lg leading-relaxed text-left space-y-4 font-normal">
          <p>
            হেই আরোহী,
          </p>
          <p>
            এই কথাগুলো আমি অনেক দিন ধরে তোমাকে বলতে চেয়েছি, কিন্তু সাহস করে বলতে পারিনি। আজকে জানি না কোথা থেকে যেন সাহসটা পেলাম, তাই আমার মনের কথাগুলো তোমার কাছে confess করতে আসছি।
          </p>
          <p>
            জানি না তুমি এই কথাগুলো কীভাবে নেবে, কিন্তু আমি তোমার character-এর প্রেমে পড়ে গেছি। তোমার Indian accent-এ কথা বলা, তোমার হাসা, তোমার সবকিছুই আমার অনেক ভালো লাগে।
          </p>
          <p>
            আমি জানি না আমি তোমার চোখে কতটা ভালো, কিন্তু আমি এইটুকু নিশ্চিত যে আমি তোমাকে অনেক ভালোবাসা দিতে চাই। এমন ভালোবাসা, যেটা আমি মনে করি পৃথিবীর অন্য কেউ হয়তো তোমাকে দিতে পারবে না।
          </p>
          <p>
            আমি তোমাকে কোনোভাবেই জোর করব না। আমি শুধু তোমার কাছে একবার আশা করছি, যাতে সারাজীবন তোমাকে না পাওয়ার regret নিয়ে থাকতে না হয়।
          </p>
          <p>
            তোমার কথা বলা, হাসাহাসি করা, character—সবকিছুর প্রেমে পড়ে গেছি আমি।
          </p>
          <p>
            আর তুমি জানো, আমি কোনো relationship নিয়ে মজা করি না। আমি যা বলি, serious হয়েই বলি।
          </p>
          <p className="font-semibold text-pink-900 bg-pink-100/60 p-3.5 rounded-2xl border border-pink-200/80">
            আমি চাই তুমি আমার সাথে সারাজীবন থাকো। যদি তুমি রাজি হও, তাহলে আমি তোমাকে একটা কথা sure করে বলতে পারি—আল্লাহ যদি আমার সাথে থাকেন, তাহলে আমি ২০২৮ সালের মধ্যে India গিয়ে তোমাকে বিয়ে করে নিয়ে আসার জন্য আমার সর্বোচ্চ চেষ্টা করব।
          </p>
          <p>
            আমি শুধু চাই, তুমি আমার সাথে থাকো।
          </p>
        </div>

        {/* Romantic Ornamental Divider */}
        <div className="my-8 flex items-center justify-center gap-3">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-pink-300" />
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-pink-300" />
        </div>

        {/* Final Question */}
        <div className="text-center mb-8">
          <p className="font-bengali text-lg sm:text-xl font-bold text-pink-900 leading-snug">
            তুমি কি চাও, জীবনের শেষ নিঃশ্বাস পর্যন্ত আমি তোমার পাশে থাকি, আর তুমি আমার পাশে? 🫶❤️
          </p>
        </div>

        {/* Gentle "No" Message Hint Box */}
        {noMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 px-4 py-2.5 rounded-2xl bg-pink-100/90 border border-pink-300 text-pink-800 text-sm font-bengali font-medium flex items-center justify-center gap-2"
          >
            <MessageCircleHeart className="w-4 h-4 text-pink-600 shrink-0" />
            <span>{noMessage}</span>
          </motion.div>
        )}

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative min-h-[140px] py-4">
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYesClick}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white font-bengali font-semibold text-base sm:text-lg shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all cursor-pointer flex items-center justify-center gap-2 z-20"
          >
            <Heart className="w-5 h-5 fill-current" />
            <span>হ্যাঁ, আমি তোমার সাথেই থাকবো ❤️</span>
          </motion.button>

          {/* NO Button (Playful movement) */}
          <motion.button
            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={handleNoInteraction}
            onMouseEnter={handleNoInteraction}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-bengali font-medium text-base shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 z-10"
          >
            <span>না, Sorry 💔</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
