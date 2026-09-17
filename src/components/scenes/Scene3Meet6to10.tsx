import React, { useState, useEffect } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { PlayfulNumeral, HeroNumeral } from '../common/NumberCard';
import { LearningObject } from '../common/VisualAssets';
import { toEasternArabic } from '../../utils/arabic';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene3Props {
  onComplete: () => void;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export const Scene3Meet6to10: React.FC<Scene3Props> = ({ onComplete, stage, setStage }) => {
  // Stages:
  // 0: 6 pencils
  // 1: 7 dates
  // 2: 8 blocks
  // 3: 9 cars
  // 4: 10 books
  // 5: Recognition Challenge: "أين ٧؟"

  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [isHeroRevealed, setIsHeroRevealed] = useState<boolean>(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizWrong, setQuizWrong] = useState<number | null>(null);

  const stageData = [
    { num: 6, type: 'pencil' as const, label: 'سِتَّة' },
    { num: 7, type: 'date' as const, label: 'سَبْعَة' },
    { num: 8, type: 'block' as const, label: 'ثَمَانِيَة' },
    { num: 9, type: 'car' as const, label: 'تِسْعَة' },
    { num: 10, type: 'apple' as const, label: 'عَشَرَة' },
  ];

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
            particleCount: 50,
            spread: 70,
            origin: { y: 0.5 },
            colors: ['#26B7FF', '#FDE700', '#10B981'],
          });
        }, 300);
      }
    }
  };

  const handleQuizSelection = (choice: number) => {
    if (choice === 7) {
      setSelectedQuizAnswer(7);
      setQuizWrong(null);
      sound.playCelebration();
      sound.speakArabic('أحسنت! سبعة');
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
      <SceneBackground theme="playroom" />

      {stage < 5 ? (
        <>
          <InstructionBar instruction="عُدّ!" />

          <div className="relative flex-1 flex flex-col items-center justify-center gap-8 px-16 z-10">
            {/* Hero Numeral reveal */}
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

            {/* Objects in Children's Play Area */}
            <div className="flex items-center justify-center gap-6 flex-wrap max-w-5xl z-20">
              {Array.from({ length: currentNumData!.num }).map((_, idx) => {
                const isTapped = tappedIndices.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => handleItemTap(idx)}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    className={`relative cursor-pointer select-none transition-all duration-300 p-2.5 rounded-3xl animate-object-drop ${
                      isTapped
                        ? 'scale-110 filter drop-shadow-2xl'
                        : 'hover:scale-120 active:scale-95 animate-float-slow filter drop-shadow-lg'
                    }`}
                  >
                    <LearningObject
                      type={currentNumData!.type}
                      size={currentNumData!.num >= 9 ? 95 : 110}
                    />
                    {isTapped && (
                      <div className="absolute -top-3 -right-3 w-13 h-13 rounded-full bg-gradient-to-tr from-[#26B7FF] to-[#0284C7] text-white font-black text-2xl font-['Tajawal'] flex items-center justify-center shadow-xl border-2 border-white animate-bounce">
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
        /* Stage 5: "أين ٧؟" using 3D floating numerals without cards */
        <>
          <InstructionBar instruction="أين ٧؟" />

          <div className="relative flex-1 flex items-center justify-center gap-24 z-10" dir="ltr">
            {[4, 7, 9].map((num, idx) => {
              const colors: Array<'amber' | 'green' | 'blue'> = ['amber', 'green', 'blue'];
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
