import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { PlayfulNumeral } from '../common/NumberCard';
import { CountingObject } from '../common/VisualAssets';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene6Props {
  onComplete: () => void;
}

export const Scene6MatchingChallenge: React.FC<Scene6Props> = ({ onComplete }) => {
  const { t, formatNum, speak } = useLanguage();
  // Goal: Count the 3 small toy cars parked in a row, then select matching numeral 3 from [2, 3, 5]
  const targetQuantity = 3;
  const carColors: Array<'blue' | 'red' | 'yellow'> = ['blue', 'red', 'yellow'];
  const [countedCars, setCountedCars] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);

  const handleCarClick = (idx: number) => {
    if (selectedAnswer !== null) return;

    sound.playCarHonk();
    if (!countedCars.includes(idx)) {
      const nextCount = countedCars.length + 1;
      sound.playCountNote(nextCount);
      speak(formatNum(nextCount));
      setCountedCars((prev) => [...prev, idx]);
    }
  };

  const handleSelectChoice = (choice: number) => {
    if (selectedAnswer !== null) return;

    if (choice === targetQuantity) {
      setSelectedAnswer(choice);
      setWrongAnswer(null);
      sound.playCarHonk();
      sound.playCelebration();
      speak(t.scene6.successCars);
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#26B7FF', '#FDE700', '#F43F5E', '#10B981'],
      });
      setTimeout(onComplete, 1200);
    } else {
      setWrongAnswer(choice);
      sound.playSoftBounce();
      setTimeout(() => setWrongAnswer(null), 500);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="parking_road" />

      {/* Direct, natural instruction */}
      <InstructionBar instruction={t.scene6.instruction} />

      <div className="relative flex-1 flex flex-col items-center justify-center gap-10 z-10 px-16">
        
        {/* Row of 3 parked toy cars on driveway / road bay */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-6 px-12 rounded-3xl bg-slate-900/60 backdrop-blur-xs border-4 border-yellow-400 shadow-2xl flex items-center justify-center gap-10" dir="ltr">
            {carColors.map((color, idx) => {
              const isCounted = countedCars.includes(idx);
              const orderIndex = countedCars.indexOf(idx) + 1;

              return (
                <div
                  key={idx}
                  onClick={() => handleCarClick(idx)}
                  className={`relative cursor-pointer select-none transition-all duration-300 p-2 rounded-2xl ${
                    selectedAnswer === targetQuantity
                      ? 'animate-bounce scale-110'
                      : isCounted
                      ? 'scale-105 filter drop-shadow-2xl'
                      : 'hover:scale-115 active:scale-95 filter drop-shadow-xl animate-float-slow'
                  }`}
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <CountingObject type="car" size={115} color={color} />

                  {/* Count badge on counted car */}
                  {isCounted && (
                    <div className="absolute -top-3 -right-2 w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 text-slate-900 font-black text-2xl font-['Tajawal'] flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                      {formatNum(orderIndex)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-xl font-bold text-slate-800 bg-white/80 px-6 py-1.5 rounded-full border-2 border-amber-300 shadow-md font-['Tajawal']">
            {countedCars.length > 0
              ? t.scene6.carsCounted(formatNum(countedCars.length))
              : t.scene6.touchCarsPrompt}
          </div>
        </div>

        {/* Choice Numerals [ 2 , 3 , 5 ] */}
        <div className="flex items-center justify-center gap-16" dir="ltr">
          {[2, 3, 5].map((num, idx) => {
            const colors: Array<'amber' | 'blue' | 'coral'> = ['amber', 'blue', 'coral'];
            const isCorrect = selectedAnswer === num;
            const isWrong = wrongAnswer === num;

            return (
              <div key={num} className="transform transition-transform hover:scale-115 active:scale-95">
                <PlayfulNumeral
                  number={num}
                  size="xl"
                  color={colors[idx]}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                  onClick={() => handleSelectChoice(num)}
                  className={isCorrect ? 'animate-bounce' : 'animate-pulse-glow'}
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};


