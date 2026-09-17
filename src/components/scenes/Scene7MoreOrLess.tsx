import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { CeramicPlate, LearningObject } from '../common/VisualAssets';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene7Props {
  onComplete: () => void;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export const Scene7MoreOrLess: React.FC<Scene7Props> = ({ onComplete, stage, setStage }) => {
  // Stage 0: "أيهما أكثر؟" 2 apples vs 5 apples -> correct: Right (5)
  // Stage 1: "أيهما أقل؟" 6 dates vs 3 dates -> correct: Right (3)
  // Stage 2: "متساويان" 4 oranges vs 4 oranges -> tap "متساويان"

  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);
  const [isWrongSide, setIsWrongSide] = useState<'left' | 'right' | null>(null);
  const [equalAnswered, setEqualAnswered] = useState<boolean>(false);

  const handleSideClick = (side: 'left' | 'right') => {
    if (stage === 0) {
      if (side === 'right') {
        setSelectedSide('right');
        setIsWrongSide(null);
        sound.playSuccess();
        sound.speakArabic('أكثر! ممتاز');
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.55 },
          colors: ['#26B7FF', '#FDE700', '#10B981'],
        });
      } else {
        setIsWrongSide('left');
        sound.playSoftBounce();
        setTimeout(() => setIsWrongSide(null), 500);
      }
    } else if (stage === 1) {
      if (side === 'right') {
        setSelectedSide('right');
        setIsWrongSide(null);
        sound.playSuccess();
        sound.speakArabic('أقل! ممتاز');
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.55 },
          colors: ['#26B7FF', '#FDE700', '#10B981'],
        });
      } else {
        setIsWrongSide('left');
        sound.playSoftBounce();
        setTimeout(() => setIsWrongSide(null), 500);
      }
    }
  };

  const handleEqualClick = () => {
    setEqualAnswered(true);
    sound.playCelebration();
    sound.speakArabic('متساويان! أحسنت');
    confetti({ particleCount: 65, spread: 85, origin: { y: 0.55 } });
    setTimeout(onComplete, 800);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="snack_table" />

      <InstructionBar
        instruction={stage === 0 ? 'أيهما أكثر؟' : stage === 1 ? 'أيهما أقل؟' : 'متساويان؟'}
      />

      {stage === 0 && (
        <div className="relative flex-1 flex items-center justify-center gap-28 z-10 px-16">
          {/* Left Plate: 2 apples resting directly on the wooden dining table */}
          <div
            onClick={() => handleSideClick('left')}
            className={`cursor-pointer transition-all duration-300 flex flex-col items-center select-none ${
              selectedSide === 'left'
                ? 'scale-110 filter drop-shadow-2xl'
                : isWrongSide === 'left'
                ? 'animate-soft-shake opacity-70'
                : 'hover:scale-108 active:scale-95 filter drop-shadow-xl animate-float-slow'
            }`}
          >
            <CeramicPlate size={310}>
              <LearningObject type="apple" size={82} />
              <LearningObject type="apple" size={82} />
            </CeramicPlate>
          </div>

          {/* Right Plate: 5 apples (MORE - CORRECT) */}
          <div
            onClick={() => handleSideClick('right')}
            className={`cursor-pointer transition-all duration-300 flex flex-col items-center select-none ${
              selectedSide === 'right'
                ? 'scale-115 filter drop-shadow-2xl animate-bounce'
                : isWrongSide === 'right'
                ? 'animate-soft-shake opacity-70'
                : 'hover:scale-108 active:scale-95 filter drop-shadow-xl animate-float-slow'
            }`}
          >
            <CeramicPlate size={310}>
              {Array.from({ length: 5 }).map((_, i) => (
                <LearningObject key={i} type="apple" size={70} />
              ))}
            </CeramicPlate>
            {selectedSide === 'right' && (
              <div className="mt-4 bg-emerald-500 text-white font-black text-3xl font-['Tajawal'] px-8 py-1.5 rounded-full shadow-xl border-2 border-white">
                أَكْثَر ✓
              </div>
            )}
          </div>
        </div>
      )}

      {stage === 1 && (
        <div className="relative flex-1 flex items-center justify-center gap-28 z-10 px-16">
          {/* Left Plate: 6 dates */}
          <div
            onClick={() => handleSideClick('left')}
            className={`cursor-pointer transition-all duration-300 flex flex-col items-center select-none ${
              selectedSide === 'left'
                ? 'scale-110 filter drop-shadow-2xl'
                : isWrongSide === 'left'
                ? 'animate-soft-shake opacity-70'
                : 'hover:scale-108 active:scale-95 filter drop-shadow-xl animate-float-slow'
            }`}
          >
            <CeramicPlate size={310}>
              {Array.from({ length: 6 }).map((_, i) => (
                <LearningObject key={i} type="date" size={62} />
              ))}
            </CeramicPlate>
          </div>

          {/* Right Plate: 3 dates (LESS - CORRECT) */}
          <div
            onClick={() => handleSideClick('right')}
            className={`cursor-pointer transition-all duration-300 flex flex-col items-center select-none ${
              selectedSide === 'right'
                ? 'scale-115 filter drop-shadow-2xl animate-bounce'
                : isWrongSide === 'right'
                ? 'animate-soft-shake opacity-70'
                : 'hover:scale-108 active:scale-95 filter drop-shadow-xl animate-float-slow'
            }`}
          >
            <CeramicPlate size={310}>
              {Array.from({ length: 3 }).map((_, i) => (
                <LearningObject key={i} type="date" size={76} />
              ))}
            </CeramicPlate>
            {selectedSide === 'right' && (
              <div className="mt-4 bg-emerald-500 text-white font-black text-3xl font-['Tajawal'] px-8 py-1.5 rounded-full shadow-xl border-2 border-white">
                أَقَلّ ✓
              </div>
            )}
          </div>
        </div>
      )}

      {stage === 2 && (
        <div className="relative flex-1 flex flex-col items-center justify-center gap-10 z-10 px-16">
          <div className="flex items-center justify-center gap-28">
            {/* Left Plate: 4 oranges */}
            <div className="filter drop-shadow-2xl">
              <CeramicPlate size={310}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <LearningObject key={i} type="orange" size={72} />
                ))}
              </CeramicPlate>
            </div>

            {/* Right Plate: 4 oranges */}
            <div className="filter drop-shadow-2xl">
              <CeramicPlate size={310}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <LearningObject key={i} type="orange" size={72} />
                ))}
              </CeramicPlate>
            </div>
          </div>

          {/* Equal Button with high tactile affordance */}
          <button
            onClick={handleEqualClick}
            className={`h-22 px-20 rounded-full font-black text-4xl font-['Tajawal'] transition-all shadow-2xl cursor-pointer border-4 ${
              equalAnswered
                ? 'bg-emerald-500 text-white border-white scale-110 animate-bounce'
                : 'bg-gradient-to-r from-[#26B7FF] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white border-amber-300 animate-pulse-glow hover:scale-108 active:scale-95'
            }`}
          >
            مُتَسَاوِيَان! ✓
          </button>
        </div>
      )}
    </div>
  );
};
