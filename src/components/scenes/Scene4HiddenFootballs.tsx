import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { LearningObject } from '../common/VisualAssets';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene4Props {
  onComplete: () => void;
}

interface HiddenBall {
  id: number;
  bottom: string;
  left: string;
  size: number;
  rotation: number;
}

export const Scene4HiddenFootballs: React.FC<Scene4Props> = ({ onComplete }) => {
  const { t, formatNum, speak } = useLanguage();
  // 5 footballs naturally integrated into the playground environment:
  const balls: HiddenBall[] = [
    { id: 1, bottom: '215px', left: '160px', size: 74, rotation: -12 },
    { id: 2, bottom: '225px', left: '840px', size: 72, rotation: 18 },
    { id: 3, bottom: '65px', left: '260px', size: 78, rotation: 8 },
    { id: 4, bottom: '115px', left: '490px', size: 82, rotation: -24 },
    { id: 5, bottom: '145px', left: '710px', size: 76, rotation: 14 },
  ];

  const [foundIds, setFoundIds] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const totalBalls = 5;

  const handleBallClick = (ballId: number) => {
    if (foundIds.includes(ballId) || isCompleted) return;

    const nextCount = foundIds.length + 1;
    sound.playCountNote(nextCount);
    speak(formatNum(nextCount));
    const updated = [...foundIds, ballId];
    setFoundIds(updated);

    if (updated.length === totalBalls) {
      setIsCompleted(true);
      setTimeout(() => {
        sound.playCelebration();
        speak(t.scene4.successFound);
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
      <SceneBackground theme="playground" />

      {/* Short, direct instruction */}
      <InstructionBar instruction={t.scene4.instruction} />

      {/* Playground Area with naturally integrated balls */}
      <div className="relative flex-1 w-full h-full z-10 select-none">
        
        {/* The 5 Naturally Embedded Footballs */}
        {balls.map((ball) => {
          const isFound = foundIds.includes(ball.id);
          const foundOrder = foundIds.indexOf(ball.id) + 1;

          return (
            <div
              key={ball.id}
              onClick={() => handleBallClick(ball.id)}
              style={{
                bottom: ball.bottom,
                left: ball.left,
                transform: `rotate(${ball.rotation}deg)`,
              }}
              className={`absolute cursor-pointer transition-all duration-300 ${
                isFound
                  ? 'scale-115 filter drop-shadow-2xl z-30'
                  : 'hover:scale-120 active:scale-95 filter drop-shadow-md z-20 opacity-90 hover:opacity-100'
              }`}
            >
              <LearningObject type="football" size={ball.size} />

              {/* Cheerful Number Badge on the found ball */}
              {isFound && (
                <div className="absolute -top-3 -right-3 w-13 h-13 rounded-full bg-gradient-to-tr from-[#26B7FF] to-[#0284C7] text-white font-black text-3xl font-['Tajawal'] flex items-center justify-center shadow-xl border-3 border-white animate-bounce">
                  {formatNum(foundOrder)}
                </div>
              )}
            </div>
          );
        })}

        {/* Floating Minimal Progress Tracker */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/95 px-8 py-2.5 rounded-full border-3 border-emerald-400 shadow-xl z-40">
          <span className="text-2xl font-bold text-slate-700 font-['Tajawal']">{t.scene4.ballsFound}:</span>
          <div className="flex items-center gap-2.5" dir="ltr">
            {Array.from({ length: totalBalls }).map((_, i) => {
              const isFilled = i < foundIds.length;
              return (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-lg transition-all duration-300 ${
                    isFilled
                      ? 'bg-emerald-500 text-white shadow-md scale-110'
                      : 'bg-slate-200 border-2 border-dashed border-slate-300 text-transparent'
                  }`}
                >
                  {isFilled ? formatNum(i + 1) : ''}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

