import React, { useEffect, useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { PlayfulNumeral } from '../common/NumberCard';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy } from 'lucide-react';

interface Scene10Props {
  onRestart: () => void;
}

export const Scene10Celebration: React.FC<Scene10Props> = ({ onRestart }) => {
  const [activeNumber, setActiveNumber] = useState<number | null>(null);

  useEffect(() => {
    sound.playCelebration();
    sound.speakArabic('أحسنت! أنا أعرف الأرقام!');

    confetti({
      particleCount: 65,
      spread: 90,
      origin: { y: 0.4 },
      colors: ['#26B7FF', '#FDE700', '#10B981', '#F43F5E'],
    });
  }, []);

  const handleNumeralTap = (num: number) => {
    setActiveNumber(num);
    sound.playCountNote(num === 0 ? 1 : num);
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
        {/* Celebration Trophy & Badge */}
        <div className="flex flex-col items-center gap-2 text-center animate-bounce">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-white shadow-2xl border-4 border-white">
            <Trophy className="w-13 h-13 text-amber-900 drop-shadow-sm" />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <Sparkles className="w-9 h-9 text-amber-500 animate-spin" />
            <h1 className="text-6xl font-black text-slate-800 font-['Tajawal'] tracking-wide drop-shadow-sm">
              أَحْسَنْتَ! ⭐
            </h1>
            <Sparkles className="w-9 h-9 text-amber-500 animate-spin" />
          </div>

          <p className="text-5xl font-black text-[#0284C7] font-['Tajawal'] mt-1 drop-shadow-md">
            « أَنَا أَعْرِفُ الأَرْقَام! »
          </p>
        </div>

        {/* Interactive Dancing Number Ribbon ٠ to ١٠ using 3D PlayfulNumerals (No white cards!) */}
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
          ابدأ الدرس من جديد ↺
        </button>
      </div>
    </div>
  );
};
