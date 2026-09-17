import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { sound } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderBarProps {
  currentScene: number;
  totalScenes: number;
  onSelectScene: (sceneId: number) => void;
  sceneTitle: string;
  optionalStartScene?: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentScene,
  totalScenes,
  onSelectScene,
  sceneTitle,
  optionalStartScene,
}) => {
  const { language, setLanguage, t, formatNum } = useLanguage();
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playPop();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const visibleScenes = optionalStartScene && currentScene >= optionalStartScene
    ? Array.from({ length: totalScenes - optionalStartScene + 1 }, (_, i) => optionalStartScene + i)
    : Array.from({ length: optionalStartScene ? optionalStartScene - 1 : totalScenes }, (_, i) => i + 1);

  return (
    <header className="w-full h-[90px] px-6 lg:px-10 flex items-center justify-between z-30 bg-white/85 backdrop-blur-md border-b border-amber-200/60 shadow-xs select-none" dir="ltr">
      {/* TOP-LEFT Area: Persistent Trilingual Switcher (العربية | EN | 中文) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/90 shadow-xs select-none" dir="ltr">
          <button
            onClick={() => {
              sound.playPop();
              setLanguage('ar');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              language === 'ar'
                ? 'bg-[#0284C7] text-white shadow-sm scale-102 font-black'
                : 'bg-transparent text-slate-700 hover:bg-slate-200/80 font-semibold'
            }`}
            title="اللغة العربية"
          >
            العربية
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setLanguage('en');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-[#0284C7] text-white shadow-sm scale-102 font-black'
                : 'bg-transparent text-slate-700 hover:bg-slate-200/80 font-semibold'
            }`}
            title="English"
          >
            EN
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setLanguage('zh');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              language === 'zh'
                ? 'bg-[#0284C7] text-white shadow-sm scale-102 font-black'
                : 'bg-transparent text-slate-700 hover:bg-slate-200/80 font-semibold'
            }`}
            title="中文"
          >
            中文
          </button>
        </div>

        {/* Brand & Stage indicator */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#26B7FF] to-[#0284C7] shadow-sm border border-white shrink-0">
            <span className="text-white text-2xl font-black font-['Tajawal'] tracking-tight">
              {formatNum(currentScene)}
            </span>
          </div>
          <div className="hidden xl:block">
            <h1 className="text-lg font-black text-slate-800 tracking-wide font-['Tajawal'] leading-tight">
              {t.appTitle}
            </h1>
            <p className="text-slate-500 text-xs font-medium truncate max-w-[200px]">
              {sceneTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Center: Number Progress Navigation Breadcrumb (1 to 9) */}
      <div className="flex items-center gap-1.5 lg:gap-2 bg-amber-50/80 px-3 py-1.5 rounded-2xl border border-amber-200" dir="ltr">
        {visibleScenes.map((sceneNum) => {
          const isActive = sceneNum === currentScene;
          const isPassed = sceneNum < currentScene;
          return (
            <button
              key={sceneNum}
              onClick={() => {
                sound.playPop();
                onSelectScene(sceneNum);
              }}
              title={`${t.sceneTooltip} ${formatNum(sceneNum)}`}
              className={`w-8 h-8 lg:w-9 lg:h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#0284C7] text-white scale-110 shadow-md ring-2 ring-sky-300 font-black'
                  : isPassed
                  ? 'bg-amber-200/80 text-amber-900 hover:bg-amber-300 font-bold'
                  : 'bg-white text-slate-500 hover:bg-slate-100 font-medium'
              }`}
            >
              {formatNum(sceneNum)}
            </button>
          );
        })}
      </div>

      {/* TOP-RIGHT: Badge & Utilities */}
      <div className="flex items-center gap-3" dir="ltr">
        <span className="bg-amber-100 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold border border-amber-300 whitespace-nowrap">
          {t.courseBadge}
        </span>

        {/* Audio Toggle Button */}
        <button
          onClick={toggleAudio}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          title={isMuted ? t.unmuteAudio : t.muteAudio}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-[#0284C7]" />}
        </button>

        {/* Fullscreen Toggle Button */}
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          title={t.fullscreen}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5 text-slate-600" /> : <Maximize2 className="w-5 h-5 text-slate-600" />}
        </button>
      </div>
    </header>
  );
};
