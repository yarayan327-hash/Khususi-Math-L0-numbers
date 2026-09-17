import React from 'react';
import { Volume2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface InstructionBarProps {
  instruction: string;
}

export const InstructionBar: React.FC<InstructionBarProps> = ({ instruction }) => {
  const handleSpeak = () => {
    sound.speakArabic(instruction);
    sound.playPop();
  };

  return (
    <div className="w-full flex items-center justify-center pt-4 pb-1 z-20 select-none pointer-events-none">
      <div className="pointer-events-auto inline-flex items-center gap-3 bg-white/95 backdrop-blur-md px-7 py-2.5 rounded-full shadow-lg border-2 border-amber-300 transition-transform hover:scale-105">
        <h2 className="text-3xl font-black text-slate-800 tracking-wide font-['Tajawal'] drop-shadow-xs">
          {instruction}
        </h2>
        <button
          onClick={handleSpeak}
          title="استمع للكلمة"
          className="w-9 h-9 rounded-full bg-sky-100 hover:bg-sky-200 text-[#0284C7] flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-inner"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

