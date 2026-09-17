import React, { useEffect, useState } from 'react';
import { Check, Volume2 } from 'lucide-react';
import { SceneBackground } from '../common/SceneBackground';
import { AppleItem, FootballItem, ToyBlock, ToyCarItem } from '../common/VisualAssets';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import { OPTIONAL_PRACTICE } from '../../utils/optionalPractice';

type PracticeKind = 'count' | 'more' | 'less' | 'equal' | 'mixed';
type ObjectKind = 'apple' | 'football' | 'block' | 'car';

interface OptionalPracticeSceneProps {
  scene: 10 | 11 | 12 | 13 | 14;
  stage?: number;
  onComplete: () => void;
}

const CONFIG: Record<number, { kind: PracticeKind; object: ObjectKind; a: number; b?: number }> = {
  10: { kind: 'count', object: 'apple', a: 7 },
  11: { kind: 'more', object: 'apple', a: 7, b: 4 },
  12: { kind: 'less', object: 'football', a: 3, b: 6 },
  13: { kind: 'equal', object: 'block', a: 5, b: 5 },
  14: { kind: 'mixed', object: 'car', a: 8, b: 6 },
};

const MathExpression: React.FC<{ left: string; operator: string; right: string }> = ({ left, operator, right }) => (
  <div
    dir="ltr"
    style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
    className="text-5xl font-black text-slate-800 tracking-wide font-['Tajawal']"
  >
    {left} {operator} {right}
  </div>
);

const PracticeObject: React.FC<{ type: ObjectKind; index: number }> = ({ type, index }) => {
  if (type === 'apple') return <AppleItem size={78} />;
  if (type === 'football') return <FootballItem size={76} />;
  if (type === 'car') {
    const colors = ['blue', 'red', 'yellow', 'green'] as const;
    return <ToyCarItem size={88} color={colors[index % colors.length]} />;
  }
  const colors = ['blue', 'yellow', 'red', 'green'] as const;
  return <ToyBlock size={76} color={colors[index % colors.length]} />;
};

const ObjectGroup: React.FC<{
  count: number;
  type: ObjectKind;
  onClick?: () => void;
  state?: 'idle' | 'correct' | 'wrong';
  label: string;
}> = ({ count, type, onClick, state = 'idle', label }) => (
  <button
    onClick={onClick}
    disabled={!onClick}
    aria-label={label}
    className={`relative w-[500px] min-h-[300px] px-8 py-7 rounded-3xl border-3 bg-white/92 shadow-xl flex items-center justify-center transition-all duration-200 ${
      onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98]' : 'cursor-default'
    } ${state === 'correct' ? 'border-emerald-500 ring-4 ring-emerald-200' : state === 'wrong' ? 'border-rose-400 animate-soft-shake' : 'border-sky-200'}`}
  >
    <div className="grid grid-cols-4 gap-x-5 gap-y-4 place-items-center" dir="ltr">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="w-[90px] h-[90px] flex items-center justify-center">
          <PracticeObject type={type} index={index} />
        </div>
      ))}
    </div>
    {state === 'correct' && (
      <span className="absolute top-4 right-4 w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
        <Check className="w-7 h-7" strokeWidth={4} />
      </span>
    )}
  </button>
);

