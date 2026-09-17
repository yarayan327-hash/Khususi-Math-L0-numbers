import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { PlayfulNumeral } from '../common/NumberCard';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene2Props {
  onComplete: () => void;
}

export const Scene2FastRecognition: React.FC<Scene2Props> = ({ onComplete }) => {
  const { t, formatNum, numberWord, speak } = useLanguage();
  // Fast recognition check: Touch 1 -> 2 -> 3 -> 4 -> 5 in sequential order
  const [expectedNumber, setExpectedNumber] = useState<number>(1);
  const [tappedNumbers, setTappedNumbers] = useState<number[]>([]);
  const [wrongNumber, setWrongNumber] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const colors: Array<'blue' | 'yellow' | 'green' | 'coral' | 'amber'> = [
    'blue',
    'yellow',
    'green',
    'coral',
    'amber',
  ];

  const handleNumeralClick = (num: number) => {
    if (isCompleted) return;

    if (num === expectedNumber) {
      sound.playCountNote(num);
      speak(numberWord(num));
      const updated = [...tappedNumbers, num];
      setTappedNumbers(updated);
      setWrongNumber(null);

      if (num === 5) {
        setIsCompleted(true);
        setTimeout(() => {
          sound.playCelebration();
          speak(t.scene2.successOrder);
          confetti({
            particleCount: 65,
            spread: 80,
            origin: { y: 0.55 },
            colors: ['#26B7FF', '#FDE700', '#10B981', '#F43F5E'],
          });
          onComplete();
        }, 500);
      } else {
        setExpectedNumber(num + 1);
      }
    } else if (!tappedNumbers.includes(num)) {
      setWrongNumber(num);
      sound.playSoftBounce();
      speak(`${t.scene2.tapNumber} ${formatNum(expectedNumber)}`);
      setTimeout(() => setWrongNumber(null), 500);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="courtyard" />

      {/* Short, clear instruction */}
      <InstructionBar instruction={t.scene2.instruction} />

      {/* Spacious Central Canvas */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-12 z-10 px-16">
        
        {/* Helper prompt showing expected number */}
        <div className="bg-white/85 backdrop-blur-xs px-8 py-2 rounded-full border-2 border-amber-300 shadow-sm text-slate-700 font-extrabold text-2xl font-['Tajawal'] animate-pulse">
          {t.scene2.tapNumber}{' '}
          <span className="text-3xl text-[#0284C7] font-black">{formatNum(expectedNumber)}</span>
        </div>

        {/* Floating 3D Numerals 1 2 3 4 5 in LTR Mathematical Order */}
        <div className="flex items-center justify-center gap-14 flex-wrap z-20" dir="ltr">
          {[1, 2, 3, 4, 5].map((num, idx) => {
            const isTapped = tappedNumbers.includes(num);
            const isTarget = num === expectedNumber;
            const isWrong = wrongNumber === num;

            return (
              <div
                key={num}
                className={`transform transition-all duration-300 ${
                  isTarget ? 'scale-115 animate-pulse-glow' : 'hover:scale-110'
                }`}
              >
                <PlayfulNumeral
                  number={num}
                  size="xl"
                  color={colors[idx % colors.length]}
                  isSelected={isTapped}
                  isCorrect={isTapped}
                  isWrong={isWrong}
                  onClick={() => handleNumeralClick(num)}
                  className={isTapped ? 'animate-bounce shadow-2xl' : ''}
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

