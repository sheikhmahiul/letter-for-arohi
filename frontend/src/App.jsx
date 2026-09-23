import React, { useState } from 'react';
import SakuraPetals from './components/SakuraPetals';
import AudioPlayer from './components/AudioPlayer';
import EnvelopeScene from './components/EnvelopeScene';
import LoveLetterScene from './components/LoveLetterScene';
import CelebrationScene from './components/CelebrationScene';
import RejectionScene from './components/RejectionScene';
import { Heart } from 'lucide-react';

export default function App() {
  const [currentScene, setCurrentScene] = useState('envelope');
  const [noClickCount, setNoClickCount] = useState(0);

  const handleOpenLetter = () => {
    setCurrentScene('letter');
  };

  const handleAccept = (hesitationCount) => {
    setNoClickCount(hesitationCount);
    setCurrentScene('celebration');
  };

  const handleReject = () => {
    setCurrentScene('rejection');
  };

  const handleReplay = () => {
    setCurrentScene('letter');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 text-pink-950 relative selection:bg-pink-200 selection:text-pink-900 flex flex-col justify-between">
      {/* Background Floating Sakura Petals */}
      <SakuraPetals />

      {/* Header Bar */}
      <header className="relative z-30 w-full px-3 py-2.5 sm:px-8 flex items-center justify-between backdrop-blur-md bg-white/60 border-b border-pink-200/60 shadow-2xs gap-2">
        <div 
          onClick={() => setCurrentScene('envelope')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
            <Heart className="w-4 h-4 fill-current text-white" />
          </div>
          <div className="flex items-center gap-1 text-xs sm:text-base font-semibold">
            <span className="text-pink-800 font-medium hidden sm:inline">Love Letter for</span>
            <span className="text-rose-600 font-bold text-xs sm:text-lg bg-rose-100/90 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full border border-rose-300 shadow-2xs tracking-wide">
              special ফুল 🌸
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <AudioPlayer />
        </div>
      </header>

      {/* Main Interactive Scene */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {currentScene === 'envelope' && (
          <EnvelopeScene onOpenLetter={handleOpenLetter} />
        )}

        {currentScene === 'letter' && (
          <LoveLetterScene onAccept={handleAccept} onReject={handleReject} />
        )}

        {currentScene === 'celebration' && (
          <CelebrationScene noClickCount={noClickCount} onReplay={handleReplay} />
        )}

        {currentScene === 'rejection' && (
          <RejectionScene onReplay={handleReplay} />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-30 w-full py-4 text-center text-xs text-pink-600/80 font-medium border-t border-pink-200/50 backdrop-blur-xs bg-white/30">
        <p>Crafted with endless love for special ফুল 💖</p>
      </footer>
    </div>
  );
}
