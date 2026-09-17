import React, { useEffect, useState } from 'react';
import { Check, Volume2 } from 'lucide-react';
import { SceneBackground } from '../common/SceneBackground';
import { AppleItem, FootballItem, ToyCarItem, OrangeFruit } from '../common/VisualAssets';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import { BONUS_CHALLENGE } from '../../utils/bonusChallenge';

type BonusObject = 'apple' | 'football' | 'car' | 'orange';

interface BonusChallengeSceneProps {
  scene: 15 | 16 | 17 | 18;
  onComplete: () => void;
}

const CONFIG: Record<number, { object: BonusObject; a: number; b?: number; mode: 'count' | 'more' | 'less'; choices?: number[] }> = {
  15: { object: 'apple', a: 12, mode: 'count', choices: [10, 11, 12] },
  16: { object: 'football', a: 15, mode: 'count', choices: [13, 14, 15] },
  17: { object: 'car', a: 12, b: 14, mode: 'more' },
  18: { object: 'orange', a: 13, b: 16, mode: 'less' },
};

const BonusObjectItem: React.FC<{ type: BonusObject; index: number; compact?: boolean }> = ({ type, index, compact }) => {
  const size = compact ? 66 : 82;
  if (type === 'apple') return <AppleItem size={size} />;
  if (type === 'football') return <FootballItem size={size} />;
  if (type === 'orange') return <OrangeFruit size={size} />;
  const colors = ['blue', 'red', 'yellow', 'green'] as const;
  return <ToyCarItem size={compact ? 74 : 90} color={colors[index % colors.length]} />;
};

const StructuredGroup: React.FC<{
  count: number;
  type: BonusObject;
  columns: number;
  label: string;
  selectable?: boolean;
  state?: 'idle' | 'correct' | 'wrong';
  onClick?: () => void;
  compact?: boolean;
}> = ({ count, type, columns, label, selectable, state = 'idle', onClick, compact }) => (
  <button
    aria-label={label}
    disabled={!selectable}
    onClick={onClick}
    className={`relative bg-white/94 rounded-3xl border-3 shadow-xl px-7 py-5 flex items-center justify-center transition-all ${
      selectable ? 'cursor-pointer hover:-translate-y-1 hover:shadow-2xl active:scale-[0.99]' : 'cursor-default'
    } ${state === 'correct' ? 'border-emerald-500 ring-4 ring-emerald-200' : state === 'wrong' ? 'border-rose-400 animate-soft-shake' : 'border-sky-200'}`}
  >
    <div
      className="grid place-items-center"
      dir="ltr"
      style={{ gridTemplateColumns: `repeat(${columns}, ${compact ? 76 : 96}px)`, gap: compact ? '8px 6px' : '10px 12px' }}
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={`${compact ? 'w-[76px] h-[67px]' : 'w-24 h-20'} flex items-center justify-center`}>
          <BonusObjectItem type={type} index={index} compact={compact} />
        </div>
      ))}
    </div>
    {state === 'correct' && (
      <span className="absolute top-3 right-3 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
        <Check className="w-6 h-6" strokeWidth={4} />
      </span>
    )}
  </button>
);

const MathExpression: React.FC<{ left: string; operator: string; right: string }> = ({ left, operator, right }) => (
  <div
    dir="ltr"
    style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
    className="flex flex-row items-center gap-3 text-5xl font-black text-slate-800 font-['Tajawal']"
  >
    <span dir="ltr">{left}</span>
    <span dir="ltr" aria-hidden="true">{operator}</span>
    <span dir="ltr">{right}</span>
  </div>
);

