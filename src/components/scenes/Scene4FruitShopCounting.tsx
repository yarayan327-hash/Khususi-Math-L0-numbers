import React from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { InteractiveCountingArea } from '../common/InteractiveCountingArea';

interface Scene4Props {
  onComplete: () => void;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export const Scene4FruitShopCounting: React.FC<Scene4Props> = ({ onComplete, stage, setStage }) => {
  // 4 rounds of progressive difficulty in the modern neighborhood fruit shop:
  // Round 0: 3 dates
  // Round 1: 5 oranges
  // Round 2: 7 apples
  // Round 3: 10 dates

  const rounds = [
    { quantity: 3, type: 'date' as const, size: 140 },
    { quantity: 5, type: 'orange' as const, size: 130 },
    { quantity: 7, type: 'apple' as const, size: 115 },
    { quantity: 10, type: 'date' as const, size: 100 },
  ];

  const currentRound = rounds[Math.min(stage, rounds.length - 1)];

  const handleRoundComplete = () => {
    if (stage >= rounds.length - 1) {
      onComplete();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="fruit_shop" />

      {/* Clean, student-facing question */}
      <InstructionBar instruction="كم عددها؟" />

      {/* Fruit shop counter interaction plane */}
      <div className="relative flex-1 flex flex-col items-center justify-center z-10 px-12">
        <InteractiveCountingArea
          key={`counting-round-${stage}`}
          quantity={currentRound.quantity}
          objectType={currentRound.type}
          itemSize={currentRound.size}
          stagedDrop={true}
          onCompleted={handleRoundComplete}
        />
      </div>
    </div>
  );
};