export const OptionalPracticeScene: React.FC<OptionalPracticeSceneProps> = ({ scene, stage = 0, onComplete }) => {
  const { language, formatNum, speak } = useLanguage();
  const config = CONFIG[scene];
  const copy = OPTIONAL_PRACTICE[language];
  const text = copy.scenes[scene - 10];
  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setSelected(null);
    setWrong(null);
    setCompleted(false);
  }, [scene, stage]);

  const markAnswer = (choice: string, correct: boolean) => {
    if (completed) return;
    if (correct) {
      setSelected(choice);
      setWrong(null);
      setCompleted(true);
      sound.playSuccess();
      speak(text.correct);
      onComplete();
    } else {
      setWrong(choice);
      sound.playSoftBounce();
      speak(text.incorrect);
      window.setTimeout(() => setWrong(null), 550);
    }
  };

  const expression = config.kind === 'less'
    ? { left: config.a, operator: '<', right: config.b! }
    : config.kind === 'equal'
    ? { left: config.a, operator: '=', right: config.b! }
    : { left: config.a, operator: '>', right: config.b! };

  const instruction = config.kind === 'mixed'
    ? (stage === 0 ? text.countStep! : text.compareStep!)
    : text.instruction;

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      <SceneBackground theme="courtyard" />

      <div className="relative z-20 flex flex-col items-center pt-4 gap-2">
        <span className="text-sm font-extrabold text-sky-700 bg-sky-100/95 border border-sky-300 rounded-full px-4 py-1">
          {copy.label}
        </span>
        <div className="inline-flex items-center gap-3 bg-white/95 px-7 py-2.5 rounded-full shadow-lg border-2 border-amber-300">
          <h2 className="text-3xl font-black text-slate-800 font-['Tajawal']">{instruction}</h2>
          <button
            onClick={() => { sound.playPop(); speak(instruction); }}
            className="w-9 h-9 rounded-full bg-sky-100 hover:bg-sky-200 text-[#0284C7] flex items-center justify-center cursor-pointer"
            aria-label={instruction}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-5 px-16 pb-3">
        {config.kind === 'count' && (
          <>
            <ObjectGroup count={config.a} type={config.object} label={text.instruction} />
            <div className="flex gap-8" dir="ltr">
              {[6, 7, 8].map((value) => (
                <button
                  key={value}
                  onClick={() => markAnswer(String(value), value === config.a)}
                  className={`relative w-28 h-24 rounded-3xl text-5xl font-black shadow-lg border-3 transition-all cursor-pointer ${
                    selected === String(value) ? 'bg-emerald-500 text-white border-emerald-300' :
                    wrong === String(value) ? 'bg-rose-100 text-rose-700 border-rose-400 animate-soft-shake' :
                    'bg-white text-sky-700 border-sky-300 hover:-translate-y-1'
                  }`}
                >
                  {formatNum(value)}
                  {selected === String(value) && <Check className="absolute top-2 right-2 w-6 h-6" strokeWidth={4} />}
                </button>
              ))}
            </div>
            {completed && (
              <div className="flex items-center gap-3 text-2xl font-extrabold text-emerald-700 bg-white/95 border-2 border-emerald-300 rounded-2xl px-7 py-2 shadow-md">
                <Check className="w-7 h-7" strokeWidth={4} />
                <span>{text.correct} {text.reveal}</span>
              </div>
            )}
          </>
        )}

        {(config.kind === 'more' || config.kind === 'less' || (config.kind === 'mixed' && stage === 1)) && (
          <>
            <div className="flex items-center gap-14" dir="ltr">
              <ObjectGroup
                count={config.a} type={config.object} label={formatNum(config.a)}
                onClick={() => markAnswer('a', true)}
                state={selected === 'a' ? 'correct' : wrong === 'a' ? 'wrong' : 'idle'}
              />
              <ObjectGroup
                count={config.b!} type={config.object} label={formatNum(config.b!)}
                onClick={() => markAnswer('b', false)}
                state={selected === 'b' ? 'correct' : wrong === 'b' ? 'wrong' : 'idle'}
              />
            </div>
            {completed && (
              <div className="flex items-center gap-8 bg-white/95 border-2 border-emerald-300 rounded-3xl px-10 py-3 shadow-lg animate-object-drop">
                <MathExpression left={formatNum(expression.left)} operator={expression.operator} right={formatNum(expression.right)} />
                <span className="text-2xl font-extrabold text-emerald-700">{text.reveal}</span>
                {config.kind === 'mixed' && (
                  <span className="border-s-2 border-slate-200 ps-8 text-xl font-bold text-slate-700">
                    {text.differencePrompt} <strong className="text-sky-700">{text.differenceAnswer}</strong>
                  </span>
                )}
              </div>
            )}
          </>
        )}

        {config.kind === 'equal' && (
          <>
            <div className="flex items-center gap-14" dir="ltr">
              <ObjectGroup count={config.a} type={config.object} label={formatNum(config.a)} />
              <ObjectGroup count={config.b!} type={config.object} label={formatNum(config.b!)} />
            </div>
            <div className="flex gap-8">
              <button onClick={() => markAnswer('yes', true)} className={`min-w-40 h-16 rounded-2xl text-2xl font-black border-3 shadow-lg cursor-pointer ${selected === 'yes' ? 'bg-emerald-500 text-white border-emerald-300' : 'bg-white text-sky-700 border-sky-300'}`}>{text.yes}</button>
              <button onClick={() => markAnswer('no', false)} className={`min-w-40 h-16 rounded-2xl text-2xl font-black border-3 shadow-lg cursor-pointer ${wrong === 'no' ? 'bg-rose-100 text-rose-700 border-rose-400 animate-soft-shake' : 'bg-white text-slate-700 border-slate-300'}`}>{text.no}</button>
            </div>
            {completed && <div className="flex items-center gap-8 bg-white/95 border-2 border-emerald-300 rounded-3xl px-10 py-3 shadow-lg"><MathExpression left={formatNum(5)} operator="=" right={formatNum(5)} /><span className="text-2xl font-extrabold text-emerald-700">{text.reveal}</span></div>}
          </>
        )}

        {config.kind === 'mixed' && stage === 0 && (
          <div className="flex items-center gap-14" dir="ltr">
            <ObjectGroup count={config.a} type={config.object} label={formatNum(config.a)} />
            <ObjectGroup count={config.b!} type={config.object} label={formatNum(config.b!)} />
          </div>
        )}
      </div>
    </div>
  );
};
