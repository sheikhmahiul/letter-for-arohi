import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Soft romantic chime chords (F major 7 / C major 7 notes: F, A, C, E, G)
      const notes = [349.23, 440.00, 523.25, 659.25, 783.99, 523.25, 440.00, 349.23];
      let step = 0;

      const playNote = () => {
        if (ctx.state === 'closed') return;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[step % notes.length], ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.6);

        step++;
      };

      playNote();
      timerRef.current = setInterval(playNote, 1200);
      setIsPlaying(true);
    } catch (e) {
      console.warn('Audio synthesis error:', e);
    }
  };

  const stopAudio = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      aria-label="Toggle romantic music"
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white backdrop-blur-md border border-pink-200 text-pink-700 shadow-sm transition-all text-xs font-medium cursor-pointer"
    >
      <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin text-pink-500' : ''}`} />
      <span>{isPlaying ? 'Music On' : 'Play Music'}</span>
      {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
    </button>
  );
}