export const BonusChallengeScene: React.FC<BonusChallengeSceneProps> = ({ scene, onComplete }) => {
  const { language, formatNum, speak } = useLanguage();
  const copy = BONUS_CHALLENGE[language];
  const text = copy.scenes[scene - 15];
  const config = CONFIG[scene];
  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setSelected(null);
    setWrong(null);
    setCompleted(false);
  }, [scene]);

  const answer = (choice: string, isCorrect: boolean) => {
    if (completed) return;
    if (isCorrect) {
      setSelected(choice);
      setWrong(null);
      setCompleted(true);
      sound.playSuccess();
      speak(text.correct);
      onComplete();
      return;
    }
    setWrong(choice);
    sound.playSoftBounce();
    speak(text.incorrect);
    window.setTimeout(() => setWrong(null), 550);
  };

  const comparison = config.mode === 'more'
    ? { left: config.b!, operator: '>', right: config.a }
    : { left: config.a, operator: '<', right: config.b! };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      <SceneBackground theme="courtyard" />

      <div className="relative z-20 flex flex-col items-center pt-3 gap-1.5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-extrabold text-amber-900 bg-amber-200/95 border border-amber-400 rounded-full px-4 py-1">{copy.label}</span>
          <span className="text-sm font-semibold text-slate-600 bg-white/85 rounded-full px-4 py-1">{copy.labelSubtitle}</span>
        </div>
        <div className="inline-flex items-center gap-3 bg-white/95 px-7 py-2 rounded-full shadow-lg border-2 border-amber-300">
          <h2 className="text-3xl font-black text-slate-800 font-['Tajawal']">{text.instruction}</h2>
          <button onClick={() => { sound.playPop(); speak(text.instruction); }} className="w-9 h-9 rounded-full bg-sky-100 text-[#0284C7] flex items-center justify-center cursor-pointer" aria-label={text.instruction}>
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-4 px-12 pb-2">
        {config.mode === 'count' && (
          <>
            <StructuredGroup count={config.a} type={config.object} columns={scene === 15 ? 6 : 5} label={text.instruction} />
            <div className="flex gap-7" dir="ltr">
              {config.choices!.map((value) => (
                <button
                  key={value}
                  onClick={() => answer(String(value), value === config.a)}
                  className={`relative w-28 h-20 rounded-2xl border-3 text-4xl font-black shadow-lg cursor-pointer transition-all ${
                    selected === String(value) ? 'bg-emerald-500 text-white border-emerald-300' : wrong === String(value) ? 'bg-rose-100 text-rose-700 border-rose-400 animate-soft-shake' : 'bg-white text-sky-700 border-sky-300 hover:-translate-y-1'
                  }`}
                >
                  {formatNum(value)}
                  {selected === String(value) && <Check className="absolute top-1.5 right-1.5 w-5 h-5" strokeWidth={4} />}
                </button>
              ))}
            </div>
            {completed && <div className="flex items-center gap-4 bg-white/95 border-2 border-emerald-300 rounded-2xl px-8 py-2 shadow-md text-emerald-700"><Check className="w-7 h-7" strokeWidth={4} /><span className="text-4xl font-black">{text.reveal}</span></div>}
          </>
        )}

        {config.mode !== 'count' && (
          <>
            <div className="flex items-center justify-center gap-8" dir="ltr">
              <StructuredGroup
                count={config.a} type={config.object} columns={config.a === 12 ? 6 : 5}
                label={copy.leftGroup} selectable compact
                onClick={() => answer('a', config.mode === 'less')}
                state={selected === 'a' ? 'correct' : wrong === 'a' ? 'wrong' : 'idle'}
              />
              <StructuredGroup
                count={config.b!} type={config.object} columns={config.b === 14 ? 7 : 4}
                label={copy.rightGroup} selectable compact
                onClick={() => answer('b', config.mode === 'more')}
                state={selected === 'b' ? 'correct' : wrong === 'b' ? 'wrong' : 'idle'}
              />
            </div>
            {completed && (
              <div className="flex items-center gap-8 bg-white/95 border-2 border-emerald-300 rounded-3xl px-9 py-2.5 shadow-lg">
                <MathExpression left={formatNum(comparison.left)} operator={comparison.operator} right={formatNum(comparison.right)} />
                <span className="text-2xl font-extrabold text-emerald-700">{text.reveal}</span>
                {text.followUp && <span className="border-s-2 border-slate-200 ps-7 text-xl font-bold text-slate-700">{text.followUp} <strong className="text-sky-700">{text.followUpAnswer}</strong></span>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
