import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { LearningObject } from '../common/VisualAssets';
import { toEasternArabic } from '../../utils/arabic';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene7Props {
  onComplete: () => void;
}

export const Scene7CarParking: React.FC<Scene7Props> = ({ onComplete }) => {
  // Goal: Park 5 toy cars into the 5 marked parking bays
  const totalCars = 5;
  const [parkedCount, setParkedCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleParkNextCar = () => {
    if (parkedCount >= totalCars || isCompleted) return;

    const nextCount = parkedCount + 1;
    sound.playCountNote(nextCount);
    sound.speakArabic(toEasternArabic(nextCount));
    setParkedCount(nextCount);

    if (nextCount === totalCars) {
      setIsCompleted(true);
      setTimeout(() => {
        sound.playCelebration();
        sound.speakArabic('خمس سيارات في الموقف! أحسنت');
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
      <SceneBackground theme="parking_road" />

      {/* Direct, natural instruction */}
      <InstructionBar instruction="أَوْقِفِ السَّيَّارَات!" />

      <div className="relative flex-1 flex flex-col items-center justify-center gap-10 z-10 px-16">
        {/* Five Numbered Parking Bays on the Asphalt Track (LTR Mathematical Order) */}
        <div className="flex items-center justify-center gap-6 p-6 rounded-3xl bg-slate-900/50 backdrop-blur-xs border-4 border-yellow-400 shadow-2xl" dir="ltr">
          {Array.from({ length: totalCars }).map((_, idx) => {
            const isFilled = idx < parkedCount;

            return (
              <div
                key={idx}
                className={`w-36 h-48 rounded-2xl border-4 flex flex-col items-center justify-between p-3 select-none transition-all duration-300 ${
                  isFilled
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-xl scale-105'
                    : 'border-dashed border-yellow-400/70 bg-slate-800/60'
                }`}
              >
                {/* Bay number header */}
                <div className="w-8 h-8 rounded-full bg-yellow-400 text-slate-900 font-black text-xl flex items-center justify-center">
                  {toEasternArabic(idx + 1)}
                </div>

                {/* Car parked inside bay */}
                <div className="flex-1 flex items-center justify-center">
                  {isFilled ? (
                    <div className="animate-bounce">
                      <LearningObject type="car" size={90} />
                    </div>
                  ) : (
                    <span className="text-yellow-400/40 font-bold text-sm">مَوْقِف</span>
                  )}
                </div>

                {/* White stop line at front of bay */}
                <div className="w-full h-2 bg-white/80 rounded-xs" />
              </div>
            );
          })}
        </div>

        {/* Unparked Car Queue ready to be parked */}
        {!isCompleted ? (
          <div
            onClick={handleParkNextCar}
            className="cursor-pointer transition-all duration-300 hover:scale-115 active:scale-95 flex items-center gap-4 bg-white/90 px-10 py-3 rounded-full border-4 border-amber-400 shadow-2xl animate-pulse-glow"
            title="المس لتحريك السيارة إلى الموقف"
          >
            <LearningObject type="car" size={70} />
            <span className="text-2xl font-black text-slate-800 font-['Tajawal']">
              المس لإيقاف السيارة ({toEasternArabic(totalCars - parkedCount)} متبقية)
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-4 bg-emerald-500 text-white px-12 py-3 rounded-full shadow-2xl border-4 border-white animate-bounce">
            <span className="text-3xl font-extrabold font-['Tajawal']">اكتمل الموقف:</span>
            <span className="text-6xl font-black font-['Tajawal']">
              {toEasternArabic(totalCars)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
