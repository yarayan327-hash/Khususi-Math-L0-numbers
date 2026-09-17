import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { PlayfulNumeral } from '../common/NumberCard';
import { WickerBasket, LearningObject } from '../common/VisualAssets';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene9Props {
  onComplete: () => void;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export const Scene9BasketMatching: React.FC<Scene9Props> = ({ onComplete, stage, setStage }) => {
  // Stage 0: Target Numeral ٤ -> match with basket with 4 oranges
  // Stage 1: Basket with 6 dates -> pick matching numeral ٦ from [٤, ٦, ٨]

  const [matchedBasketIndex, setMatchedBasketIndex] = useState<number | null>(null);
  const [wrongBasketIndex, setWrongBasketIndex] = useState<number | null>(null);

  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [wrongNumeral, setWrongNumeral] = useState<number | null>(null);

  const handleBasketClick = (basketIdx: number, quantity: number) => {
    if (quantity === 4) {
      setMatchedBasketIndex(basketIdx);
      setWrongBasketIndex(null);
      sound.playSuccess();
      sound.speakArabic('أربعة! ممتاز');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#26B7FF', '#FDE700', '#10B981'],
      });
    } else {
      setWrongBasketIndex(basketIdx);
      sound.playSoftBounce();
      setTimeout(() => setWrongBasketIndex(null), 600);
    }
  };

  const handleNumeralChoice = (choice: number) => {
    if (choice === 6) {
      setSelectedNumeral(6);
      setWrongNumeral(null);
      sound.playCelebration();
      sound.speakArabic('ستة! أحسنت');
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      setTimeout(onComplete, 800);
    } else {
      setWrongNumeral(choice);
      sound.playSoftBounce();
      setTimeout(() => setWrongNumeral(null), 500);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="fruit_shop" />

      <InstructionBar instruction="طابق!" />

      {stage === 0 ? (
        /* Stage 0: 3D Playful Numeral ٤ -> tap basket with 4 oranges */
        <div className="relative flex-1 flex flex-col items-center justify-center gap-10 z-10 px-16">
          <div className="flex flex-col items-center animate-bounce">
            <PlayfulNumeral number={4} size="xl" color="blue" isSelected={true} />
          </div>

          {/* 3 Baskets resting on shop counter with 2, 4, 6 oranges */}
          <div className="flex items-end justify-center gap-20">
            {[
              { qty: 2, label: 'سلة أ' },
              { qty: 4, label: 'سلة ب' },
              { qty: 6, label: 'سلة ج' },
            ].map((basket, idx) => {
              const isMatched = matchedBasketIndex === idx;
              const isWrong = wrongBasketIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => handleBasketClick(idx, basket.qty)}
                  className={`cursor-pointer p-4 rounded-3xl transition-all duration-300 flex flex-col items-center select-none ${
                    isMatched
                      ? 'scale-115 filter drop-shadow-2xl animate-bounce'
                      : isWrong
                      ? 'animate-soft-shake opacity-80'
                      : 'hover:scale-110 active:scale-95 filter drop-shadow-xl animate-float-slow'
                  }`}
                >
                  <WickerBasket size={260}>
                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-[240px]">
                      {Array.from({ length: basket.qty }).map((_, i) => (
                        <div key={i} className={isMatched ? 'animate-bounce' : ''}>
                          <LearningObject type="orange" size={68} />
                        </div>
                      ))}
                    </div>
                  </WickerBasket>

                  {isMatched && (
                    <div className="mt-3 bg-emerald-500 text-white font-black text-3xl font-['Tajawal'] px-7 py-1.5 rounded-full shadow-xl border-2 border-white">
                      ٤ ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Stage 1: Basket with 6 dates -> pick matching 3D numeral from [٤, ٦, ٨] */
        <div className="relative flex-1 flex flex-col items-center justify-center gap-10 z-10 px-16">
          <div className="filter drop-shadow-2xl">
            <WickerBasket size={300}>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-[260px]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={selectedNumeral === 6 ? 'animate-bounce' : ''}>
                    <LearningObject type="date" size={74} />
                  </div>
                ))}
              </div>
            </WickerBasket>
          </div>

          <div className="flex items-center justify-center gap-24" dir="ltr">
            {[4, 6, 8].map((num, idx) => {
              const colors: Array<'amber' | 'green' | 'coral'> = ['amber', 'green', 'coral'];
              return (
                <div key={num} className="transform transition-transform duration-300">
                  <PlayfulNumeral
                    number={num}
                    size="xl"
                    color={colors[idx]}
                    isCorrect={selectedNumeral === num}
                    isWrong={wrongNumeral === num}
                    onClick={() => handleNumeralChoice(num)}
                    className={selectedNumeral === num ? 'animate-bounce' : 'animate-pulse-glow'}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
