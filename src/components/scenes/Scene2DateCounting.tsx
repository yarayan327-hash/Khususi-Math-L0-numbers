import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { LearningObject } from '../common/VisualAssets';
import { toEasternArabic } from '../../utils/arabic';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene2Props {
  onComplete: () => void;
}

export const Scene2DateCounting: React.FC<Scene2Props> = ({ onComplete }) => {
  // Pure tap-to-count activity (1 of 2 in entire course):
  // 5 golden dates on a decorative market platter on the wooden shop counter.
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const totalDates = 5;

  const handleDateTap = (idx: number) => {
    if (!tappedIndices.includes(idx) && !isCompleted) {
      const nextCount = tappedIndices.length + 1;
      sound.playCountNote(nextCount);
      sound.speakArabic(toEasternArabic(nextCount));
      const updated = [...tappedIndices, idx];
      setTappedIndices(updated);

      if (updated.length === totalDates) {
        setIsCompleted(true);
        setTimeout(() => {
          sound.playCelebration();
          sound.speakArabic('خمس تمرات! ممتاز');
          confetti({
            particleCount: 55,
            spread: 70,
            origin: { y: 0.55 },
            colors: ['#26B7FF', '#FDE700', '#10B981'],
          });
          onComplete();
        }, 500);
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="fruit_shop" />

      <InstructionBar instruction="عُدّ التمر!" />

      {/* Fruit shop wooden counter interaction plane */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-8 z-10 px-16">
        {/* Silver Market Platter holding dates */}
        <div className="relative w-[750px] h-[340px] rounded-[170px] bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] border-8 border-amber-300 shadow-2xl flex items-center justify-center p-8">
          {/* Inner embossed platter ring */}
          <div className="absolute inset-4 rounded-[150px] border-4 border-dashed border-amber-200/70" />

          {/* 5 Dates placed naturally on the platter */}
          <div className="flex items-center justify-center gap-8 z-10 flex-wrap">
            {Array.from({ length: totalDates }).map((_, idx) => {
              const isTapped = tappedIndices.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => handleDateTap(idx)}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  className={`relative cursor-pointer select-none transition-all duration-300 p-2 rounded-full animate-object-drop ${
                    isTapped
                      ? 'scale-110 filter drop-shadow-2xl'
                      : 'hover:scale-120 active:scale-95 animate-float-slow filter drop-shadow-lg'
                  }`}
                >
                  <LearningObject type="date" size={110} />

                  {isTapped && (
                    <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-tr from-[#26B7FF] to-[#0284C7] text-white font-black text-3xl font-['Tajawal'] flex items-center justify-center shadow-xl border-3 border-white animate-bounce">
                      {toEasternArabic(tappedIndices.indexOf(idx) + 1)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Celebratory Total Banner */}
        {isCompleted && (
          <div className="flex items-center gap-4 bg-emerald-500 text-white px-12 py-3 rounded-full shadow-2xl border-4 border-white animate-bounce">
            <span className="text-3xl font-extrabold font-['Tajawal']">المجموع:</span>
            <span className="text-6xl font-black font-['Tajawal']">
              {toEasternArabic(totalDates)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
