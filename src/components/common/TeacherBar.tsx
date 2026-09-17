import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

interface TeacherBarProps {
  onNext: () => void;
  onPrev?: () => void;
  onReset?: () => void;
  isCompleted?: boolean;
  teacherPrompt: string;
  stageInfo?: string;
  nextLabel?: string;
}

export const TeacherBar: React.FC<TeacherBarProps> = ({
  onNext,
  onPrev,
  onReset,
  isCompleted = false,
  teacherPrompt,
  stageInfo,
  nextLabel,
}) => {
  const { t, isRTL } = useLanguage();
  const effectiveNextLabel = nextLabel || t.btnNext;

  return (
    <footer className="w-full h-[105px] px-8 lg:px-12 flex items-center justify-between z-30 bg-white/80 backdrop-blur-md border-t border-amber-200/80 shadow-lg select-none">
      {/* Teacher Prompt Suggestion */}
      <div className="flex items-center gap-4 max-w-2xl">
        <div className="bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-xl font-bold text-sm tracking-wide border border-amber-300 flex items-center gap-2 shrink-0">
          <span>{t.teacherGuide}</span>
        </div>
        <p className="text-slate-700 font-semibold text-base lg:text-lg leading-snug">
          {teacherPrompt}
        </p>
        {stageInfo && (
          <span className="text-sm font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded-lg border border-sky-200 shrink-0">
            {stageInfo}
          </span>
        )}
      </div>

      {/* Navigation Controls: Stable NEXT button */}
      <div className="flex items-center gap-4">
        {onReset && (
          <button
            onClick={() => {
              sound.playPop();
              onReset();
            }}
            title={t.btnReset}
            className="w-12 h-12 rounded-2xl bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 active:scale-95 flex items-center justify-center shadow-xs transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}

        {onPrev && (
          <button
            onClick={() => {
              sound.playPop();
              onPrev();
            }}
            title={t.btnPrev}
            className="px-5 h-14 rounded-2xl bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 active:scale-95 flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            {isRTL ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
            <span>{t.btnPrev}</span>
          </button>
        )}

        {/* Hero STABLE NEXT button */}
        <button
          onClick={() => {
            sound.playPop();
            onNext();
          }}
          className={`h-16 px-10 rounded-2xl font-black text-2xl flex items-center gap-3 transition-all duration-300 shadow-xl cursor-pointer active:scale-95 ${
            isCompleted
              ? 'bg-gradient-to-r from-[#26B7FF] to-[#0284C7] text-white hover:brightness-105 ring-4 ring-sky-300/60 animate-pulse'
              : 'bg-[#26B7FF] text-white hover:bg-[#0284C7]'
          }`}
        >
          {isCompleted && <Sparkles className="w-6 h-6 text-[#FDE700] animate-spin" />}
          <span>{effectiveNextLabel}</span>
          {isRTL ? <ArrowLeft className="w-7 h-7" /> : <ArrowRight className="w-7 h-7" />}
        </button>
      </div>
    </footer>
  );
};

