import React from 'react';
import { sound } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

interface PlayfulNumeralProps {
  number: number;
  isSelected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  color?: 'blue' | 'yellow' | 'green' | 'coral' | 'amber' | 'purple';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  floating?: boolean;
}

const COLOR_PALETTES = {
  blue: {
    gradient: 'from-[#26B7FF] via-[#0284C7] to-[#0369A1]',
    shadow: 'rgba(2, 132, 199, 0.45)',
    glow: 'rgba(38, 183, 255, 0.8)',
    textBevel: '#BAE6FD',
  },
  yellow: {
    gradient: 'from-[#FDE700] via-[#EAB308] to-[#CA8A04]',
    shadow: 'rgba(202, 138, 4, 0.5)',
    glow: 'rgba(253, 231, 0, 0.85)',
    textBevel: '#FEF9C3',
  },
  green: {
    gradient: 'from-[#34D399] via-[#10B981] to-[#047857]',
    shadow: 'rgba(4, 120, 87, 0.45)',
    glow: 'rgba(52, 211, 153, 0.8)',
    textBevel: '#D1FAE5',
  },
  coral: {
    gradient: 'from-[#FB7185] via-[#E11D48] to-[#9F1239]',
    shadow: 'rgba(159, 18, 57, 0.45)',
    glow: 'rgba(251, 113, 133, 0.8)',
    textBevel: '#FFE4E6',
  },
  amber: {
    gradient: 'from-[#FDBA74] via-[#EA580C] to-[#9A3412]',
    shadow: 'rgba(154, 52, 18, 0.45)',
    glow: 'rgba(253, 186, 116, 0.8)',
    textBevel: '#FFEDD5',
  },
  purple: {
    gradient: 'from-[#C084FC] via-[#9333EA] to-[#6B21A8]',
    shadow: 'rgba(107, 33, 168, 0.45)',
    glow: 'rgba(192, 132, 252, 0.8)',
    textBevel: '#F3E8FF',
  },
};

/**
 * Freestanding 3D Dimensional Interactive Numeral.
 * Formatted with Eastern Arabic numerals for Arabic mode, Western for English/Chinese.
 */
export const PlayfulNumeral: React.FC<PlayfulNumeralProps> = ({
  number,
  isSelected = false,
  isCorrect = false,
  isWrong = false,
  size = 'lg',
  color = 'blue',
  onClick,
  className = '',
  disabled = false,
  floating = true,
}) => {
  const { formatNum, speak, numberWord } = useLanguage();
  const palette = COLOR_PALETTES[color];

  const sizeStyles = {
    sm: { fontSize: '4.5rem', width: '90px', height: '110px' },
    md: { fontSize: '6.5rem', width: '130px', height: '160px' },
    lg: { fontSize: '8.5rem', width: '170px', height: '210px' },
    xl: { fontSize: '11rem', width: '220px', height: '270px' },
    hero: { fontSize: '15rem', width: '300px', height: '360px' },
  }[size];

  const handleClick = () => {
    if (disabled) return;
    sound.playPop();
    speak(numberWord(number));
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: sizeStyles.width,
        height: sizeStyles.height,
        filter: isCorrect
          ? 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.9))'
          : isSelected
          ? `drop-shadow(0 0 20px ${palette.glow})`
          : `drop-shadow(0 14px 18px ${palette.shadow})`,
      }}
      className={`relative inline-flex items-center justify-center font-black font-['Tajawal'] select-none transition-all duration-300 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-115 active:scale-95'
      } ${floating && !isWrong ? 'animate-float-slow' : ''} ${
        isWrong ? 'animate-soft-shake text-rose-500' : ''
      } ${className}`}
    >
      {/* 3D Numerals using layered gradient font */}
      <span
        style={{
          fontSize: sizeStyles.fontSize,
          lineHeight: 1,
          textShadow: `0 4px 0 rgba(0,0,0,0.15), 0 8px 16px ${palette.shadow}`,
        }}
        className={`bg-gradient-to-b ${palette.gradient} bg-clip-text text-transparent transform transition-transform duration-200`}
      >
        {formatNum(number)}
      </span>

      {/* Floating Sparkle when selected or correct */}
      {(isCorrect || isSelected) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full rounded-full animate-ping opacity-25 bg-amber-300" />
        </div>
      )}
    </div>
  );
};

/**
 * Hero Numeral for introduction stages - enormous protagonist numeral with pedestal glow
 */
export const HeroNumeral: React.FC<{
  number: number;
  label?: string;
  size?: 'xl' | 'hero';
  className?: string;
}> = ({ number, label, size = 'hero', className = '' }) => {
  const { formatNum, speak, numberWord } = useLanguage();
  const fontSize = size === 'hero' ? 'text-[13rem]' : 'text-[10rem]';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Radiant backlight pedestal */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-amber-200/40 via-sky-200/40 to-transparent blur-2xl animate-pulse-glow" />

      {/* Hero 3D Glyphs */}
      <div
        className={`relative z-10 font-black font-['Tajawal'] ${fontSize} leading-none drop-shadow-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer animate-float-slow`}
        onClick={() => {
          sound.playPop();
          speak(label || numberWord(number));
        }}
        style={{
          filter: 'drop-shadow(0 18px 24px rgba(2, 132, 199, 0.4))',
        }}
      >
        <span className="bg-gradient-to-b from-[#26B7FF] via-[#0284C7] to-[#0369A1] bg-clip-text text-transparent">
          {formatNum(number)}
        </span>
      </div>

      {label && (
        <div className="relative z-10 mt-2 bg-white/90 backdrop-blur-md px-8 py-2 rounded-full border-2 border-amber-300 shadow-lg font-black text-3xl font-['Tajawal'] text-slate-800">
          {label}
        </div>
      )}
    </div>
  );
};

/**
 * Tactile Card - physical tile / shelf card metaphor
 */
interface TactileCardProps {
  number: number;
  isSelected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const TactileCard: React.FC<TactileCardProps> = ({
  number,
  isSelected = false,
  isCorrect = false,
  isWrong = false,
  size = 'md',
  onClick,
  className = '',
  disabled = false,
}) => {
  const { formatNum, speak, numberWord } = useLanguage();
  const sizeClasses = {
    sm: 'w-24 h-32 text-5xl rounded-2xl',
    md: 'w-32 h-44 text-7xl rounded-3xl',
    lg: 'w-40 h-52 text-8xl rounded-3xl',
  }[size];

  const handleClick = () => {
    if (disabled) return;
    sound.playPop();
    speak(numberWord(number));
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center font-black font-['Tajawal'] select-none transition-all duration-300 shadow-xl border-4 ${sizeClasses} ${
        disabled
          ? 'opacity-60 cursor-not-allowed bg-slate-100 border-slate-300 text-slate-400'
          : 'cursor-pointer hover:scale-105 active:scale-95'
      } ${
        isCorrect
          ? 'bg-gradient-to-b from-emerald-50 to-emerald-100 border-emerald-500 text-emerald-700 ring-4 ring-emerald-300 scale-105'
          : isWrong
          ? 'bg-gradient-to-b from-rose-50 to-rose-100 border-rose-400 text-rose-600 animate-soft-shake'
          : isSelected
          ? 'bg-gradient-to-b from-sky-50 to-sky-100 border-[#26B7FF] text-[#0284C7] ring-4 ring-sky-300'
          : 'bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7] border-amber-300 text-amber-950 hover:border-amber-400'
      } ${className}`}
    >
      <span className="relative z-10 drop-shadow-sm">{formatNum(number)}</span>
    </div>
  );
};

// Backward compatibility alias so existing imports don't break
export const NumberCard = TactileCard;
