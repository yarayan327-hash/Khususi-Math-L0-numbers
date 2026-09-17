import React, { useState, useEffect } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { PlayfulNumeral, HeroNumeral } from '../common/NumberCard';
import { LearningObject } from '../common/VisualAssets';
import { toEasternArabic } from '../../utils/arabic';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene1Props {
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
  onComplete: () => void;
}

export const Scene1Welcome: React.FC<Scene1Props> = ({ stage, setStage, onComplete }) => {
  // Staged Introduction of 1 to 5:
  // Stage 0: 1 date -> count ١ -> Hero ١ appears -> touch ١
  // Stage 1: 2 apples -> count ١, ٢ -> Hero ٢ appears -> touch ٢
  // Stage 2: 3 blocks -> count ١, ٢, ٣ -> Hero ٣ appears -> touch ٣
  // Stage 3: 4 oranges -> count ١, ٢, ٣, ٤ -> Hero ٤ appears -> touch ٤
  // Stage 4: 5 footballs -> count ١, ٢, ٣, ٤, ٥ -> Hero ٥ appears -> touch ٥
  // Stage 5: Fast recognition check with all five numbers: ١, ٢, ٣, ٤, ٥

  const stageData = [
    { num: 1, type: 'date' as const, label: 'وَاحِد' },
    { num: 2, type: 'apple' as const, label: 'اثْنَان' },
    { num: 3, type: 'block' as const, label: 'ثَلَاثَة' },
    { num: 4, type: 'orange' as const, label: 'أَرْبَعَة' },
    { num: 5, type: 'football' as const, label: 'خَمْسَة' },
  ];

  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [numeralTouched, setNumeralTouched] = useState<boolean>(false);
  const [recognizedNumbers, setRecognizedNumbers] = useState<number[]>([]);

  useEffect(() => {
    setTappedIndices([]);
    setNumeralTouched(false);
    setRecognizedNumbers([]);
  }, [stage]);

  const currentData = stage < 5 ? stageData[stage] : null;

  // Concrete object tap
  const handleObjectTap = (idx: number) => {
    if (!tappedIndices.includes(idx)) {
      const nextCount = tappedIndices.length + 1;
      sound.playCountNote(nextCount);
      sound.speakArabic(toEasternArabic(nextCount));
      const updated = [...tappedIndices, idx];
      setTappedIndices(updated);

      if (currentData && updated.length === currentData.num) {
        setTimeout(() => {
          sound.playSuccess();
        }, 300);
      }
    }
  };

  // Touching the target Hero numeral
  const handleHeroNumeralTouch = () => {
    if (numeralTouched) return;
    setNumeralTouched(true);
    sound.playSuccess();
    sound.speakArabic(currentData!.label);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#26B7FF', '#FDE700', '#10B981'],
    });

    // Advance to next stage or complete
    setTimeout(() => {
      if (stage < 4) {
        setStage((prev) => prev + 1);
      } else if (stage === 4) {
        setStage(5);
      }
    }, 900);
  };

  // Stage 5: Fast recognition
  const handleRecognize = (num: number) => {
    if (!recognizedNumbers.includes(num)) {
      const updated = [...recognizedNumbers, num];
      setRecognizedNumbers(updated);
      sound.playCountNote(num);
      sound.speakArabic(toEasternArabic(num));

      if (updated.length === 5) {
        sound.playCelebration();
        confetti({ particleCount: 65, spread: 80, origin: { y: 0.55 } });
        onComplete();
      }
    }
  };

  const colors: Array<'blue' | 'yellow' | 'green' | 'coral' | 'amber'> = [
    'blue',
    'yellow',
    'green',
    'coral',
    'amber',
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="courtyard" />

      {stage < 5 ? (
        <>
          <InstructionBar
            instruction={tappedIndices.length === currentData!.num ? 'المس الرقم!' : 'عُدّ!'}
          />

          {/* Guaranteed Clear Exclusion Zone around Learning Target */}
          <div className="relative flex-1 flex flex-col items-center justify-center gap-10 px-16 z-10">
            {/* 1. Large Unobstructed Hero Numeral (No plants, no characters, no overlap) */}
            <div className="h-44 flex items-center justify-center">
              {tappedIndices.length === currentData!.num ? (
                <div
                  onClick={handleHeroNumeralTouch}
                  className={`cursor-pointer transition-transform duration-300 p-3 rounded-4xl select-none ${
                    numeralTouched ? 'animate-bounce scale-110' : 'animate-pulse-glow hover:scale-115'
                  }`}
                  title="المس الرقم"
                >
                  <HeroNumeral
                    number={currentData!.num}
                    label={currentData!.label}
                    size="xl"
                  />
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-xs px-8 py-3 rounded-full border-2 border-amber-300 shadow-sm text-slate-600 font-bold text-2xl animate-pulse">
                  المس كل عنصر
                </div>
              )}
            </div>

            {/* 2. Concrete Educational Objects on Courtyard Table */}
            <div className="flex items-center justify-center gap-10 flex-wrap max-w-4xl z-20">
              {Array.from({ length: currentData!.num }).map((_, idx) => {
                const isTapped = tappedIndices.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => handleObjectTap(idx)}
                    style={{ animationDelay: `${idx * 0.12}s` }}
                    className={`relative cursor-pointer select-none transition-all duration-300 p-3 rounded-3xl animate-object-drop ${
                      isTapped
                        ? 'scale-110 filter drop-shadow-2xl'
                        : 'hover:scale-120 active:scale-95 animate-float-slow filter drop-shadow-lg'
                    }`}
                  >
                    <LearningObject type={currentData!.type} size={135} />

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
        /* Stage 5: Fast Recognition Check across 1 to 5 (Direct floating 3D numerals) */
        <>
          <InstructionBar instruction="المس الأرقام!" />

          <div className="relative flex-1 flex items-center justify-center gap-16 px-16 z-10" dir="ltr">
            {[1, 2, 3, 4, 5].map((num, idx) => {
              const isChecked = recognizedNumbers.includes(num);
              return (
                <div key={num} className="transform transition-transform duration-300">
                  <PlayfulNumeral
                    number={num}
                    size="xl"
                    color={colors[idx % colors.length]}
                    isSelected={isChecked}
                    isCorrect={isChecked}
                    onClick={() => handleRecognize(num)}
                    className={isChecked ? 'animate-bounce' : 'animate-pulse-glow'}
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
