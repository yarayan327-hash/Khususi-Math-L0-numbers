import React, { useState, useEffect } from 'react';
import { LearningObject } from './VisualAssets';
import { toEasternArabic } from '../../utils/arabic';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface CountingItem {
  id: number;
  countedOrder: number | null;
  delayIndex: number;
}

interface InteractiveCountingAreaProps {
  quantity: number;
  objectType: 'date' | 'orange' | 'apple' | 'block' | 'football' | 'car' | 'pencil' | 'book';
  onCompleted?: () => void;
  itemSize?: number;
  containerClassName?: string;
  stagedDrop?: boolean;
}

export const InteractiveCountingArea: React.FC<InteractiveCountingAreaProps> = ({
  quantity,
  objectType,
  onCompleted,
  itemSize = 120,
  containerClassName = '',
  stagedDrop = true,
}) => {
  const [items, setItems] = useState<CountingItem[]>([]);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Initialize items with staggered entrance delays
  useEffect(() => {
    setItems(
      Array.from({ length: quantity }, (_, i) => ({
        id: i + 1,
        countedOrder: null,
        delayIndex: i,
      }))
    );
    setCurrentCount(0);
    setIsFinished(false);
  }, [quantity]);

  const handleItemTap = (itemId: number) => {
    const item = items.find((it) => it.id === itemId);
    if (!item || item.countedOrder !== null || isFinished) return;

    const nextCount = currentCount + 1;
    sound.playCountNote(nextCount);
    sound.speakArabic(toEasternArabic(nextCount));

    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, countedOrder: nextCount } : it))
    );
    setCurrentCount(nextCount);

    if (nextCount === quantity) {
      setIsFinished(true);
      setTimeout(() => {
        sound.playSuccess();
        confetti({
          particleCount: 55,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#26B7FF', '#FDE700', '#10B981'],
        });
        if (onCompleted) onCompleted();
      }, 500);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${containerClassName}`}>
      {/* Objects Playground Area */}
      <div className="flex flex-wrap items-center justify-center gap-10 max-w-5xl px-8 py-4">
        {items.map((item) => {
          const isCounted = item.countedOrder !== null;
          return (
            <div
              key={item.id}
              onClick={() => handleItemTap(item.id)}
              style={{
                animationDelay: stagedDrop ? `${item.delayIndex * 0.12}s` : '0s',
              }}
              className={`relative cursor-pointer transition-all duration-300 p-2 rounded-3xl flex items-center justify-center select-none ${
                stagedDrop ? 'animate-object-drop' : ''
              } ${
                isCounted
                  ? 'scale-110'
                  : 'hover:scale-120 active:scale-95 filter drop-shadow-xl hover:drop-shadow-2xl'
              }`}
            >
              {/* Educational 3D Object */}
              <div className={`transition-transform duration-300 ${isCounted ? 'scale-105' : 'animate-float-slow'}`}>
                <LearningObject type={objectType} size={itemSize} />
              </div>

              {/* Glowing Number Badge on Counted Item */}
              {isCounted && (
                <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-tr from-[#26B7FF] via-[#0284C7] to-[#0369A1] text-white font-black text-3xl font-['Tajawal'] flex items-center justify-center shadow-xl border-3 border-white animate-bounce">
                  {toEasternArabic(item.countedOrder!)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hero Total Number Badge - Prominent and Celebratory */}
      {isFinished && (
        <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white px-10 py-3 rounded-full shadow-2xl border-4 border-amber-300 animate-bounce">
          <span className="text-3xl font-extrabold font-['Tajawal']">المجموع:</span>
          <span className="text-7xl font-black font-['Tajawal'] drop-shadow-md">
            {toEasternArabic(quantity)}
          </span>
        </div>
      )}
    </div>
  );
};
