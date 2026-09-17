import React, { useState, useEffect } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { PlayfulNumeral, HeroNumeral } from '../common/NumberCard';
import { LearningObject } from '../common/VisualAssets';
import { toEasternArabic } from '../../utils/arabic';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene2Props {
  onComplete: () => void;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export const Scene2Meet1to5: React.FC<Scene2Props> = ({ onComplete, stage, setStage }) => {
  // Stages 0 to 4: Concrete Quantity -> Counting -> Hero Numeral
  // Stage 0: 1 date
  // Stage 1: 2 apples
  // Stage 2: 3 blocks
  // Stage 3: 4 oranges
  // Stage 4: 5 footballs
  // Stage 5: Playful recognition challenge: "أين ٣؟"

  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [isHeroRevealed, setIsHeroRevealed] = useState<boolean>(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizWrong, setQuizWrong] = useState<number | null>(null);

  const stageData = [
    { num: 1, type: 'date' as const, label: 'وَاحِد' },
    { num: 2, type: 'apple' as const, label: 'اثْنَان' },
    { num: 3, type: 'block' as const, label: 'ثَلَاثَة' },
    { num: 4, type: 'orange' as const, label: 'أَرْبَعَة' },
    { num: 5, type: 'football' as const, label: 'خَمْسَة' },
  ];

  // Reset count whenever stage changes
  useEffect(() => {
    setTappedIndices([]);
    setIsHeroRevealed(false);
    setSelectedQuizAnswer(null);
    setQuizWrong(null);
  }, [stage]);

  const currentNumData = stage < 5 ? stageData[stage] : null;

  const handleItemTap = (idx: number) => {
    if (!tappedIndices.includes(idx)) {
      const nextCount = tappedIndices.length + 1;
      sound.playCountNote(nextCount);
      sound.speakArabic(toEasternArabic(nextCount));
      const updated = [...tappedIndices, idx];
      setTappedIndices(updated);

      if (currentNumData && updated.length === currentNumData.num) {
        setTimeout(() => {
          setIsHeroRevealed(true);
          sound.playSuccess();
          sound.speakArabic(currentNumData.label);
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.5 },
            colors: ['#26B7FF', '#FDE700', '#10B981'],
          });
        }, 300);
      }
    }
  };

  const handleQuizSelection = (choice: number) => {
    if (choice === 3) {
      setSelectedQuizAnswer(3);
      setQuizWrong(null);
      sound.playCelebration();
      sound.speakArabic('ممتاز! ثلاثة');
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.55 } });
      setTimeout(onComplete, 800);
    } else {
      setQuizWrong(choice);
      sound.playSoftBounce();
      setTimeout(() => setQuizWrong(null), 500);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme={stage === 5 ? 'playroom' : 'courtyard'} />

      {stage < 5 ? (
        <>
          <InstructionBar instruction="عُدّ!" />

          <div className="relative flex-1 flex flex-col items-center justify-center gap-10 px-16 z-10">
            {/* Top Area: Hero Numeral reveals once fully counted! */}
            <div className="h-44 flex items-center justify-center">
              {isHeroRevealed ? (
                <div className="animate-bounce">
                  <HeroNumeral
                    number={currentNumData!.num}
                    label={currentNumData!.label}
                    size="xl"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-xs px-8 py-3 rounded-full border-2 border-amber-200 text-slate-600 font-bold text-2xl animate-pulse">
                  <span>المس العناصر بالترتيب</span>
                </div>
              )}
            </div>

            {/* Educational Concrete Objects on Courtyard Table */}
            <div className="flex items-center justify-center gap-10 flex-wrap max-w-4xl z-20">
              {Array.from({ length: currentNumData!.num }).map((_, idx) => {
                const isTapped = tappedIndices.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => handleItemTap(idx)}
                    style={{ animationDelay: `${idx * 0.15}s` }}
                    className={`relative cursor-pointer select-none transition-all duration-300 p-3 rounded-3xl animate-object-drop ${
                      isTapped
                        ? 'scale-110 filter drop-shadow-2xl'
                        : 'hover:scale-125 active:scale-95 animate-float-slow filter drop-shadow-lg'
                    }`}
                  >
                    <LearningObject type={currentNumData!.type} size={135} />

                    {/* Sequential Eastern Arabic badge on tap */}
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
        </>
      ) : (
        /* Stage 5: Playful recognition challenge "أين ٣؟" using floating 3D PlayfulNumerals (No white cards!) */
        <>
          <InstructionBar instruction="أين ٣؟" />

          <div className="relative flex-1 flex items-center justify-center gap-24 z-10" dir="ltr">
            {[2, 3, 5].map((num, idx) => {
              const colors: Array<'blue' | 'yellow' | 'coral'> = ['coral', 'blue', 'yellow'];
              return (
                <div key={num} className="transform transition-transform duration-300">
                  <PlayfulNumeral
                    number={num}
                    size="xl"
                    color={colors[idx]}
                    isCorrect={selectedQuizAnswer === num}
                    isWrong={quizWrong === num}
                    onClick={() => handleQuizSelection(num)}
                    className={selectedQuizAnswer === num ? 'animate-bounce' : 'animate-pulse-glow'}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
