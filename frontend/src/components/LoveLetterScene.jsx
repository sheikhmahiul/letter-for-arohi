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
          recipient_name: 'special ফুল',
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
            প্রিয় special ফুল,
          </h2>
        </div>

        {/* Exact Confession Letter Text */}
        <div className="font-bengali text-pink-950 text-base sm:text-lg leading-relaxed text-left space-y-4 font-normal">
          <p>
            হেই special ফুল,
          </p>
          <p>
            এই কথাগুলো আমার বুকের গভীরে অনেকদিন ধরে লুকিয়ে ছিল। প্রতিবার তোমার কথা মনে পড়লেই বুকের ভেতরটা কেঁপে উঠত, কিন্তু ঠোঁটে কথা আসত না। আজ যেন কোনো অদৃশ্য হাত আমাকে ধাক্কা দিল… আর আমি সাহস করে তোমার সামনে এসে দাঁড়ালাম, আমার পুরো হৃদয়টা খুলে দিয়ে।
          </p>
          <p className="font-semibold text-rose-700 text-lg sm:text-xl">
            special ফুল, আমি তোমার প্রেমে পড়ে গেছি।
          </p>
          <p>
            শুধু তোমার হাসি নয়, তোমার Indian accent-এ কথা বলার সেই মিষ্টি সুর, তোমার চোখের আড়ালে লুকানো সেই নরম আলো—সবকিছু মিলিয়ে তুমি আমার রাতের ঘুম কেড়ে নিয়েছ। প্রথম যেদিন তোমাকে দেখেছিলাম, সেদিন থেকেই তোমার মায়া আমার রক্তের সঙ্গে মিশে গেছে। তুমি কথা বললে আমার পৃথিবী থেমে যায়, তুমি হাসলে আমার বুকের ভেতরটা ফুলের মতো খুলে যায়।
          </p>
          <p>
            আমি জানি, তুমি জুপিটারকে অনেক পছন্দ করো। কিন্তু সে তোমাকে পাত্তা দেয় না। ও নিজেকে এতটাই বড় মনে করে যে তার চোখে তোমার মতো একটা আকাশও ছোট হয়ে যায়। আর ঠিক এই কারণেই আমার ওকে একটুও ভালো লাগে না। আগে আমি ভেবেছিলাম হয়তো তোমাদের মধ্যে কিছু আছে, তাই দূরে সরে গিয়েছিলাম। পরে যখন বুঝলাম যে সেখানে কোনো সম্পর্ক নেই, তখন আমার বুকের ভেতরটা চিৎকার করে উঠল—“এবার বলো, নইলে সারাজীবন এই অপূর্ণতা নিয়ে বাঁচতে হবে।”
          </p>
          <p className="font-semibold text-pink-900 bg-pink-100/60 p-3.5 rounded-2xl border border-pink-200/80">
            আজ ত্রিশে সেপ্টেম্বর।
          </p>
          <p>
            আমি ইচ্ছা করলে বিশে সেপ্টেম্বরই তোমাকে সবকিছু বলে দিতে পারতাম… সেদিন তুমি আমার কথা মন দিয়ে শুনছিলে। কিন্তু আমি নিজেকে আটকে রেখেছিলাম। কারণ আমার মনে একটা নরম আশা ছিল—যদি এর মধ্যে জুপিটার তোমাকে গ্রহণ করে, তাহলে আমি নিঃশব্দে তোমাদের জীবন থেকে সরে যাবো। একজন সাধারণ পাবলিক হয়ে তোমাদের সুখের পথে কোনো ছায়া ফেলব না। তোমার হাসি যাতে কখনো ভাঙে না, সেই চিন্তাই আমাকে চুপ করে রেখেছিল।
          </p>
          <p>
            কিন্তু আর পারছি না, special ফুল… অপেক্ষা করতে পারছি না। আমার হৃদয় আর ধরে রাখতে পারছি না এই নীরবতাকে।
          </p>
          <p>
            special ফুল, আমি জানি না তোমার চোখে আমি কতটা মূল্যবান। কিন্তু আমি এইটুকু জানি—আমি তোমাকে আমার শেষ নিঃশ্বাস পর্যন্ত ভালোবাসতে চাই। এমন ভালোবাসা দিতে চাই যেটা তোমাকে প্রতিদিন নতুন করে প্রেমের অনুভূতি দেবে, যেটা তোমাকে কখনো একা অনুভব করতে দেবে না। আমি তোমাকে জোর করব না। শুধু একবার, শুধু একবার তোমার কাছে হাত বাড়িয়ে বলতে চাই… যদি কখনো তুমিও আমার দিকে তাকাতে চাও, আমি এখানেই আছি। সারাজীবন তোমাকে না পাওয়ার সেই তীব্র regret-এর চেয়ে, আজ তোমাকে সবকিছু বলে দেওয়াই আমার কাছে অনেক বেশি মূল্যবান।
          </p>
          <p>
            তোমার কণ্ঠস্বর, তোমার হাসি, তোমার পুরো অস্তিত্ব—আমি সবকিছুর প্রেমে ডুবে গেছি।
          </p>
          <p>
            আর তুমি জানো, আমি প্রেম নিয়ে কখনো খেলা করি না। যা বলি, তা আমার হৃদয়ের গভীরতম জায়গা থেকে আসে।
          </p>
          <p className="font-medium text-pink-900">
            তোমার জন্য অপেক্ষা করছি…
          </p>
          <p className="font-semibold text-rose-700 text-lg">
            শুধু তোমার একটা উত্তরের জন্য।
          </p>
          <div className="pt-4 text-right font-bengali">
            <p className="font-semibold text-pink-900 text-base sm:text-lg">
              ইতি,
            </p>
            <p className="font-bold text-rose-700 text-lg sm:text-xl mt-0.5">
              Mahiul Sheikh
            </p>
          </div>
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
