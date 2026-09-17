import React, { useEffect, useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { PlayfulNumeral } from '../common/NumberCard';
import { CountingObject } from '../common/VisualAssets';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy } from 'lucide-react';

interface Scene9Props {
  onRestart: () => void;
}

export const Scene9Celebration: React.FC<Scene9Props> = ({ onRestart }) => {
  const { t, formatNum, speak } = useLanguage();
  const [activeNumber, setActiveNumber] = useState<number | null>(null);

  useEffect(() => {
    sound.playCelebration();
    speak(t.scene9.successCelebration);

    confetti({
      particleCount: 75,
      spread: 95,
      origin: { y: 0.4 },
      colors: ['#26B7FF', '#FDE700', '#10B981', '#F43F5E'],
    });
  }, [speak, t.scene9.successCelebration]);

  const handleNumeralTap = (num: number) => {
    setActiveNumber(num);
    sound.playCountNote(num === 0 ? 1 : num);
    speak(formatNum(num));
    setTimeout(() => setActiveNumber(null), 600);
  };

  const colors: Array<'blue' | 'yellow' | 'green' | 'coral' | 'amber' | 'purple'> = [
    'blue',
    'yellow',
    'green',
    'coral',
    'amber',
    'purple',
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="celebration" />

      {/* Main Celebration Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-6 z-10 px-16">
        
        {/* Floating Celebration Assets on Left & Right Flanks */}
        <div className="absolute left-10 top-16 flex flex-col items-center gap-6 pointer-events-none opacity-90 animate-float-slow">
          <CountingObject type="balloon" size={90} color="red" />
          <CountingObject type="star" size={60} />
        </div>
        <div className="absolute right-10 top-16 flex flex-col items-center gap-6 pointer-events-none opacity-90 animate-float-slow" style={{ animationDelay: '-1.8s' }}>
          <CountingObject type="balloon" size={90} color="blue" />
          <CountingObject type="star" size={60} />
        </div>

        {/* Celebration Trophy & Badge */}
        <div className="flex flex-col items-center gap-2 text-center animate-bounce">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-white shadow-2xl border-4 border-white">
            <Trophy className="w-13 h-13 text-amber-900 drop-shadow-sm" />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <Sparkles className="w-9 h-9 text-amber-500 animate-spin" />
            <h1 className="text-6xl font-black text-slate-800 font-['Tajawal'] tracking-wide drop-shadow-sm">
              {t.scene9.wellDone} ⭐
            </h1>
            <Sparkles className="w-9 h-9 text-amber-500 animate-spin" />
          </div>

          <p className="text-5xl font-black text-[#0284C7] font-['Tajawal'] mt-1 drop-shadow-md">
            « {t.scene9.iKnowNumbers} »
          </p>
        </div>

        {/* Interactive Dancing Number Ribbon 0 to 10 using 3D PlayfulNumerals */}
        <div className="flex items-center justify-center gap-3 flex-wrap max-w-5xl z-20" dir="ltr">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, idx) => (
            <div
              key={num}
              className="transform transition-transform hover:scale-125"
            >
              <PlayfulNumeral
                number={num}
                size="sm"
                color={colors[idx % colors.length]}
                isSelected={activeNumber === num}
                isCorrect={activeNumber === num}
                onClick={() => handleNumeralTap(num)}
                className={activeNumber === num ? 'animate-bounce' : 'animate-float-slow'}
              />
            </div>
          ))}
        </div>

        {/* Restart Course Button */}
        <button
          onClick={() => {
            sound.playPop();
            onRestart();
          }}
          className="mt-2 px-12 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-2xl font-['Tajawal'] shadow-2xl hover:scale-108 active:scale-95 transition-all cursor-pointer border-3 border-white"
        >
          {t.scene9.restartCourse} ↺
        </button>
      </div>
    </div>
  );
};

