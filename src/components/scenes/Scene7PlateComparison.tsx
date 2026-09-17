import React, { useState, useEffect, useRef } from 'react';
import { SceneBackground } from '../common/SceneBackground';
import { InstructionBar } from '../common/InstructionBar';
import { AppleItem, PencilItem, ToyCarItem } from '../common/VisualAssets';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Scene7Props {
  onComplete: () => void;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export const Scene7PlateComparison: React.FC<Scene7Props> = ({ onComplete, stage }) => {
  const { t, formatNum, speak, language } = useLanguage();

  // Sequence state per sub-stage:
  // 'compare' (objects only) -> 'counting' (count markers) -> 'numbers' (group totals) -> 'relationship' (equation & phrase)
  const [step, setStep] = useState<'compare' | 'counting' | 'numbers' | 'relationship'>('compare');
  const [isWrongSide, setIsWrongSide] = useState<'left' | 'right' | null>(null);
  const [wrongEqualNo, setWrongEqualNo] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timerRef.current.forEach((tId) => clearTimeout(tId));
    timerRef.current = [];
  };

  useEffect(() => {
    clearAllTimers();
    setStep('compare');
    setIsWrongSide(null);
    setWrongEqualNo(false);
    return () => clearAllTimers();
  }, [stage]);

  // =========================================================================
  // STAGE 0: "Which is more?" (أَيُّهُمَا أَكْثَرُ؟)
  // Left: 5 red apples (Row 1: 3, Row 2: 2) -> CORRECT (5 > 2)
  // Right: 2 red apples (1 row)
  // =========================================================================
  const handleStage0Click = (side: 'left' | 'right') => {
    if (step !== 'compare') return;

    if (side === 'left') {
      // Correct: Left group has 5 apples
      setIsWrongSide(null);
      sound.playCountNote(1);
      setStep('counting');

      // STEP 2: Show group numbers
      const t1 = setTimeout(() => {
        sound.playCountNote(5);
        setStep('numbers');
      }, 700);

      // STEP 3: Reveal relationship
      const t2 = setTimeout(() => {
        setStep('relationship');
        sound.playSuccess();
        speak(t.scene7.revealedMore);
        confetti({
          particleCount: 55,
          spread: 65,
          origin: { y: 0.55 },
          colors: ['#EF4444', '#26B7FF', '#10B981'],
        });
        onComplete();
      }, 1600);

      timerRef.current.push(t1, t2);
    } else {
      // Wrong side clicked
      setIsWrongSide('right');
      sound.playSoftBounce();
      const tw = setTimeout(() => setIsWrongSide(null), 550);
      timerRef.current.push(tw);
    }
  };

  // =========================================================================
  // STAGE 1: "Which has fewer?" (أَيُّهُمَا أَقَلُّ؟)
  // Left: 3 yellow pencils in 1 row -> CORRECT (3 < 6)
  // Right: 6 yellow pencils in 2 rows of 3
  // =========================================================================
  const handleStage1Click = (side: 'left' | 'right') => {
    if (step !== 'compare') return;

    if (side === 'left') {
      // Correct: Left group has 3 pencils
      setIsWrongSide(null);
      sound.playCountNote(1);
      setStep('counting');

      // STEP 2: Show group numbers
      const t1 = setTimeout(() => {
        sound.playCountNote(3);
        setStep('numbers');
      }, 700);

      // STEP 3: Reveal relationship
      const t2 = setTimeout(() => {
        setStep('relationship');
        sound.playSuccess();
        speak(t.scene7.revealedLess);
        confetti({
          particleCount: 55,
          spread: 65,
          origin: { y: 0.55 },
          colors: ['#FDE047', '#26B7FF', '#10B981'],
        });
        onComplete();
      }, 1600);

      timerRef.current.push(t1, t2);
    } else {
      // Wrong side clicked
      setIsWrongSide('right');
      sound.playSoftBounce();
      const tw = setTimeout(() => setIsWrongSide(null), 550);
      timerRef.current.push(tw);
    }
  };

  // =========================================================================
  // STAGE 2: "Are they equal?" (هَلْ هُمَا مُتَسَاوِيَانِ؟)
  // Left: 4 toy cars in 1 row
  // Right: 4 toy cars in 2 rows of 2
  // Student answers YES (نَعَم) -> animate 1-to-1 correspondence -> 4 = 4 -> Equal!
  // =========================================================================
  const handleEqualYes = () => {
    if (step !== 'compare') return;

    sound.playCarHonk();
    // Step 1 -> Animate 1-to-1 matching badges
    setStep('counting');

    // Step 2 -> Show totals 4 and 4 with equal sign
    const t1 = setTimeout(() => {
      sound.playCountNote(4);
      setStep('numbers');
    }, 800);

    // Step 3 -> Reveal "Equal!" celebration
    const t2 = setTimeout(() => {
      setStep('relationship');
      sound.playCelebration();
      speak(t.scene7.feedbackEqual);
      confetti({
        particleCount: 70,
        spread: 85,
        origin: { y: 0.55 },
        colors: ['#26B7FF', '#FDE700', '#10B981', '#C084FC'],
      });
      onComplete();
    }, 1700);

    timerRef.current.push(t1, t2);
  };

  const handleEqualNo = () => {
    if (step !== 'compare') return;
    setWrongEqualNo(true);
    sound.playSoftBounce();
    const tw = setTimeout(() => setWrongEqualNo(false), 550);
    timerRef.current.push(tw);
  };

  // Distinct pair colors for 1-to-1 correspondence
  const pairBadges = [
    { bg: 'bg-sky-500', ring: 'ring-sky-300' },
    { bg: 'bg-amber-500', ring: 'ring-amber-300' },
    { bg: 'bg-emerald-500', ring: 'ring-emerald-300' },
    { bg: 'bg-purple-500', ring: 'ring-purple-300' },
  ];

  const showCountMarkers = step === 'counting' || step === 'numbers' || step === 'relationship';
  const showTotals = step === 'numbers' || step === 'relationship';
  const showRelationship = step === 'relationship';

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      <SceneBackground theme="playroom" />

      {/* Instruction Bar with Dynamic Question */}
      <InstructionBar
        instruction={
          stage === 0
            ? t.scene7.whichHasMore
            : stage === 1
            ? t.scene7.whichHasFewer
            : t.scene7.areTheyEqual
        }
      />

      {/* =====================================================================
          STAGE 0: WHICH IS MORE? (أَيُّهُمَا أَكْثَرُ؟)
          Visual heroes: Large 3D Red Apples (AppleItem)
          Left: 5 red apples (Row 1: 3, Row 2: 2)
          Right: 2 red apples (Row: 2)
          NO containers, plates, or cards.
          Pure counted objects directly.
          ===================================================================== */}
      {stage === 0 && (
        <div className="relative flex-1 flex flex-col items-center justify-center z-10 px-8">
          <div className="flex items-center justify-center gap-12 lg:gap-20 w-full max-w-5xl">
            {/* LEFT GROUP: 5 Red Apples (MORE - CORRECT) */}
            <div
              onClick={() => handleStage0Click('left')}
              className={`flex-1 max-w-[460px] min-h-[320px] rounded-3xl p-6 flex flex-col items-center justify-center relative cursor-pointer select-none transition-all duration-300 ${
                step === 'compare'
                  ? isWrongSide === 'left'
                    ? 'bg-rose-50/50 ring-2 ring-rose-300 animate-soft-shake'
                    : 'hover:bg-white/35 active:scale-98'
                  : 'bg-transparent'
              }`}
            >
              {/* Apples 3D Grid: 3 on Top, 2 on Bottom */}
              <div className="flex flex-col items-center justify-center gap-3">
                {/* Row 1: 3 Apples */}
                <div className="flex items-center justify-center gap-5">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="relative flex flex-col items-center">
                      <AppleItem size={115} />
                      {showCountMarkers && (
                        <span className="mt-1 bg-white/95 text-slate-800 border border-slate-300 font-black text-base px-2.5 py-0.5 rounded-full shadow-xs animate-scale-up">
                          {formatNum(num)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Row 2: 2 Apples */}
                <div className="flex items-center justify-center gap-5">
                  {[4, 5].map((num) => (
                    <div key={num} className="relative flex flex-col items-center">
                      <AppleItem size={115} />
                      {showCountMarkers && (
                        <span className="mt-1 bg-white/95 text-slate-800 border border-slate-300 font-black text-base px-2.5 py-0.5 rounded-full shadow-xs animate-scale-up">
                          {formatNum(num)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Group Total Number Badge (Revealed in Step 2) */}
              {showTotals && (
                <div className="mt-3 bg-white/95 text-emerald-700 px-6 py-1 rounded-2xl font-black text-3xl font-['Tajawal'] border-2 border-emerald-400 shadow-md animate-scale-up">
                  {formatNum(5)}
                </div>
              )}
            </div>

            {/* Subtle Divider between groups */}
            <div className="shrink-0 flex flex-col items-center justify-center">
              {showRelationship ? (
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-3xl shadow-lg animate-scale-up" dir="ltr">
                  &gt;
                </div>
              ) : (
                <div className="w-2 h-36 bg-slate-200/50 rounded-full" />
              )}
            </div>

            {/* RIGHT GROUP: 2 Red Apples */}
            <div
              onClick={() => handleStage0Click('right')}
              className={`flex-1 max-w-[460px] min-h-[320px] rounded-3xl p-6 flex flex-col items-center justify-center relative cursor-pointer select-none transition-all duration-300 ${
                step === 'compare'
                  ? isWrongSide === 'right'
                    ? 'bg-rose-50/50 ring-2 ring-rose-300 animate-soft-shake'
                    : 'hover:bg-white/35 active:scale-98'
                  : 'bg-transparent'
              }`}
            >
              {/* Row: 2 Apples */}
              <div className="flex items-center justify-center gap-8">
                {[1, 2].map((num) => (
                  <div key={num} className="relative flex flex-col items-center">
                    <AppleItem size={115} />
                    {showCountMarkers && (
                      <span className="mt-1 bg-white/95 text-slate-800 border border-slate-300 font-black text-base px-2.5 py-0.5 rounded-full shadow-xs animate-scale-up">
                        {formatNum(num)}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Group Total Number Badge (Revealed in Step 2) */}
              {showTotals && (
                <div className="mt-3 bg-white/95 text-slate-700 px-6 py-1 rounded-2xl font-black text-3xl font-['Tajawal'] border-2 border-slate-300 shadow-md animate-scale-up">
                  {formatNum(2)}
                </div>
              )}
            </div>
          </div>

          {/* STEP 3: REVEALED RELATIONSHIP BANNER (5 > 2 / ٥ أَكْثَرُ مِنْ ٢) */}
          {showRelationship && (
            <div className="mt-5 bg-white/95 px-8 py-2.5 rounded-2xl shadow-xl border-2 border-emerald-400 flex items-center gap-4 animate-scale-up">
              <span className="text-3xl lg:text-4xl font-black text-emerald-600 font-['Tajawal'] tracking-wide" dir="ltr">
                {t.scene7.revealedMoreMath}
              </span>
              <span className="text-slate-300 text-2xl font-light">|</span>
              <span className="text-2xl lg:text-3xl font-bold text-slate-800 font-['Tajawal']">
                {t.scene7.revealedMore}
              </span>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          STAGE 1: WHICH HAS FEWER? (أَيُّهُمَا أَقَلُّ؟)
          Visual heroes: Standard Yellow Pencils (PencilItem)
          Left: 3 large yellow pencils in 1 row (FEWER - CORRECT)
          Right: 6 large yellow pencils in 2 rows of 3
          NO pencil cases, boxes, or cards.
          ===================================================================== */}
      {stage === 1 && (
        <div className="relative flex-1 flex flex-col items-center justify-center z-10 px-8">
          <div className="flex items-center justify-center gap-12 lg:gap-20 w-full max-w-5xl">
            {/* LEFT GROUP: 3 Yellow Pencils in 1 Row (FEWER - CORRECT) */}
            <div
              onClick={() => handleStage1Click('left')}
              className={`flex-1 max-w-[460px] min-h-[330px] rounded-3xl p-6 flex flex-col items-center justify-center relative cursor-pointer select-none transition-all duration-300 ${
                step === 'compare'
                  ? isWrongSide === 'left'
                    ? 'bg-rose-50/50 ring-2 ring-rose-300 animate-soft-shake'
                    : 'hover:bg-white/35 active:scale-98'
                  : 'bg-transparent'
              }`}
            >
              {/* 3 Yellow Pencils in ONE row */}
              <div className="flex items-end justify-center gap-7 pt-2">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="relative flex flex-col items-center">
                    <PencilItem size={130} color="yellow" />
                    {showCountMarkers && (
                      <span className="mt-1 bg-white/95 text-slate-800 border border-slate-300 font-black text-base px-2.5 py-0.5 rounded-full shadow-xs animate-scale-up">
                        {formatNum(num)}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Group Total Number Badge (Revealed in Step 2) */}
              {showTotals && (
                <div className="mt-3 bg-white/95 text-emerald-700 px-6 py-1 rounded-2xl font-black text-3xl font-['Tajawal'] border-2 border-emerald-400 shadow-md animate-scale-up">
                  {formatNum(3)}
                </div>
              )}
            </div>

            {/* Subtle Divider between groups */}
            <div className="shrink-0 flex flex-col items-center justify-center">
              {showRelationship ? (
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-3xl shadow-lg animate-scale-up" dir="ltr">
                  &lt;
                </div>
              ) : (
                <div className="w-2 h-36 bg-slate-200/50 rounded-full" />
              )}
            </div>

            {/* RIGHT GROUP: 6 Yellow Pencils in 2 Rows of 3 */}
            <div
              onClick={() => handleStage1Click('right')}
              className={`flex-1 max-w-[460px] min-h-[330px] rounded-3xl p-6 flex flex-col items-center justify-center relative cursor-pointer select-none transition-all duration-300 ${
                step === 'compare'
                  ? isWrongSide === 'right'
                    ? 'bg-rose-50/50 ring-2 ring-rose-300 animate-soft-shake'
                    : 'hover:bg-white/35 active:scale-98'
                  : 'bg-transparent'
              }`}
            >
              {/* 6 Pencils in TWO rows */}
              <div className="flex flex-col items-center justify-center gap-2">
                {/* Row 1: Pencils 1, 2, 3 */}
                <div className="flex items-end justify-center gap-5">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="relative flex flex-col items-center">
                      <PencilItem size={100} color="yellow" />
                      {showCountMarkers && (
                        <span className="mt-0.5 bg-white/95 text-slate-800 border border-slate-300 font-black text-sm px-2 py-0.2 rounded-full shadow-xs animate-scale-up">
                          {formatNum(num)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Row 2: Pencils 4, 5, 6 */}
                <div className="flex items-end justify-center gap-5">
                  {[4, 5, 6].map((num) => (
                    <div key={num} className="relative flex flex-col items-center">
                      <PencilItem size={100} color="yellow" />
                      {showCountMarkers && (
                        <span className="mt-0.5 bg-white/95 text-slate-800 border border-slate-300 font-black text-sm px-2 py-0.2 rounded-full shadow-xs animate-scale-up">
                          {formatNum(num)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Group Total Number Badge (Revealed in Step 2) */}
              {showTotals && (
                <div className="mt-3 bg-white/95 text-slate-700 px-6 py-1 rounded-2xl font-black text-3xl font-['Tajawal'] border-2 border-slate-300 shadow-md animate-scale-up">
                  {formatNum(6)}
                </div>
              )}
            </div>
          </div>

          {/* STEP 3: REVEALED RELATIONSHIP BANNER (3 < 6 / ٣ أَقَلُّ مِنْ ٦) */}
          {showRelationship && (
            <div className="mt-5 bg-white/95 px-8 py-2.5 rounded-2xl shadow-xl border-2 border-emerald-400 flex items-center gap-4 animate-scale-up">
              <span className="text-3xl lg:text-4xl font-black text-emerald-600 font-['Tajawal'] tracking-wide" dir="ltr">
                {t.scene7.revealedLessMath}
              </span>
              <span className="text-slate-300 text-2xl font-light">|</span>
              <span className="text-2xl lg:text-3xl font-bold text-slate-800 font-['Tajawal']">
                {t.scene7.revealedLess}
              </span>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          STAGE 2: ARE THEY EQUAL? (هَلْ هُمَا مُتَسَاوِيَانِ؟)
          Visual heroes: Recognizable Toy Cars (ToyCarItem)
          Left: 4 cars in 1 row
          Right: 4 cars arranged 2 × 2
          Initial state: ONLY the cars and YES/NO buttons.
          NO numbers or equations before answer.
          Click YES -> Animate 1-to-1 correspondence -> 4 = 4 -> Equal!
          ===================================================================== */}
      {stage === 2 && (
        <div className="relative flex-1 flex flex-col items-center justify-center z-10 px-8">
          <div className="flex items-center justify-center gap-10 lg:gap-14 w-full max-w-5xl">
            {/* LEFT GROUP: 4 Cars in 1 Row */}
            <div className="flex-1 max-w-[460px] min-h-[250px] rounded-3xl p-5 flex flex-col items-center justify-center relative select-none">
              <div className="flex items-center justify-center gap-4">
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="relative flex flex-col items-center">
                    <ToyCarItem size={92} color="blue" />
                    {/* 1-to-1 correspondence matching badge */}
                    {showCountMarkers && (
                      <span
                        className={`absolute -top-3 w-7 h-7 rounded-full flex items-center justify-center font-black text-sm text-white shadow-md ring-2 ${pairBadges[idx].bg} ${pairBadges[idx].ring} animate-scale-up`}
                      >
                        {formatNum(idx + 1)}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Total revealed after answer */}
              {showTotals && (
                <div className="mt-3 bg-white/95 text-sky-700 px-6 py-1 rounded-2xl font-black text-2xl font-['Tajawal'] border-2 border-sky-300 shadow-md animate-scale-up">
                  {formatNum(4)}
                </div>
              )}
            </div>

            {/* Center: Equal Sign or Question Divider */}
            <div className="shrink-0 flex flex-col items-center justify-center">
              {showTotals ? (
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-4xl shadow-xl animate-bounce">
                  =
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xl border border-slate-200">
                  ?
                </div>
              )}
            </div>

            {/* RIGHT GROUP: 4 Cars arranged 2 × 2 */}
            <div className="flex-1 max-w-[460px] min-h-[250px] rounded-3xl p-5 flex flex-col items-center justify-center relative select-none">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex items-center justify-center gap-6">
                  {[0, 1].map((idx) => (
                    <div key={idx} className="relative flex flex-col items-center">
                      <ToyCarItem size={92} color="blue" />
                      {/* 1-to-1 correspondence matching badge */}
                      {showCountMarkers && (
                        <span
                          className={`absolute -top-3 w-7 h-7 rounded-full flex items-center justify-center font-black text-sm text-white shadow-md ring-2 ${pairBadges[idx].bg} ${pairBadges[idx].ring} animate-scale-up`}
                        >
                          {formatNum(idx + 1)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6">
                  {[2, 3].map((idx) => (
                    <div key={idx} className="relative flex flex-col items-center">
                      <ToyCarItem size={92} color="blue" />
                      {/* 1-to-1 correspondence matching badge */}
                      {showCountMarkers && (
                        <span
                          className={`absolute -top-3 w-7 h-7 rounded-full flex items-center justify-center font-black text-sm text-white shadow-md ring-2 ${pairBadges[idx].bg} ${pairBadges[idx].ring} animate-scale-up`}
                        >
                          {formatNum(idx + 1)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Total revealed after answer */}
              {showTotals && (
                <div className="mt-3 bg-white/95 text-sky-700 px-6 py-1 rounded-2xl font-black text-2xl font-['Tajawal'] border-2 border-sky-300 shadow-md animate-scale-up">
                  {formatNum(4)}
                </div>
              )}
            </div>
          </div>

          {/* Answer Controls or Revealed Feedback */}
          {!showRelationship ? (
            <div className="mt-7 flex items-center justify-center gap-8 z-20">
              {/* YES BUTTON (نَعَم / YES / 是) - CORRECT */}
              <button
                onClick={handleEqualYes}
                disabled={step !== 'compare'}
                className="px-12 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-3xl font-['Tajawal'] shadow-xl border-2 border-white hover:scale-105 active:scale-95 transition-all cursor-pointer min-w-[170px]"
              >
                {t.scene7.btnYes} ✓
              </button>

              {/* NO BUTTON (لَا / NO / 不是) */}
              <button
                onClick={handleEqualNo}
                disabled={step !== 'compare'}
                className={`px-12 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-black text-3xl font-['Tajawal'] shadow-md border-2 border-slate-300 hover:scale-105 active:scale-95 transition-all cursor-pointer min-w-[170px] ${
                  wrongEqualNo ? 'animate-soft-shake border-rose-400 bg-rose-50 text-rose-600' : ''
                }`}
              >
                {t.scene7.btnNo}
              </button>
            </div>
          ) : (
            /* STEP 3: REVEALED EQUAL RELATIONSHIP BANNER (4 = 4 / مُتَسَاوِيَانِ) */
            <div className="mt-6 bg-white/95 px-10 py-3 rounded-2xl shadow-xl border-2 border-emerald-400 flex items-center gap-6 animate-scale-up">
              <span className="text-3xl lg:text-4xl font-black text-emerald-600 font-['Tajawal']" dir="ltr">
                {language === 'ar' ? '٤ = ٤' : '4 = 4'}
              </span>
              <span className="text-slate-300 text-2xl font-light">|</span>
              <span className="text-2xl lg:text-3xl font-black text-slate-800 font-['Tajawal']">
                {t.scene7.feedbackEqual}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
