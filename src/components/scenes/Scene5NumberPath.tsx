import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { PlayfulNumeral } from '../common/NumberCard';
import { CountingObject } from '../common/VisualAssets';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene5Props {
  onComplete: () => void;
}

export const Scene5NumberPath: React.FC<Scene5Props> = ({ onComplete }) => {
  const { t, formatNum, speak, isRTL } = useLanguage();
  // Stepping stones number path: 1 2 ? 4 5
  // Draggable answer stones below: [ 2, 3, 5 ]
  const [placedNumber, setPlacedNumber] = useState<number | null>(null);
  const [wrongNumber, setWrongNumber] = useState<number | null>(null);
  const [travelingStep, setTravelingStep] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleCorrectPlacement = () => {
    setPlacedNumber(3);
    setWrongNumber(null);
    sound.playSuccess();
    speak(t.scene5.successPath);

    // Payoff animation: Character / Star hops across completed path from 1 to 5
    setTimeout(() => {
      let step = 1;
      setTravelingStep(step);
      sound.playCountNote(step);

      const interval = setInterval(() => {
        step += 1;
        if (step <= 5) {
          setTravelingStep(step);
          sound.playCountNote(step);
        } else {
          clearInterval(interval);
          setTravelingStep(null);
          sound.playCelebration();
          confetti({
            particleCount: 65,
            spread: 85,
            origin: { y: 0.5 },
            colors: ['#26B7FF', '#FDE700', '#10B981'],
          });
          setTimeout(onComplete, 800);
        }
      }, 550);
    }, 500);
  };

  const handleSelectAnswer = (num: number) => {
    if (placedNumber !== null) return;
    if (num === 3) {
      handleCorrectPlacement();
    } else {
      setWrongNumber(num);
      sound.playSoftBounce();
      setTimeout(() => setWrongNumber(null), 500);
    }
  };

  // HTML5 Drag Handlers
  const handleDragStart = (e: React.DragEvent, num: number) => {
    if (placedNumber !== null) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', num.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (placedNumber === null) {
      e.preventDefault();
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const numStr = e.dataTransfer.getData('text/plain');
    if (numStr) {
      const num = parseInt(numStr, 10);
      handleSelectAnswer(num);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="garden_path" />

      {/* Short, purposeful instruction */}
      <InstructionBar instruction={t.scene5.instruction} />

      <div className="relative flex-1 flex flex-col items-center justify-center gap-14 z-10 px-16">
        
        {/* Stepping Stone Number Path (LTR Mathematical Order) */}
        <div
          className="relative flex items-center justify-center gap-6 p-8 rounded-full bg-emerald-950/25 backdrop-blur-xs border-4 border-emerald-400/70 shadow-2xl"
          dir="ltr"
        >
          {[1, 2, 3, 4, 5].map((stoneNum) => {
            const isMissingSlot = stoneNum === 3;
            const isFilled = isMissingSlot && placedNumber === 3;
            const hasTravelingHero = travelingStep === stoneNum;
            const questionMark = isRTL ? '؟' : '?';

            return (
              <div
                key={stoneNum}
                onDragOver={isMissingSlot && !isFilled ? handleDragOver : undefined}
                onDragLeave={isMissingSlot && !isFilled ? handleDragLeave : undefined}
                onDrop={isMissingSlot && !isFilled ? handleDrop : undefined}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center font-black text-6xl font-['Tajawal'] select-none transition-all duration-300 shadow-xl border-4 ${
                  hasTravelingHero
                    ? 'scale-125 ring-8 ring-yellow-400 bg-amber-400 text-slate-900 border-white animate-bounce z-30'
                    : isFilled
                    ? 'bg-gradient-to-tr from-[#26B7FF] to-[#0284C7] text-white border-white scale-110 shadow-2xl'
                    : isMissingSlot
                    ? isDragOver
                      ? 'bg-amber-200 border-dashed border-amber-500 text-amber-600 scale-115 ring-4 ring-amber-400'
                      : 'bg-amber-100/90 border-dashed border-amber-400 text-amber-500 animate-pulse-glow scale-105'
                    : 'bg-white text-slate-800 border-emerald-300'
                }`}
              >
                {/* Traveling Gold Star Payoff */}
                {hasTravelingHero && (
                  <div className="absolute -top-12 flex items-center justify-center animate-bounce z-20">
                    <CountingObject type="star" size={55} />
                  </div>
                )}

                {isMissingSlot ? (isFilled ? formatNum(stoneNum) : questionMark) : formatNum(stoneNum)}
              </div>
            );
          })}
        </div>

        {/* Available Draggable Stone Numerals Below [2, 3, 5] */}
        {placedNumber === null && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-16" dir="ltr">
              {[2, 3, 5].map((num, idx) => {
                const colors: Array<'coral' | 'blue' | 'yellow'> = ['coral', 'blue', 'yellow'];
                const isWrong = wrongNumber === num;

                return (
                  <div
                    key={num}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, num)}
                    onClick={() => handleSelectAnswer(num)}
                    className="cursor-grab active:cursor-grabbing transform transition-transform hover:scale-115 active:scale-95"
                  >
                    <PlayfulNumeral
                      number={num}
                      size="xl"
                      color={colors[idx]}
                      isWrong={isWrong}
                      className="animate-pulse-glow select-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

