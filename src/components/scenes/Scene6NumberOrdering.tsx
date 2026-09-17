import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { PlayfulNumeral, TactileCard } from '../common/NumberCard';
import { toEasternArabic } from '../../utils/arabic';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene6Props {
  onComplete: () => void;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export const Scene6NumberOrdering: React.FC<Scene6Props> = ({ onComplete, stage, setStage }) => {
  // Stage 0: 1, 2, ?, 4, 5 (missing 3) -> pick from floating numerals [2, 3, 5]
  // Stage 1: 6, ?, 8, 9, 10 (missing 7) -> pick from floating numerals [5, 7, 8]
  // Stage 2: Scrambled blocks [1, 3, 2] -> arrange in order (1 -> 2 -> 3)

  const [placedNumber, setPlacedNumber] = useState<number | null>(null);
  const [wrongCandidate, setWrongCandidate] = useState<number | null>(null);

  // Stage 2 state
  const [arrangedSequence, setArrangedSequence] = useState<number[]>([]);
  const [scrambledCandidates, setScrambledCandidates] = useState<number[]>([1, 3, 2]);

  const handleSlotChoice = (num: number, targetNum: number) => {
    if (num === targetNum) {
      setPlacedNumber(num);
      setWrongCandidate(null);
      sound.playSuccess();
      sound.speakArabic(`ثلاثة! ممتاز`);
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.5 },
        colors: ['#26B7FF', '#FDE700', '#10B981'],
      });
    } else {
      setWrongCandidate(num);
      sound.playSoftBounce();
      setTimeout(() => setWrongCandidate(null), 500);
    }
  };

  const handleScrambledTap = (num: number) => {
    const expectedNext = arrangedSequence.length + 1; // 1, then 2, then 3
    if (num === expectedNext) {
      sound.playCountNote(expectedNext);
      sound.speakArabic(toEasternArabic(num));
      const nextArranged = [...arrangedSequence, num];
      setArrangedSequence(nextArranged);
      setScrambledCandidates((prev) => prev.filter((n) => n !== num));

      if (nextArranged.length === 3) {
        sound.playCelebration();
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.55 } });
        setTimeout(onComplete, 800);
      }
    } else {
      sound.playSoftBounce();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="playroom" />

      <InstructionBar instruction="رتّب!" />

      {stage === 0 && (
        <div className="relative flex-1 flex flex-col items-center justify-center gap-14 z-10 px-16">
          {/* Sequence Shelf with dedicated LTR mathematical direction */}
          <div className="flex items-center justify-center gap-6 p-6 rounded-3xl bg-amber-950/20 backdrop-blur-xs border-b-8 border-[#B45309] shadow-2xl" dir="ltr">
            <TactileCard number={1} size="md" />
            <TactileCard number={2} size="md" />

            {/* Missing Slot */}
            <div
              className={`w-32 h-44 rounded-3xl border-4 flex items-center justify-center font-black text-7xl font-['Tajawal'] select-none transition-all ${
                placedNumber === 3
                  ? 'border-emerald-500 bg-gradient-to-b from-emerald-100 to-emerald-200 text-emerald-700 scale-110 shadow-2xl animate-bounce'
                  : 'border-dashed border-sky-400 bg-sky-100/70 text-sky-500 animate-pulse-glow'
              }`}
            >
              {placedNumber === 3 ? toEasternArabic(3) : '؟'}
            </div>

            <TactileCard number={4} size="md" />
            <TactileCard number={5} size="md" />
          </div>

          {/* Floating 3D Numerals (No white cards!) */}
          {placedNumber !== 3 && (
            <div className="flex items-center justify-center gap-20" dir="ltr">
              {[2, 3, 5].map((num, idx) => {
                const colors: Array<'coral' | 'blue' | 'yellow'> = ['coral', 'blue', 'yellow'];
                return (
                  <div key={num} className="transform transition-transform duration-300">
                    <PlayfulNumeral
                      number={num}
                      size="xl"
                      color={colors[idx]}
                      isWrong={wrongCandidate === num}
                      onClick={() => handleSlotChoice(num, 3)}
                      className="animate-pulse-glow"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {stage === 1 && (
        <div className="relative flex-1 flex flex-col items-center justify-center gap-14 z-10 px-16">
          {/* Sequence Shelf: 6, ?, 8, 9, 10 */}
          <div className="flex items-center justify-center gap-6 p-6 rounded-3xl bg-amber-950/20 backdrop-blur-xs border-b-8 border-[#B45309] shadow-2xl" dir="ltr">
            <TactileCard number={6} size="md" />

            {/* Missing Slot */}
            <div
              className={`w-32 h-44 rounded-3xl border-4 flex items-center justify-center font-black text-7xl font-['Tajawal'] select-none transition-all ${
                placedNumber === 7
                  ? 'border-emerald-500 bg-gradient-to-b from-emerald-100 to-emerald-200 text-emerald-700 scale-110 shadow-2xl animate-bounce'
                  : 'border-dashed border-sky-400 bg-sky-100/70 text-sky-500 animate-pulse-glow'
              }`}
            >
              {placedNumber === 7 ? toEasternArabic(7) : '؟'}
            </div>

            <TactileCard number={8} size="md" />
            <TactileCard number={9} size="md" />
            <TactileCard number={10} size="md" />
          </div>

          {/* Floating 3D Numerals */}
          {placedNumber !== 7 && (
            <div className="flex items-center justify-center gap-20" dir="ltr">
              {[5, 7, 8].map((num, idx) => {
                const colors: Array<'coral' | 'green' | 'amber'> = ['coral', 'green', 'amber'];
                return (
                  <div key={num} className="transform transition-transform duration-300">
                    <PlayfulNumeral
                      number={num}
                      size="xl"
                      color={colors[idx]}
                      isWrong={wrongCandidate === num}
                      onClick={() => handleSlotChoice(num, 7)}
                      className="animate-pulse-glow"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {stage === 2 && (
        <div className="relative flex-1 flex flex-col items-center justify-center gap-14 z-10 px-16">
          {/* Target Sequence Shelf */}
          <div className="flex items-center justify-center gap-8 p-6 rounded-3xl bg-amber-950/20 backdrop-blur-xs border-b-8 border-[#B45309] shadow-2xl" dir="ltr">
            {[1, 2, 3].map((slotIndex) => {
              const filledNum = arrangedSequence[slotIndex - 1];
              return (
                <div
                  key={slotIndex}
                  className={`w-36 h-48 rounded-3xl border-4 flex items-center justify-center font-black text-7xl font-['Tajawal'] select-none transition-all ${
                    filledNum
                      ? 'border-emerald-500 bg-gradient-to-b from-emerald-100 to-emerald-200 text-emerald-700 scale-105 shadow-xl animate-bounce'
                      : 'border-dashed border-amber-300/80 bg-white/40 text-amber-900/40'
                  }`}
                >
                  {filledNum ? toEasternArabic(filledNum) : slotIndex}
                </div>
              );
            })}
          </div>

          {/* Scrambled 3D Playful Numerals below to tap in order: 1 -> 2 -> 3 */}
          <div className="flex items-center justify-center gap-16" dir="ltr">
            {scrambledCandidates.map((num, idx) => {
              const colors: Array<'blue' | 'yellow' | 'green'> = ['blue', 'yellow', 'green'];
              return (
                <div key={num} className="transform transition-transform duration-300">
                  <PlayfulNumeral
                    number={num}
                    size="xl"
                    color={colors[idx % colors.length]}
                    onClick={() => handleScrambledTap(num)}
                    className="animate-pulse-glow"
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
