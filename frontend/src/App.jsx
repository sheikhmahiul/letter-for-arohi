import React, { useState, useEffect } from 'react';
import SakuraPetals from './components/SakuraPetals';
import AudioPlayer from './components/AudioPlayer';
import EnvelopeScene from './components/EnvelopeScene';
import LoveLetterScene from './components/LoveLetterScene';
import CelebrationScene from './components/CelebrationScene';
import ResponseDashboard from './components/ResponseDashboard';
import { Heart, Activity } from 'lucide-react';

export default function App() {
  const [currentScene, setCurrentScene] = useState('envelope');
  const [noClickCount, setNoClickCount] = useState(0);

  // Simple client-side route handler for /response
  useEffect(() => {
    if (window.location.pathname === '/response') {
      setCurrentScene('dashboard');
    }
  }, []);

  const handleOpenLetter = () => {
    setCurrentScene('letter');
  };

  const handleAccept = (hesitationCount) => {
    setNoClickCount(hesitationCount);
    setCurrentScene('celebration');
  };

  const handleReplay = () => {
    setCurrentScene('letter');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 text-pink-950 relative selection:bg-pink-200 selection:text-pink-900 flex flex-col justify-between">
      {/* Background Floating Sakura Petals */}
      <SakuraPetals />

      {/* Header Bar */}
      <header className="relative z-30 w-full px-4 py-3 sm:px-8 flex items-center justify-between backdrop-blur-md bg-white/40 border-b border-pink-200/60 shadow-2xs">
        <div 
          onClick={() => setCurrentScene('envelope')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 fill-current text-white" />
          </div>
          <div className="flex items-center gap-1.5 text-sm sm:text-base font-semibold">
            <span className="text-pink-800 font-medium">Love Letter for</span>
            <span className="text-rose-600 font-bold text-base sm:text-lg bg-rose-100/80 px-2.5 py-0.5 rounded-full border border-rose-300 shadow-2xs tracking-wide">
              Arohi 🌸
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <AudioPlayer />

          <button
            onClick={() => setCurrentScene(currentScene === 'dashboard' ? 'envelope' : 'dashboard')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/80 hover:bg-pink-200/80 border border-pink-300 text-pink-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="View Live Response Status Dashboard"
          >
            <Activity className="w-3.5 h-3.5 text-pink-600" />
            <span className="hidden sm:inline">Status</span>
            <span>/response</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Scene */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {currentScene === 'envelope' && (
          <EnvelopeScene onOpenLetter={handleOpenLetter} />
        )}

        {currentScene === 'letter' && (
          <LoveLetterScene onAccept={handleAccept} />
        )}

        {currentScene === 'celebration' && (
          <CelebrationScene noClickCount={noClickCount} onReplay={handleReplay} />
        )}

        {currentScene === 'dashboard' && (
          <ResponseDashboard onBackToLetter={() => setCurrentScene('letter')} />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-30 w-full py-4 text-center text-xs text-pink-600/80 font-medium border-t border-pink-200/50 backdrop-blur-xs bg-white/30">
        <p>Crafted with endless love for Arohi 💖 | Powered by React & Laravel API</p>
      </footer>
    </div>
  );
}
