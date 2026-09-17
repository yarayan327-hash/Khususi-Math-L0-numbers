import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { CeramicPlate, LearningObject } from '../common/VisualAssets';
import { HeroNumeral } from '../common/NumberCard';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene8Props {
  onComplete: () => void;
}

export const Scene8DiscoverZero: React.FC<Scene8Props> = ({ onComplete }) => {
  const { t, speak } = useLanguage();
  // Starts with 3 dates on the plate.
  // Child taps each date to make it disappear: 3 -> 2 -> 1 -> empty!
  // Brief pause -> giant Hero 0 reveals!
  const [datesRemaining, setDatesRemaining] = useState<number>(3);
  const [zeroRevealed, setZeroRevealed] = useState<boolean>(false);

  const handleDateClick = () => {
    if (datesRemaining <= 0) return;

    sound.playZeroWhoosh();
    const nextRemaining = datesRemaining - 1;
    setDatesRemaining(nextRemaining);

    if (nextRemaining === 0) {
      setTimeout(() => {
        setZeroRevealed(true);
        sound.playCelebration();
        speak(t.scene8.successZero);
        confetti({
          particleCount: 65,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#26B7FF', '#FDE700', '#10B981'],
        });
        setTimeout(onComplete, 800);
      }, 700);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="snack_table" />

      <InstructionBar
        instruction={datesRemaining > 0 ? t.scene8.instruction : t.scene8.allGone}
      />

      <div className="relative flex-1 flex flex-col items-center justify-center gap-6 z-10 px-16">
        {/* Ceramic Plate resting directly on dining table */}
        <div className="filter drop-shadow-2xl flex flex-col items-center select-none">
          <CeramicPlate size={350}>
            {Array.from({ length: datesRemaining }).map((_, idx) => (
              <div
                key={idx}
                onClick={handleDateClick}
                className="cursor-pointer transition-all duration-300 hover:scale-130 active:scale-90 animate-pulse-glow p-2"
              >
                <LearningObject type="date" size={105} />
              </div>
            ))}
            {datesRemaining === 0 && (
              <span className="text-3xl font-extrabold text-slate-400 font-['Tajawal'] italic">
                ({t.scene8.empty})
              </span>
            )}
          </CeramicPlate>
        </div>

        {/* Hero Reveal of 0 */}
        {zeroRevealed && (
          <div className="flex flex-col items-center animate-bounce z-20">
            <HeroNumeral number={0} label={t.scene8.zeroLabel} size="hero" />
          </div>
        )}
      </div>
    </div>
  );
};

