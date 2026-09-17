import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { HeroNumeral } from '../common/NumberCard';
import { LearningObject } from '../common/VisualAssets';
import { toEasternArabic } from '../../utils/arabic';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene6Props {
  onComplete: () => void;
}

export const Scene6Meet6to10: React.FC<Scene6Props> = ({ onComplete }) => {
  // Goal: Stack 7 toy blocks in the children's construction area
  const targetQuantity = 7;
  const [stackedCount, setStackedCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const blockColors = [
    '#EF4444',
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#8B5CF6',
    '#EC4899',
    '#06B6D4',
  ];

  const handleAddBlock = () => {
    if (stackedCount >= targetQuantity || isCompleted) return;

    const nextCount = stackedCount + 1;
    sound.playCountNote(nextCount);
    sound.speakArabic(toEasternArabic(nextCount));
    setStackedCount(nextCount);

    if (nextCount === targetQuantity) {
      setIsCompleted(true);
      setTimeout(() => {
        sound.playCelebration();
        sound.speakArabic('سبعة مكعبات! ممتاز');
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#26B7FF', '#FDE700', '#10B981'],
        });
        onComplete();
      }, 600);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="playroom" />

      <InstructionBar instruction="ابنِ ٧ مكعبات!" />

      <div className="relative flex-1 flex items-center justify-around z-10 px-24">
        {/* Left Area: Tower Building Zone on Playroom Rug */}
        <div className="flex flex-col items-center justify-end h-[420px] w-80">
          {/* Blocks stacked vertically from bottom up */}
          <div className="flex flex-col-reverse items-center gap-1.5 z-20">
            {Array.from({ length: stackedCount }).map((_, idx) => (
              <div
                key={idx}
                className="w-28 h-12 rounded-xl flex items-center justify-center text-white font-black text-2xl font-['Tajawal'] shadow-md border-2 border-white/80 animate-object-drop"
                style={{ backgroundColor: blockColors[idx % blockColors.length] }}
              >
                {toEasternArabic(idx + 1)}
              </div>
            ))}
          </div>

          {/* Wooden Construction Base */}
          <div className="w-48 h-8 bg-[#92400E] rounded-xl border-4 border-[#B45309] shadow-xl mt-2 flex items-center justify-center">
            <span className="text-amber-100 font-bold text-sm">قَاعِدَة البِنَاء</span>
          </div>
        </div>

        {/* Center/Right Area: Supply Block & Target Numeral */}
        <div className="flex flex-col items-center gap-8 z-20">
          {isCompleted ? (
            <div className="animate-bounce">
              <HeroNumeral number={7} label="سَبْعَة" size="xl" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div
                onClick={handleAddBlock}
                className="cursor-pointer transition-all duration-300 hover:scale-115 active:scale-95 p-4 rounded-3xl bg-white/70 backdrop-blur-xs border-4 border-amber-300 shadow-2xl animate-pulse-glow flex flex-col items-center"
                title="اضغط لإضافة مكعب إلى البرج"
              >
                <LearningObject type="block" size={110} />
                <span className="mt-2 text-xl font-bold text-slate-700 font-['Tajawal']">
                  المس لإضافة مكعب
                </span>
              </div>

              {/* Progress pill */}
              <div className="bg-white/90 px-8 py-2 rounded-full border-2 border-amber-400 font-black text-2xl text-amber-700 shadow-md">
                {toEasternArabic(stackedCount)} / {toEasternArabic(targetQuantity)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
