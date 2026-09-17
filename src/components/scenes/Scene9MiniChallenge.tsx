import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { PlayfulNumeral, TactileCard } from '../common/NumberCard';
import { CeramicPlate, LearningObject } from '../common/VisualAssets';
import { toEasternArabic } from '../../utils/arabic';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene9Props {
  onComplete: () => void;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export const Scene9MiniChallenge: React.FC<Scene9Props> = ({ onComplete, stage, setStage }) => {
  // 5 rapid-fire challenges:
  // 0: Find 7 from [3, 7, 9] (Floating 3D numerals)
  // 1: Count 5 oranges (tap to count)
  // 2: Match 4 (4 cars, pick from 3D numerals 2, 4, 6)
  // 3: Complete 1 2 ? 4 (pick 3 from 1, 3, 5)
  // 4: Choose which has more (3 balls vs 6 balls)

  const [countedIndices, setCountedIndices] = useState<number[]>([]);
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  const [wrongChoice, setWrongChoice] = useState<number | null>(null);

  const handleChoice = (picked: number, target: number, isLastStage = false) => {
    if (picked === target) {
      setSelectedNum(picked);
      setWrongChoice(null);
      sound.playSuccess();
      sound.speakArabic(`ممتاز! ${toEasternArabic(picked)}`);
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.55 },
        colors: ['#26B7FF', '#FDE700', '#10B981'],
      });

      if (isLastStage) {
        setTimeout(onComplete, 800);
      }
    } else {
      setWrongChoice(picked);
      sound.playSoftBounce();
      setTimeout(() => setWrongChoice(null), 500);
    }
  };

  const handleCountTap = (idx: number) => {
    if (!countedIndices.includes(idx)) {
      const nextCount = countedIndices.length + 1;
      sound.playCountNote(nextCount);
      sound.speakArabic(toEasternArabic(nextCount));
      const updated = [...countedIndices, idx];
      setCountedIndices(updated);

      if (updated.length === 5) {
        sound.playSuccess();
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="playroom" />

      {/* Challenge 1: Find 7 from floating 3D numerals (No white cards!) */}
      {stage === 0 && (
        <>
          <InstructionBar instruction="أين ٧؟" />
          <div className="relative flex-1 flex items-center justify-center gap-24 z-10" dir="ltr">
            {[3, 7, 9].map((num, idx) => {
              const colors: Array<'coral' | 'green' | 'blue'> = ['coral', 'green', 'blue'];
              return (
                <div key={num} className="transform transition-transform duration-300">
                  <PlayfulNumeral
                    number={num}
                    size="xl"
                    color={colors[idx]}
                    isCorrect={selectedNum === num}
                    isWrong={wrongChoice === num}
                    onClick={() => handleChoice(num, 7)}
                    className={selectedNum === num ? 'animate-bounce' : 'animate-pulse-glow'}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Challenge 2: Count 5 oranges */}
      {stage === 1 && (
        <>
          <InstructionBar instruction="عُدّ البرتقال!" />
          <div className="relative flex-1 flex flex-col items-center justify-center gap-8 z-10">
            <div className="flex items-center justify-center gap-8 px-8 py-4 z-20">
              {Array.from({ length: 5 }).map((_, idx) => {
                const isCounted = countedIndices.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => handleCountTap(idx)}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    className={`relative cursor-pointer select-none transition-all duration-300 p-2 animate-object-drop ${
                      isCounted
                        ? 'scale-110 filter drop-shadow-2xl'
                        : 'hover:scale-120 active:scale-95 animate-float-slow filter drop-shadow-xl'
                    }`}
                  >
                    <LearningObject type="orange" size={125} />
                    {isCounted && (
                      <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-tr from-[#26B7FF] to-[#0284C7] text-white font-black text-3xl font-['Tajawal'] flex items-center justify-center shadow-xl border-3 border-white animate-bounce">
                        {toEasternArabic(countedIndices.indexOf(idx) + 1)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {countedIndices.length === 5 && (
              <div className="bg-emerald-500 text-white font-black text-4xl font-['Tajawal'] px-10 py-2.5 rounded-full shadow-2xl border-2 border-white animate-bounce">
                خَمْسَة! أحسنت ✓
              </div>
            )}
          </div>
        </>
      )}

      {/* Challenge 3: Match 4 cars with 3D numerals */}
      {stage === 2 && (
        <>
          <InstructionBar instruction="كم سيارة؟" />
          <div className="relative flex-1 flex flex-col items-center justify-center gap-10 z-10">
            <div className="flex items-center justify-center gap-8 filter drop-shadow-2xl">
              {Array.from({ length: 4 }).map((_, idx) => (
                <LearningObject key={idx} type="car" size={115} />
              ))}
            </div>
            <div className="flex items-center justify-center gap-24" dir="ltr">
              {[2, 4, 6].map((num, idx) => {
                const colors: Array<'coral' | 'blue' | 'yellow'> = ['coral', 'blue', 'yellow'];
                return (
                  <div key={num} className="transform transition-transform duration-300">
                    <PlayfulNumeral
                      number={num}
                      size="xl"
                      color={colors[idx]}
                      isCorrect={selectedNum === num}
                      isWrong={wrongChoice === num}
                      onClick={() => handleChoice(num, 4)}
                      className={selectedNum === num ? 'animate-bounce' : 'animate-pulse-glow'}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Challenge 4: Complete sequence 1 2 ? 4 */}
      {stage === 3 && (
        <>
          <InstructionBar instruction="ما الرقم الناقص؟" />
          <div className="relative flex-1 flex flex-col items-center justify-center gap-12 z-10">
            {/* Shelf */}
            <div className="flex items-center justify-center gap-6 p-6 rounded-3xl bg-amber-950/20 backdrop-blur-xs border-b-8 border-[#B45309] shadow-2xl" dir="ltr">
              <TactileCard number={1} size="md" />
              <TactileCard number={2} size="md" />
              <div
                className={`w-32 h-44 rounded-3xl border-4 flex items-center justify-center font-black text-7xl font-['Tajawal'] select-none transition-all ${
                  selectedNum === 3
                    ? 'border-emerald-500 bg-gradient-to-b from-emerald-100 to-emerald-200 text-emerald-700 scale-110 shadow-2xl animate-bounce'
                    : 'border-dashed border-sky-400 bg-sky-100/70 text-sky-500 animate-pulse-glow'
                }`}
              >
                {selectedNum === 3 ? toEasternArabic(3) : '؟'}
              </div>
              <TactileCard number={4} size="md" />
            </div>

            {selectedNum !== 3 && (
              <div className="flex items-center justify-center gap-20" dir="ltr">
                {[1, 3, 5].map((num, idx) => {
                  const colors: Array<'blue' | 'yellow' | 'coral'> = ['blue', 'yellow', 'coral'];
                  return (
                    <div key={num} className="transform transition-transform duration-300">
                      <PlayfulNumeral
                        number={num}
                        size="xl"
                        color={colors[idx]}
                        isWrong={wrongChoice === num}
                        onClick={() => handleChoice(num, 3)}
                        className="animate-pulse-glow"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Challenge 5: Which has more? (3 vs 6) */}
      {stage === 4 && (
        <>
          <InstructionBar instruction="أيهما أكثر؟" />
          <div className="relative flex-1 flex items-center justify-center gap-28 z-10">
            {/* Left: 3 balls */}
            <div
              onClick={() => {
                setWrongChoice(1);
                sound.playSoftBounce();
                setTimeout(() => setWrongChoice(null), 500);
              }}
              className={`cursor-pointer transition-all duration-300 select-none ${
                wrongChoice === 1 ? 'animate-soft-shake opacity-70' : 'hover:scale-108 active:scale-95 filter drop-shadow-xl animate-float-slow'
              }`}
            >
              <CeramicPlate size={300}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <LearningObject key={i} type="football" size={72} />
                ))}
              </CeramicPlate>
            </div>

            {/* Right: 6 balls (MORE - CORRECT) */}
            <div
              onClick={() => handleChoice(6, 6, true)}
              className="cursor-pointer transition-all duration-300 select-none hover:scale-108 active:scale-95 filter drop-shadow-2xl animate-float-slow"
            >
              <CeramicPlate size={300}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <LearningObject key={i} type="football" size={62} />
                ))}
              </CeramicPlate>
              {selectedNum === 6 && (
                <div className="mt-3 bg-emerald-500 text-white font-black text-3xl font-['Tajawal'] px-8 py-1.5 rounded-full shadow-xl border-2 border-white animate-bounce text-center">
                  أَكْثَر ✓
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
