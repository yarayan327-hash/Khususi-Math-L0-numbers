import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { PencilCase, CountingObject } from '../common/VisualAssets';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene8Props {
  onComplete: () => void;
}

export const Scene8PencilCup: React.FC<Scene8Props> = ({ onComplete }) => {
  const { t, formatNum, speak } = useLanguage();
  // Target: exactly 4 pencils into the pencil case
  const totalPencils = 4;
  const [casePencils, setCasePencils] = useState<number>(0);
  const [availablePencils, setAvailablePencils] = useState<number[]>([1, 2, 3, 4, 5]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [caseBouncing, setCaseBouncing] = useState<boolean>(false);

  const handlePlacePencil = (pencilId: number) => {
    if (casePencils >= totalPencils || isCompleted) return;

    const nextCount = casePencils + 1;
    sound.playCountNote(nextCount);
    speak(formatNum(nextCount));

    setAvailablePencils((prev) => prev.filter((id) => id !== pencilId));
    setCasePencils(nextCount);
    setCaseBouncing(true);
    setTimeout(() => setCaseBouncing(false), 350);

    if (nextCount === totalPencils) {
      setIsCompleted(true);
      setTimeout(() => {
        sound.playCelebration();
        speak(t.containers.pencilInstruction);
        confetti({
          particleCount: 65,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#26B7FF', '#FDE700', '#10B981'],
        });
        onComplete();
      }, 500);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="study_desk" />

      {/* Multilingual direct instruction */}
      <InstructionBar instruction={t.containers.pencilInstruction} />

      {/* Desk workspace interaction plane */}
      <div className="relative flex-1 flex items-center justify-around z-10 px-24">
        {/* Left Side: Pencils lying on desk surface */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 p-6 bg-white/40 backdrop-blur-xs rounded-4xl border-3 border-amber-300 shadow-xl max-w-md">
            {availablePencils.map((id) => (
              <div
                key={id}
                onClick={() => handlePlacePencil(id)}
                className="cursor-pointer transition-all duration-300 hover:scale-125 active:scale-90 p-2 filter drop-shadow-xl animate-float-slow select-none transform rotate-12"
                title="ضع القلم في المقلمة"
              >
                <CountingObject type="pencil" size={85} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Horizontal School Pencil Case */}
        <div className="flex flex-col items-center">
          <div
            className={`transition-transform duration-300 ${
              caseBouncing ? 'scale-115 animate-bounce' : isCompleted ? 'scale-110' : ''
            }`}
          >
            <PencilCase
              size={360}
              label={t.containers.pencilCaseLabel}
              count={casePencils}
            />
          </div>

          {/* Count badge: "في المقلمة: ١ / ٤" */}
          <div className="mt-4 bg-white/95 px-8 py-2 rounded-full border-3 border-amber-400 shadow-lg font-black text-2xl text-slate-800 font-['Tajawal']" dir="ltr">
            {t.containers.inPencilCase(formatNum(casePencils), formatNum(totalPencils))}
          </div>
        </div>
      </div>
    </div>
  );
};
