import React, { useState } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { WickerBasket, LearningObject } from '../common/VisualAssets';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene3Props {
  onComplete: () => void;
}

export const Scene3BasketDrag: React.FC<Scene3Props> = ({ onComplete }) => {
  const { t, formatNum, speak } = useLanguage();
  // Goal: Drag exactly 4 oranges into the wicker basket
  const targetQuantity = 4;
  const [basketCount, setBasketCount] = useState<number>(0);
  const [availableOranges, setAvailableOranges] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [basketReacting, setBasketReacting] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Transfer an orange into the basket
  const putOrangeInBasket = (orangeId: number) => {
    // If target already reached, lock out further additions
    if (basketCount >= targetQuantity || isCompleted) return;

    const nextCount = basketCount + 1;
    sound.playCountNote(nextCount);
    speak(formatNum(nextCount));

    setAvailableOranges((prev) => prev.filter((id) => id !== orangeId));
    setBasketCount(nextCount);
    setBasketReacting(true);
    setTimeout(() => setBasketReacting(false), 400);

    if (nextCount === targetQuantity) {
      setIsCompleted(true);
      setTimeout(() => {
        sound.playCelebration();
        speak(t.scene3.successBasket);
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#26B7FF', '#FDE700', '#10B981'],
        });
        onComplete();
      }, 600);
    }
  };

  // HTML5 Drag Handlers
  const handleDragStart = (e: React.DragEvent, orangeId: number) => {
    if (basketCount >= targetQuantity || isCompleted) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', orangeId.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (basketCount < targetQuantity && !isCompleted) {
      e.preventDefault();
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const orangeIdStr = e.dataTransfer.getData('text/plain');
    if (orangeIdStr) {
      const orangeId = parseInt(orangeIdStr, 10);
      if (availableOranges.includes(orangeId)) {
        putOrangeInBasket(orangeId);
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="fruit_shop" />

      {/* Short, direct student instruction */}
      <InstructionBar instruction={t.scene3.instruction} />

      {/* Fruit shop counter workspace */}
      <div className="relative flex-1 flex items-center justify-around z-10 px-24">
        
        {/* Drop Zone: Wicker Basket on Left Counter */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="flex flex-col items-center select-none"
        >
          <div
            className={`transition-transform duration-300 filter drop-shadow-2xl ${
              basketReacting
                ? 'scale-115 animate-bounce'
                : isDragOver
                ? 'scale-110 ring-8 ring-amber-400/60 rounded-full'
                : isCompleted
                ? 'scale-110'
                : 'hover:scale-105'
            }`}
          >
            <WickerBasket size={340}>
              {/* Oranges resting inside the basket */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-[280px]">
                {Array.from({ length: basketCount }).map((_, i) => (
                  <div key={i} className="animate-bounce">
                    <LearningObject type="orange" size={72} />
                  </div>
                ))}
              </div>
            </WickerBasket>
          </div>

          {/* Explicit Counter: 0 / 4 -> 4 / 4 */}
          <div className="mt-5 flex items-center gap-3 bg-white/95 px-8 py-2.5 rounded-full border-3 border-amber-400 shadow-xl">
            <span className="text-2xl font-bold text-slate-700 font-['Tajawal']">{t.scene3.inBasket}:</span>
            <span className="text-4xl font-black text-amber-600 font-['Tajawal']" dir="ltr">
              {formatNum(basketCount)} / {formatNum(targetQuantity)}
            </span>
          </div>
        </div>

        {/* Source Zone: Available Fresh Oranges to drag */}
        <div className="flex flex-col items-center select-none">
          <div className="grid grid-cols-3 gap-6 p-6 bg-white/40 backdrop-blur-xs rounded-4xl border-3 border-amber-300 shadow-xl">
            {availableOranges.map((id) => {
              const isLocked = basketCount >= targetQuantity || isCompleted;
              return (
                <div
                  key={id}
                  draggable={!isLocked}
                  onDragStart={(e) => handleDragStart(e, id)}
                  onClick={() => !isLocked && putOrangeInBasket(id)}
                  className={`p-2 transition-all duration-300 filter drop-shadow-xl animate-float-slow ${
                    isLocked
                      ? 'opacity-40 cursor-not-allowed'
                      : 'cursor-grab active:cursor-grabbing hover:scale-120 active:scale-95'
                  }`}
                >
                  <LearningObject type="orange" size={90} />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

