import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MessageCircleHeart } from 'lucide-react';

import { getApiUrl } from '../utils/api';

export default function LoveLetterScene({ onAccept, onReject }) {
  const [noClickCount, setNoClickCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNoClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const nextCount = noClickCount + 1;
    setNoClickCount(nextCount);

    // Submit to Laravel API backend if available
    const apiUrl = getApiUrl();
    if (apiUrl) {
      try {
        await fetch(`${apiUrl}/response`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            recipient_name: 'Sneha',
            response_status: 'rejected',
            no_click_count: nextCount,
          }),
        });
      } catch (err) {
        console.warn('Backend API request skipped or offline:', err);
      }
    }

    setTimeout(() => {
      onReject();
    }, 300);
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

    // Submit to Laravel API backend if available
    const apiUrl = getApiUrl();
    if (apiUrl) {
      try {
        await fetch(`${apiUrl}/response`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            recipient_name: 'Sneha',
            response_status: 'accepted',
            no_click_count: noClickCount,
          }),
        });
      } catch (err) {
        console.warn('Backend API request skipped or offline:', err);
      }
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
      {/* Paper Card - Overflow visible so moving elements are never clipped */}
      <div className="w-full max-w-2xl bg-amber-50/95 border-2 border-pink-200 rounded-3xl p-4 sm:p-10 shadow-2xl shadow-pink-200/50 relative backdrop-blur-sm">
        
        {/* Decorative Floral/Heart Corners */}
        <div className="absolute top-3 left-3 text-pink-300 opacity-60 pointer-events-none">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-pink-200" />
        </div>
        <div className="absolute top-3 right-3 text-pink-300 opacity-60 pointer-events-none">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-pink-200" />
        </div>
        <div className="absolute bottom-3 left-3 text-pink-300 opacity-60 pointer-events-none">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300" />
        </div>
        <div className="absolute bottom-3 right-3 text-pink-300 opacity-60 pointer-events-none">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300" />
        </div>

        {/* Letter Header */}
        <div className="mb-3 sm:mb-6 text-left">
          <h2 className="font-bengali text-xl sm:text-3xl font-bold text-pink-900 border-b border-pink-200/80 pb-1 sm:pb-2 inline-block">
            Sneha,
          </h2>
        </div>

        {/* Love Letter Text */}
        <div className="font-bengali text-pink-950 text-sm sm:text-base leading-snug sm:leading-relaxed text-left space-y-2.5 sm:space-y-4 font-normal">
          <p className="font-medium text-pink-900">
            Hey Sneha, ❤️
          </p>
          <p>
            প্রথম যেদিন তোমাকে দেখেছিলাম, সেদিনই তোমার চোখের মায়ায় পড়ে গিয়েছিলাম। সেই দিন থেকে রাতে ঘুম হতো না, শুধু তোমার ওই দুটি চোখের কথা মনে পড়ত, আর মনে পড়ত তোমার মায়াবী হাসি। 🥹❤️
          </p>
          <p>
            তুমি জানো, আমি তোমাকে কতটা ভালোবাসি। আমি চাই, তুমি আমার হয়ে যাও, আর আমিও তোমার হয়ে যাই। আমি তোমার মায়ায় পাগল হয়ে যাচ্ছি। তোমার কাছে বেশি কিছু চাই না, শুধু কিছু আবদার আছে। তুমি এখন আমাকে যেভাবে কেয়ার করো, শেষ পর্যন্ত আমি চাই তুমি আমার পাশে একইভাবে থেকো এবং আমার যত্ন নিয়ো।
          </p>
          <p>
            আর একটা কথা, স্নেহা—আমাদের মধ্যে যতই ঝগড়া হোক না কেন, আমি চাই আমরা দুজন একসঙ্গে বসে সবকিছু সমাধান করি। আমাদের মাঝের সমস্যাগুলো যেন কখনো অন্য কারও কারণে আরও বড় না হয়ে যায়। আমি চাই, আমাদের সম্পর্কের মধ্যে কখনো কোনো তৃতীয় ব্যক্তি এসে জায়গা না করে নিক। আমরা যেন একে অপরকে বুঝে, বিশ্বাস করে সবকিছু ঠিক করে নিতে পারি। ❤️
          </p>
          <p>
            আমি চাই, তুমি শুধু আমার হও, কারণ তুমি আমার জীবনের শান্তি আর হাসির কারণ। তুমি আমার পূর্ণিমার চাঁদ। ❤️🌙
          </p>
          <p className="font-semibold text-rose-700 text-base sm:text-xl">
            Finally, Sneha, আমি চাই তুমি আমার হয়ে যাও। স্নেহা, তুমি কি আমার হবে চিরজীবনের জন্য? 🥺💗
          </p>
          <div className="pt-4 text-right font-bengali">
            <p className="font-semibold text-pink-900 text-base sm:text-lg">
              ইতি,
            </p>
            <p className="font-bold text-rose-700 text-lg sm:text-xl mt-0.5">
              Munim
            </p>
          </div>
        </div>

        {/* Romantic Ornamental Divider */}
        <div className="my-4 sm:my-8 flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-pink-300" />
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500 animate-pulse" />
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-pink-300" />
        </div>

        {/* Final Question */}
        <div className="text-center mb-4 sm:mb-8">
          <p className="font-bengali text-base sm:text-xl font-bold text-pink-900 leading-snug">
            তুমি কি চাও, জীবনের শেষ নিঃশ্বাস পর্যন্ত আমি তোমার পাশে থাকি, আর তুমি আমার পাশে? 🫶❤️
          </p>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 relative min-h-[100px] sm:min-h-[140px] py-2 sm:py-4">
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYesClick}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white font-bengali font-semibold text-sm sm:text-lg shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all cursor-pointer flex items-center justify-center gap-2 z-20"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <span>হ্যাঁ, আমি তোমার সাথেই থাকবো ❤️</span>
          </motion.button>

          {/* NO Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNoClick}
            className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-bengali font-medium text-xs sm:text-base shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 z-20 shrink-0"
          >
            <span>না, Sorry 💔</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
