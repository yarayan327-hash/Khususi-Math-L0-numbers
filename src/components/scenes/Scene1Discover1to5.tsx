import React, { useState, useEffect } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { HeroNumeral } from '../common/NumberCard';
import { CountingObject, CountingObjectType } from '../common/VisualAssets';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Scene1Props {
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
  onComplete: () => void;
}

interface StageConfig {
  number: number;
  type: CountingObjectType;
  colors?: string[];
}

const STAGES_CONFIG: StageConfig[] = [
  { number: 1, type: 'car', colors: ['blue'] },
  { number: 2, type: 'apple' },
  { number: 3, type: 'block', colors: ['yellow', 'blue', 'red'] },
  { number: 4, type: 'orange' },
  { number: 5, type: 'football' },
];

export const Scene1Discover1to5: React.FC<Scene1Props> = ({ stage, onComplete }) => {
  const { t, formatNum, numberWord, speak, isRTL } = useLanguage();
  const currentConfig = STAGES_CONFIG[Math.min(Math.max(stage, 0), STAGES_CONFIG.length - 1)];
  const currentNumber = currentConfig.number;

  const [countedIndices, setCountedIndices] = useState<number[]>([]);
  const [numeralRevealed, setNumeralRevealed] = useState<boolean>(false);
  const [numeralEmphasized, setNumeralEmphasized] = useState<boolean>(false);

  // Reset when stage changes
  useEffect(() => {
    setCountedIndices([]);
    setNumeralRevealed(false);
    setNumeralEmphasized(false);
  }, [stage]);

  const getStageInstruction = () => {
    switch (currentConfig.type) {
      case 'car':
        return t.scene1.instructionCar;
      case 'apple':
        return t.scene1.instructionApples;
      case 'block':
        return t.scene1.instructionBlocks;
      case 'orange':
        return t.scene1.instructionOranges;
      case 'football':
        return t.scene1.instructionFootballs;
      default:
        return t.scene1.touchToCount;
    }
  };

  const handleObjectClick = (idx: number) => {
    if (countedIndices.includes(idx)) return;

    const nextCount = countedIndices.length + 1;
    sound.playCountNote(nextCount);
    if (currentConfig.type === 'car') {
      sound.playCarHonk();
    }
    speak(formatNum(nextCount));
    const updated = [...countedIndices, idx];
    setCountedIndices(updated);

    // When all items for this stage are touched:
    if (updated.length === currentNumber) {
      setTimeout(() => {
        setNumeralRevealed(true);
        sound.playSuccess();
        speak(numberWord(currentNumber));
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#26B7FF', '#FDE700', '#10B981'],
        });
        if (stage === 4) {
          onComplete();
        }
      }, 400);
    }
  };

  const handleNumeralTouch = () => {
    setNumeralEmphasized(true);
    sound.playPop();
    speak(numberWord(currentNumber));
    setTimeout(() => setNumeralEmphasized(false), 600);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="courtyard" />

      {/* Short, purposeful instruction */}
      <InstructionBar
        instruction={
          numeralRevealed
            ? `${t.scene1.cardRevealPrefix} ${formatNum(currentNumber)}!`
            : getStageInstruction()
        }
      />

      {/* Main Expansive Learning Canvas */}
      <div className="relative flex-1 flex items-center justify-center px-12 z-10">
        <div className="w-full max-w-6xl flex items-center justify-around gap-8">
          
          {/* 1. QUANTITY AREA: Concrete Child-Friendly Learning Objects */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative p-8 rounded-4xl bg-white/75 backdrop-blur-xs border-4 border-amber-300 shadow-2xl flex items-center justify-center min-w-[360px] min-h-[270px]">
              <div className="flex items-center justify-center gap-6 flex-wrap max-w-md" dir="ltr">
                {Array.from({ length: currentNumber }).map((_, idx) => {
                  const isCounted = countedIndices.includes(idx);
                  const color = currentConfig.colors ? currentConfig.colors[idx % currentConfig.colors.length] : undefined;

                  return (
                    <div
                      key={idx}
                      onClick={() => handleObjectClick(idx)}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                      className={`relative cursor-pointer select-none transition-all duration-300 p-2 rounded-3xl animate-object-drop ${
                        isCounted
                          ? 'scale-115 filter drop-shadow-2xl'
                          : 'hover:scale-125 active:scale-95 animate-float-slow filter drop-shadow-lg'
                      }`}
                    >
                      <CountingObject
                        type={currentConfig.type}
                        size={currentNumber <= 2 ? 120 : currentNumber <= 3 ? 105 : 90}
                        color={color}
                      />

                      {/* Cheerful Count Badge on Touched Object */}
                      {isCounted && (
                        <div className="absolute -top-3 -right-3 w-13 h-13 rounded-full bg-gradient-to-tr from-[#26B7FF] to-[#0284C7] text-white font-black text-3xl font-['Tajawal'] flex items-center justify-center shadow-xl border-3 border-white animate-bounce">
                          {formatNum(countedIndices.indexOf(idx) + 1)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <span className="text-2xl font-bold text-slate-700 font-['Tajawal']" dir="ltr">
              {t.scene1.countedOf(formatNum(countedIndices.length), formatNum(currentNumber))}
            </span>
          </div>

          {/* 2. VISUAL ARROW TRANSFORMATION: (Quantity → Numeral) */}
          <div className="flex flex-col items-center justify-center">
            <div
              className={`transition-all duration-500 flex items-center justify-center ${
                numeralRevealed ? 'opacity-100 scale-110' : 'opacity-25 scale-90'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-lg border-2 border-white">
                {isRTL ? <ArrowLeft className="w-10 h-10" /> : <ArrowRight className="w-10 h-10" />}
              </div>
            </div>
          </div>

          {/* 3. HERO NUMERAL AREA: Prominently revealed */}
          <div className="flex flex-col items-center justify-center min-w-[340px] min-h-[260px]">
            {numeralRevealed ? (
              <div
                onClick={handleNumeralTouch}
                className={`cursor-pointer transition-transform duration-300 p-4 rounded-4xl select-none animate-bounce ${
                  numeralEmphasized ? 'scale-120' : 'hover:scale-110'
                }`}
              >
                <HeroNumeral
                  number={currentNumber}
                  label={numberWord(currentNumber)}
                  size="hero"
                />
              </div>
            ) : (
              <div className="w-60 h-60 rounded-4xl border-4 border-dashed border-amber-300/80 bg-white/40 flex flex-col items-center justify-center gap-3 p-6 text-center shadow-inner animate-pulse">
                <span className="text-6xl text-amber-400 font-black">؟</span>
                <span className="text-xl font-bold text-slate-600 font-['Tajawal']">
                  {t.scene1.touchToCount}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
