import React from 'react';

interface AssetProps {
  className?: string;
  size?: number;
}

/**
 * High-quality, consistent 3D-styled educational objects.
 * Vector SVG ensures zero blur at any resolution (1920x1080 canvas scaling).
 */

// 1. Sukari Date (تمر) - golden brown with warm specular highlights and soft grooves
export const DateFruit: React.FC<AssetProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-md select-none pointer-events-none ${className}`}
  >
    <defs>
      <radialGradient id="dateGrad" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#C67D38" />
        <stop offset="35%" stopColor="#8F4B18" />
        <stop offset="85%" stopColor="#572809" />
        <stop offset="100%" stopColor="#3A1703" />
      </radialGradient>
      <linearGradient id="dateHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD39B" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#C67D38" stopOpacity="0" />
      </linearGradient>
      <ellipse id="dropShadow" cx="50" cy="88" rx="36" ry="7" fill="rgba(0,0,0,0.18)" />
    </defs>
    {/* Shadow */}
    <use href="#dropShadow" />
    {/* Main date body */}
    <path
      d="M 50 14 C 74 14, 84 34, 82 58 C 80 78, 66 86, 50 86 C 34 86, 19 77, 18 57 C 17 35, 27 14, 50 14 Z"
      fill="url(#dateGrad)"
    />
    {/* Natural soft wrinkles */}
    <path
      d="M 32 32 C 38 48, 36 66, 42 76"
      stroke="#4A1F05"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.45"
    />
    <path
      d="M 64 30 C 60 46, 62 64, 56 74"
      stroke="#4A1F05"
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.45"
    />
    {/* Specular sheen */}
    <ellipse cx="40" cy="30" rx="14" ry="8" transform="rotate(-20 40 30)" fill="url(#dateHighlight)" />
    {/* Stem attachment cap */}
    <ellipse cx="50" cy="15" rx="5" ry="3" fill="#422008" />
  </svg>
);

// 2. Fresh Orange (برتقال) - bright vibrant citrus with leaf
export const OrangeFruit: React.FC<AssetProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-md select-none pointer-events-none ${className}`}
  >
    <defs>
      <radialGradient id="orangeGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFAE34" />
        <stop offset="45%" stopColor="#FF7A00" />
        <stop offset="90%" stopColor="#D85200" />
        <stop offset="100%" stopColor="#A83900" />
      </radialGradient>
      <radialGradient id="leafGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#8BE345" />
        <stop offset="100%" stopColor="#2E800D" />
      </radialGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="34" ry="7" fill="rgba(0,0,0,0.18)" />
    {/* Orange sphere */}
    <circle cx="50" cy="54" r="35" fill="url(#orangeGrad)" />
    {/* Orange texture dimples */}
    <circle cx="36" cy="46" r="1.5" fill="#FFE8AA" opacity="0.6" />
    <circle cx="44" cy="40" r="1.5" fill="#FFE8AA" opacity="0.6" />
    <circle cx="38" cy="56" r="1.5" fill="#FFE8AA" opacity="0.6" />
    {/* Specular glow */}
    <ellipse cx="38" cy="38" rx="12" ry="7" transform="rotate(-30 38 38)" fill="#FFF5D6" opacity="0.5" />
    {/* Stem & Leaf */}
    <path d="M 50 20 Q 52 14 54 10" stroke="#5D3A0A" strokeWidth="3" strokeLinecap="round" />
    <path
      d="M 51 18 C 65 14, 76 20, 72 28 C 62 30, 54 24, 51 18 Z"
      fill="url(#leafGrad)"
      stroke="#225D0A"
      strokeWidth="1"
    />
  </svg>
);

// 3. Crisp Red Apple (تفاح) - ruby red with soft light
export const AppleFruit: React.FC<AssetProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-md select-none pointer-events-none ${className}`}
  >
    <defs>
      <radialGradient id="appleGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FF5E62" />
        <stop offset="40%" stopColor="#E61C24" />
        <stop offset="85%" stopColor="#A80710" />
        <stop offset="100%" stopColor="#660005" />
      </radialGradient>
      <radialGradient id="appleLeaf" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#8BE345" />
        <stop offset="100%" stopColor="#2E800D" />
      </radialGradient>
    </defs>
    <ellipse cx="50" cy="88" rx="34" ry="7" fill="rgba(0,0,0,0.18)" />
    {/* Apple heart-like body */}
    <path
      d="M 50 28 C 42 22, 20 22, 18 46 C 16 66, 32 86, 50 86 C 68 86, 84 66, 82 46 C 80 22, 58 22, 50 28 Z"
      fill="url(#appleGrad)"
    />
    {/* Highlights */}
    <ellipse cx="36" cy="40" rx="10" ry="6" transform="rotate(-30 36 40)" fill="#FFA5A8" opacity="0.65" />
    {/* Stem */}
    <path d="M 50 28 Q 50 14 58 10" stroke="#4A2800" strokeWidth="3.5" strokeLinecap="round" />
    {/* Leaf */}
    <path d="M 54 20 C 66 12, 74 18, 70 24 C 62 25, 56 22, 54 20 Z" fill="url(#appleLeaf)" />
  </svg>
);
export const AppleItem = AppleFruit;

// 4. Toy Building Block (مكعب بناء) - friendly 3D isometric toy block
export const ToyBlock: React.FC<AssetProps & { color?: 'blue' | 'yellow' | 'red' | 'green' }> = ({
  className = '',
  size = 80,
  color = 'blue'
}) => {
  const themes = {
    blue: { top: '#6DD4FF', left: '#26B7FF', right: '#0C83C2', dot: '#FFFFFF' },
    yellow: { top: '#FFF375', left: '#FDE700', right: '#D9C400', dot: '#FFFFFF' },
    red: { top: '#FF7B7F', left: '#F23D44', right: '#B8181F', dot: '#FFFFFF' },
    green: { top: '#76E563', left: '#38C120', right: '#1F8C0C', dot: '#FFFFFF' },
  }[color];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-md select-none pointer-events-none ${className}`}
    >
      <polygon points="50,92 84,74 50,56 16,74" fill="rgba(0,0,0,0.18)" />
      {/* Top face */}
      <polygon points="50,16 82,32 50,48 18,32" fill={themes.top} />
      {/* Left face */}
      <polygon points="18,32 50,48 50,82 18,66" fill={themes.left} />
      {/* Right face */}
      <polygon points="50,48 82,32 82,66 50,82" fill={themes.right} />
      {/* Top toy peg */}
      <ellipse cx="50" cy="32" rx="10" ry="5" fill={themes.left} />
      <ellipse cx="50" cy="30" rx="10" ry="5" fill="#FFFFFF" opacity="0.5" />
    </svg>
  );
};

// 5. Football (كرة قدم) - classic modern soccer ball
export const FootballItem: React.FC<AssetProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-md select-none pointer-events-none ${className}`}
  >
    <defs>
      <radialGradient id="ballGlow" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="70%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </radialGradient>
    </defs>
    <ellipse cx="50" cy="88" rx="34" ry="6" fill="rgba(0,0,0,0.2)" />
    <circle cx="50" cy="50" r="35" fill="url(#ballGlow)" stroke="#475569" strokeWidth="2" />
    {/* Center pentagon */}
    <polygon points="50,38 60,46 56,58 44,58 40,46" fill="#1E293B" />
    {/* Surrounding seams & patches */}
    <line x1="50" y1="38" x2="50" y2="22" stroke="#1E293B" strokeWidth="2" />
    <line x1="60" y1="46" x2="74" y2="40" stroke="#1E293B" strokeWidth="2" />
    <line x1="56" y1="58" x2="68" y2="70" stroke="#1E293B" strokeWidth="2" />
    <line x1="44" y1="58" x2="32" y2="70" stroke="#1E293B" strokeWidth="2" />
    <line x1="40" y1="46" x2="26" y2="40" stroke="#1E293B" strokeWidth="2" />
    {/* Corner patches */}
    <polygon points="46,18 54,18 52,24 48,24" fill="#1E293B" />
    <polygon points="76,36 82,42 78,48 72,44" fill="#1E293B" />
    <polygon points="70,68 76,74 70,80 64,74" fill="#1E293B" />
    <polygon points="30,68 24,74 30,80 36,74" fill="#1E293B" />
    <polygon points="24,36 18,42 22,48 28,44" fill="#1E293B" />
    {/* Soft highlight */}
    <ellipse cx="38" cy="34" rx="10" ry="5" transform="rotate(-30 38 34)" fill="#FFFFFF" opacity="0.6" />
  </svg>
);

// 6. Toy Car (سيارة صغيرة) - cute modern toddler toy car
export const ToyCarItem: React.FC<AssetProps & { color?: 'blue' | 'red' | 'yellow' | 'green' }> = ({
  className = '',
  size = 85,
  color = 'blue'
}) => {
  const theme = {
    blue: { body: '#26B7FF', stroke: '#0284C7', roof: '#E0F2FE' },
    red: { body: '#F43F5E', stroke: '#BE123C', roof: '#FFE4E6' },
    yellow: { body: '#FBBF24', stroke: '#B45309', roof: '#FEF9C3' },
    green: { body: '#10B981', stroke: '#047857', roof: '#D1FAE5' },
  }[color];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 110 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-md select-none pointer-events-none ${className}`}
    >
      <ellipse cx="55" cy="74" rx="45" ry="5" fill="rgba(0,0,0,0.18)" />
      {/* Car body */}
      <path
        d="M 12 50 C 12 44, 18 42, 28 42 L 36 42 L 44 22 C 46 18, 52 16, 68 16 L 78 16 C 86 16, 92 24, 96 36 L 98 44 C 102 44, 106 48, 106 54 L 106 58 C 106 62, 102 64, 96 64 L 14 64 C 12 64, 12 56, 12 50 Z"
        fill={theme.body}
      />
      {/* Roof & Window */}
      <path
        d="M 46 22 L 66 22 C 74 22, 80 26, 84 38 L 42 38 Z"
        fill={theme.roof}
        stroke={theme.stroke}
        strokeWidth="1.5"
      />
      {/* Front headlight */}
      <circle cx="102" cy="52" r="4" fill="#FDE700" />
      {/* Left Wheel */}
      <circle cx="34" cy="62" r="13" fill="#1E293B" />
      <circle cx="34" cy="62" r="7" fill="#FDE700" />
      <circle cx="34" cy="62" r="3" fill="#FFFFFF" />
      {/* Right Wheel */}
      <circle cx="82" cy="62" r="13" fill="#1E293B" />
      <circle cx="82" cy="62" r="7" fill="#FDE700" />
      <circle cx="82" cy="62" r="3" fill="#FFFFFF" />
    </svg>
  );
};

// 7. Golden Star (نجمة ذهبية)
export const StarItem: React.FC<AssetProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-md select-none pointer-events-none ${className}`}
  >
    <defs>
      <radialGradient id="starGrad3D" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFF9A6" />
        <stop offset="35%" stopColor="#FDE047" />
        <stop offset="75%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#CA8A04" />
      </radialGradient>
    </defs>
    <ellipse cx="50" cy="90" rx="32" ry="6" fill="rgba(0,0,0,0.18)" />
    <polygon
      points="50,10 62,35 90,39 69,59 74,86 50,73 26,86 31,59 10,39 38,35"
      fill="url(#starGrad3D)"
      stroke="#B45309"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <ellipse cx="40" cy="36" rx="8" ry="4" transform="rotate(-25 40 36)" fill="#FFFFFF" opacity="0.65" />
  </svg>
);

// 8. Cheerful Balloon (بالون تعليمي)
export const BalloonItem: React.FC<AssetProps & { color?: 'red' | 'blue' | 'yellow' | 'green' | 'purple' }> = ({
  className = '',
  size = 80,
  color = 'red'
}) => {
  const themes = {
    red: { body: '#EF4444', shadow: '#991B1B', highlight: '#FCA5A5' },
    blue: { body: '#3B82F6', shadow: '#1D4ED8', highlight: '#93C5FD' },
    yellow: { body: '#FBBF24', shadow: '#B45309', highlight: '#FEF08A' },
    green: { body: '#10B981', shadow: '#047857', highlight: '#A7F3D0' },
    purple: { body: '#A855F7', shadow: '#6B21A8', highlight: '#E9D5FF' },
  }[color];

  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 100 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-md select-none pointer-events-none ${className}`}
    >
      <defs>
        <radialGradient id={`balloonGrad-${color}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor={themes.highlight} />
          <stop offset="60%" stopColor={themes.body} />
          <stop offset="100%" stopColor={themes.shadow} />
        </radialGradient>
      </defs>
      {/* Balloon string */}
      <path d="M 50 85 Q 46 95 54 105 Q 46 115 50 125" stroke="#94A3B8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Balloon Knot */}
      <polygon points="45,86 55,86 50,81" fill={themes.shadow} />
      {/* Main Oval Body */}
      <ellipse cx="50" cy="46" rx="36" ry="42" fill={`url(#balloonGrad-${color})`} />
      {/* Specular Highlight */}
      <ellipse cx="36" cy="30" rx="9" ry="16" transform="rotate(-30 36 30)" fill="#FFFFFF" opacity="0.6" />
    </svg>
  );
};

// 7. Coloring Pencil (قلم تلوين كبير وواضح للصف الأول - أصفر قياسي)
export const PencilItem: React.FC<AssetProps & { color?: 'blue' | 'yellow' | 'red' | 'green' | 'purple' }> = ({
  className = '',
  size = 90,
  color = 'yellow',
}) => {
  const themes = {
    yellow: { shaft: '#FDE047', shadow: '#EAB308', tip: '#CA8A04' },
    blue: { shaft: '#26B7FF', shadow: '#0284C7', tip: '#0369A1' },
    red: { shaft: '#F87171', shadow: '#EF4444', tip: '#B91C1C' },
    green: { shaft: '#34D399', shadow: '#10B981', tip: '#047857' },
    purple: { shaft: '#C084FC', shadow: '#9333EA', tip: '#6B21A8' },
  }[color];

  const w = size * 0.42;
  const h = size;

  return (
    <div className={`relative inline-flex flex-col items-center select-none pointer-events-none ${className}`}>
      <svg
        width={w}
        height={h}
        viewBox="0 0 46 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        <defs>
          <linearGradient id={`pBody-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={themes.shaft} />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor={themes.shadow} />
          </linearGradient>
          <linearGradient id="pEraser" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
          <linearGradient id="pFerrule" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="pWood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Soft shadow at base */}
        <ellipse cx="23" cy="136" rx="16" ry="3.5" fill="rgba(0,0,0,0.2)" />

        {/* 1. Pink Eraser at Top */}
        <path d="M 10 16 C 10 6, 36 6, 36 16 L 36 22 L 10 22 Z" fill="url(#pEraser)" />

        {/* 2. Metal Ferrule Band */}
        <rect x="9" y="22" width="28" height="12" rx="2" fill="url(#pFerrule)" stroke="#64748B" strokeWidth="1" />
        <line x1="10" y1="26" x2="36" y2="26" stroke="#64748B" strokeWidth="1" strokeDasharray="2 1" />
        <line x1="10" y1="30" x2="36" y2="30" stroke="#64748B" strokeWidth="1" strokeDasharray="2 1" />

        {/* 3. Main Hexagonal Pencil Body */}
        <rect x="10" y="34" width="26" height="66" fill={themes.shaft} />
        <rect x="10" y="34" width="26" height="66" fill={`url(#pBody-${color})`} />
        {/* Hexagonal facet line */}
        <line x1="18" y1="34" x2="18" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <line x1="28" y1="34" x2="28" y2="100" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />

        {/* 4. Sharpened Wood Cone */}
        <polygon points="10,100 36,100 23,128" fill="url(#pWood)" stroke="#B45309" strokeWidth="0.75" />

        {/* 5. Colored Lead Tip */}
        <polygon points="18,118 28,118 23,128" fill={themes.tip} />
      </svg>
    </div>
  );
};

// 8. Children's Book (كتاب أطفال)
export const BookItem: React.FC<AssetProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-md select-none pointer-events-none ${className}`}
  >
    <ellipse cx="50" cy="85" rx="36" ry="6" fill="rgba(0,0,0,0.18)" />
    {/* Pages */}
    <path d="M 22 30 L 78 30 L 78 72 L 22 72 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
    {/* Cover */}
    <path
      d="M 18 26 C 24 24, 76 24, 82 26 L 82 72 C 76 70, 24 70, 18 72 Z"
      fill="#10B981"
      stroke="#059669"
      strokeWidth="2.5"
    />
    {/* Spine */}
    <rect x="16" y="26" width="8" height="46" rx="3" fill="#047857" />
    {/* Star emblem on cover */}
    <polygon points="52,42 54,48 60,48 55,52 57,58 52,54 47,58 49,52 44,48 50,48" fill="#FDE700" />
  </svg>
);

// 9. Handwoven Wicker Basket (سلة خوص)
export const WickerBasket: React.FC<AssetProps & { children?: React.ReactNode; label?: string }> = ({
  className = '',
  size = 180,
  children,
  label
}) => (
  <div className={`relative flex flex-col items-center select-none ${className}`} style={{ width: size }}>
    {/* Floating Items inside / on top of basket */}
    <div className="absolute -top-12 z-20 flex flex-wrap justify-center items-center w-full px-2 gap-1 min-h-[70px]">
      {children}
    </div>
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <linearGradient id="basketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DEB887" />
          <stop offset="50%" stopColor="#C68A4C" />
          <stop offset="100%" stopColor="#8C531B" />
        </linearGradient>
      </defs>
      {/* Basket shadow */}
      <ellipse cx="80" cy="94" rx="65" ry="6" fill="rgba(0,0,0,0.2)" />
      {/* Basket Body */}
      <path
        d="M 22 34 L 38 88 C 42 92, 118 92, 122 88 L 138 34 C 140 28, 20 28, 22 34 Z"
        fill="url(#basketGrad)"
      />
      {/* Weave pattern lines */}
      <path d="M 28 44 Q 80 52 132 44" stroke="#68390E" strokeWidth="2.5" fill="none" opacity="0.4" />
      <path d="M 32 60 Q 80 68 128 60" stroke="#68390E" strokeWidth="2.5" fill="none" opacity="0.4" />
      <path d="M 36 76 Q 80 84 124 76" stroke="#68390E" strokeWidth="2.5" fill="none" opacity="0.4" />
      <path d="M 50 34 L 54 88" stroke="#68390E" strokeWidth="2" fill="none" opacity="0.3" />
      <path d="M 80 34 L 80 89" stroke="#68390E" strokeWidth="2" fill="none" opacity="0.3" />
      <path d="M 110 34 L 106 88" stroke="#68390E" strokeWidth="2" fill="none" opacity="0.3" />
      {/* Rim */}
      <ellipse cx="80" cy="34" rx="58" ry="8" fill="#F5DEB3" stroke="#8C531B" strokeWidth="3" />
    </svg>
    {label && (
      <div className="mt-1 bg-white/95 px-4 py-0.5 rounded-full shadow-md border-2 border-amber-300 font-bold text-slate-800 text-lg">
        {label}
      </div>
    )}
  </div>
);

// 10. Ceramic Plate (صحن خزفي)
export const CeramicPlate: React.FC<AssetProps & { children?: React.ReactNode }> = ({
  className = '',
  size = 220,
  children
}) => (
  <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size * 0.65 }}>
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 200 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 drop-shadow-xl"
    >
      <defs>
        <radialGradient id="plateGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </radialGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="100" cy="98" rx="88" ry="16" fill="rgba(0,0,0,0.18)" />
      {/* Outer Rim */}
      <ellipse cx="100" cy="65" rx="90" ry="38" fill="url(#plateGrad)" stroke="#94A3B8" strokeWidth="2" />
      {/* Blue decorative border line */}
      <ellipse cx="100" cy="65" rx="82" ry="32" stroke="#26B7FF" strokeWidth="3" strokeDasharray="6 4" fill="none" />
      {/* Inner recess */}
      <ellipse cx="100" cy="65" rx="68" ry="24" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
    </svg>
    {/* Plate contents */}
    <div className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </div>
  </div>
);

// 11. Friendly Supporting Character: Fahad (فهد)
export const CharacterFahad: React.FC<{ size?: number; mood?: 'happy' | 'cheering' | 'waving' }> = ({
  size = 140,
  mood = 'happy'
}) => (
  <svg
    width={size}
    height={size * 1.3}
    viewBox="0 0 120 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-md select-none pointer-events-none"
  >
    {/* Body / T-shirt (cheerful blue & yellow) */}
    <path d="M 36 100 L 84 100 L 92 150 L 28 150 Z" fill="#26B7FF" rx="8" />
    <path d="M 48 100 L 72 100 L 70 150 L 50 150 Z" fill="#FDE700" />
    {/* Collar */}
    <path d="M 46 98 Q 60 108 74 98" stroke="#FFFFFF" strokeWidth="4" fill="none" />
    {/* Neck */}
    <rect x="52" y="86" width="16" height="15" rx="4" fill="#F6C39B" />
    {/* Head */}
    <ellipse cx="60" cy="58" rx="28" ry="30" fill="#F6C39B" />
    {/* Hair (modern styled dark hair) */}
    <path
      d="M 32 50 C 32 30, 48 18, 60 18 C 76 18, 88 30, 88 50 C 88 54, 86 52, 84 46 C 78 36, 68 34, 58 34 C 46 34, 38 40, 32 50 Z"
      fill="#261C14"
    />
    {/* Ears */}
    <ellipse cx="32" cy="60" rx="4" ry="7" fill="#ECA97A" />
    <ellipse cx="88" cy="60" rx="4" ry="7" fill="#ECA97A" />
    {/* Friendly Eyes */}
    <ellipse cx="48" cy="56" rx="4" ry="5" fill="#1E293B" />
    <ellipse cx="72" cy="56" rx="4" ry="5" fill="#1E293B" />
    <circle cx="49" cy="54" r="1.5" fill="#FFFFFF" />
    <circle cx="73" cy="54" r="1.5" fill="#FFFFFF" />
    {/* Eyebrows */}
    <path d="M 44 48 Q 48 45 53 47" stroke="#261C14" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 67 47 Q 72 45 76 48" stroke="#261C14" strokeWidth="2.5" strokeLinecap="round" />
    {/* Cheeks */}
    <circle cx="42" cy="64" r="5" fill="#F87171" opacity="0.35" />
    <circle cx="78" cy="64" r="5" fill="#F87171" opacity="0.35" />
    {/* Big smile */}
    <path d="M 50 68 Q 60 80 70 68" stroke="#B91C1C" strokeWidth="3" fill="#FFFFFF" strokeLinecap="round" />
    {/* Waving / Cheering Arm */}
    {mood === 'cheering' || mood === 'waving' ? (
      <path d="M 84 105 Q 105 85 106 65" stroke="#F6C39B" strokeWidth="11" strokeLinecap="round" />
    ) : (
      <path d="M 84 105 Q 98 120 95 138" stroke="#F6C39B" strokeWidth="10" strokeLinecap="round" />
    )}
    <path d="M 36 105 Q 22 120 25 138" stroke="#F6C39B" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

// 12. Friendly Supporting Character: Amal (أمل)
export const CharacterAmal: React.FC<{ size?: number; mood?: 'happy' | 'cheering' }> = ({
  size = 140,
  mood = 'happy'
}) => (
  <svg
    width={size}
    height={size * 1.3}
    viewBox="0 0 120 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-md select-none pointer-events-none"
  >
    {/* Dress / Top (gentle coral & cream) */}
    <path d="M 34 100 L 86 100 L 96 152 L 24 152 Z" fill="#FB7185" rx="8" />
    <circle cx="60" cy="116" r="4" fill="#FFFFFF" />
    <circle cx="60" cy="130" r="4" fill="#FFFFFF" />
    {/* Neck */}
    <rect x="52" y="86" width="16" height="15" rx="4" fill="#F6C39B" />
    {/* Head */}
    <ellipse cx="60" cy="58" rx="28" ry="30" fill="#F6C39B" />
    {/* Hair with cute side ponytail / headband */}
    <path
      d="M 30 54 C 30 28, 50 16, 60 16 C 74 16, 90 28, 90 54 C 90 60, 86 52, 84 46 C 76 34, 66 32, 56 32 C 44 32, 36 38, 30 54 Z"
      fill="#2B1A0E"
    />
    <path d="M 30 40 Q 60 30 90 40" stroke="#FDE700" strokeWidth="5" fill="none" />
    <circle cx="86" cy="36" r="7" fill="#26B7FF" />
    {/* Hair curls on sides */}
    <ellipse cx="30" cy="58" rx="7" ry="16" fill="#2B1A0E" />
    <ellipse cx="90" cy="58" rx="7" ry="16" fill="#2B1A0E" />
    {/* Eyes */}
    <ellipse cx="48" cy="56" rx="4.5" ry="5.5" fill="#1E293B" />
    <ellipse cx="72" cy="56" rx="4.5" ry="5.5" fill="#1E293B" />
    <circle cx="49" cy="54" r="1.5" fill="#FFFFFF" />
    <circle cx="73" cy="54" r="1.5" fill="#FFFFFF" />
    {/* Eyebrows */}
    <path d="M 44 47 Q 48 44 52 46" stroke="#2B1A0E" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M 68 46 Q 72 44 76 47" stroke="#2B1A0E" strokeWidth="2.2" strokeLinecap="round" />
    {/* Rosy Cheeks */}
    <circle cx="42" cy="65" r="5.5" fill="#F43F5E" opacity="0.38" />
    <circle cx="78" cy="65" r="5.5" fill="#F43F5E" opacity="0.38" />
    {/* Smile */}
    <path d="M 50 68 Q 60 79 70 68" stroke="#BE123C" strokeWidth="3" fill="#FFFFFF" strokeLinecap="round" />
    {/* Arms */}
    {mood === 'cheering' ? (
      <path d="M 34 104 Q 15 84 14 66" stroke="#F6C39B" strokeWidth="10" strokeLinecap="round" />
    ) : (
      <path d="M 34 104 Q 20 120 22 136" stroke="#F6C39B" strokeWidth="10" strokeLinecap="round" />
    )}
    <path d="M 86 104 Q 100 120 98 136" stroke="#F6C39B" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

// Unified Counting Object Type
export type CountingObjectType =
  | 'date'
  | 'orange'
  | 'apple'
  | 'block'
  | 'football'
  | 'car'
  | 'pencil'
  | 'book'
  | 'star'
  | 'balloon';

export interface CountingObjectProps {
  type: CountingObjectType;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

// 13. Unified Counting Object Component
export const CountingObject: React.FC<CountingObjectProps> = ({
  type,
  size = 'md',
  color,
  className = '',
}) => {
  const pixelSize =
    typeof size === 'number'
      ? size
      : size === 'sm'
      ? 55
      : size === 'md'
      ? 80
      : size === 'lg'
      ? 105
      : 130;

  switch (type) {
    case 'date':
      return <DateFruit size={pixelSize} className={className} />;
    case 'orange':
      return <OrangeFruit size={pixelSize} className={className} />;
    case 'apple':
      return <AppleFruit size={pixelSize} className={className} />;
    case 'block':
      return (
        <ToyBlock
          size={pixelSize}
          color={(color as 'blue' | 'yellow' | 'red' | 'green') || 'yellow'}
          className={className}
        />
      );
    case 'football':
      return <FootballItem size={pixelSize} className={className} />;
    case 'car':
      return (
        <ToyCarItem
          size={pixelSize}
          color={(color as 'blue' | 'red' | 'yellow' | 'green') || 'blue'}
          className={className}
        />
      );
    case 'pencil':
      return <PencilItem size={pixelSize} className={className} />;
    case 'book':
      return <AppleItem size={pixelSize} className={className} />;
    case 'star':
      return <StarItem size={pixelSize} className={className} />;
    case 'balloon':
      return (
        <BalloonItem
          size={pixelSize}
          color={(color as 'red' | 'blue' | 'yellow' | 'green' | 'purple') || 'red'}
          className={className}
        />
      );
    default:
      return <DateFruit size={pixelSize} className={className} />;
  }
};

// 14. Reusable Group Layout for Mathematical Counting
export interface CountingGroupProps {
  type: CountingObjectType;
  count: number;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  arrangement?: 'row' | 'grid' | 'circle' | 'scatter';
  className?: string;
  itemClassName?: string | ((index: number) => string);
  onItemClick?: (index: number) => void;
  colors?: string[];
}

export const CountingGroup: React.FC<CountingGroupProps> = ({
  type,
  count,
  size = 'md',
  arrangement = 'row',
  className = '',
  itemClassName = '',
  onItemClick,
  colors,
}) => {
  const arrangementClasses = {
    row: 'flex flex-row items-center justify-center gap-5 flex-wrap',
    grid: 'grid grid-cols-3 gap-5 place-items-center',
    circle: 'flex items-center justify-center gap-4 flex-wrap max-w-sm',
    scatter: 'flex flex-wrap items-center justify-center gap-6 max-w-md',
  }[arrangement];

  return (
    <div className={`${arrangementClasses} ${className}`} dir="ltr">
      {Array.from({ length: count }).map((_, idx) => {
        const customClass =
          typeof itemClassName === 'function'
            ? (itemClassName as (index: number) => string)(idx)
            : itemClassName;
        const color = colors ? colors[idx % colors.length] : undefined;

        return (
          <div
            key={idx}
            onClick={() => onItemClick && onItemClick(idx)}
            className={`transition-all duration-300 ${customClass}`}
          >
            <CountingObject type={type} size={size} color={color} />
          </div>
        );
      })}
    </div>
  );
};

// Backward-compatible alias for existing components
export const LearningObject: React.FC<{
  type: CountingObjectType;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: string;
}> = ({ type, size = 70, className = '', color }) => {
  return <CountingObject type={type} size={size} className={className} color={color} />;
};

// 13. Horizontal School Pencil Case (مِقْلَمَة مدرسية مفتوحة)
// Grade-1 recognizable, open zipper, 51Talk-compatible cheerful blue & yellow colors
export const PencilCase: React.FC<AssetProps & { children?: React.ReactNode; label?: string; count?: number }> = ({
  className = '',
  size = 320,
  children,
  label,
  count,
}) => {
  const height = size * 0.55;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`} style={{ width: size }}>
      <div className="relative w-full" style={{ height }}>
        {/* Soft Drop Shadow under case */}
        <div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[90%] h-7 bg-black/20 blur-md rounded-full"
        />

        {/* Pencil Case Outer Body (SVG with 3D gradient, stitches, open zipper) */}
        <svg
          width={size}
          height={height}
          viewBox="0 0 240 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full drop-shadow-xl"
        >
          <defs>
            <linearGradient id="pCaseMain" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="pCaseInterior" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="pCasePocket" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
          </defs>

          {/* Back Wall of Open Case */}
          <rect x="18" y="24" width="204" height="96" rx="28" fill="url(#pCaseMain)" stroke="#0369A1" strokeWidth="3" />
          
          {/* Deep Open Interior Cavity where pencils sit */}
          <ellipse cx="120" cy="50" rx="90" ry="24" fill="url(#pCaseInterior)" stroke="#0284C7" strokeWidth="2" />

          {/* Golden Zipper Teeth along opening rim */}
          <path
            d="M 32 48 Q 120 72 208 48"
            stroke="#FDE047"
            strokeWidth="4"
            strokeDasharray="4 3"
            fill="none"
          />

          {/* Front Curved Lip / Front Pocket */}
          <path
            d="M 18 52 Q 120 78 222 52 L 222 96 C 222 112 206 120 190 120 L 50 120 C 34 120 18 112 18 96 Z"
            fill="url(#pCaseMain)"
            stroke="#0284C7"
            strokeWidth="3"
          />

          {/* Cheerful Yellow Accent Stripe with Star */}
          <path
            d="M 18 78 Q 120 98 222 78 L 222 94 Q 120 114 18 94 Z"
            fill="url(#pCasePocket)"
          />
          <polygon points="120,86 123,93 130,93 124,98 126,105 120,100 114,105 116,98 110,93 117,93" fill="#FFFFFF" />

          {/* Decorative Zipper Pull Tab hanging off left corner */}
          <g transform="translate(24, 46)">
            <circle cx="0" cy="0" r="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
            <rect x="-3" y="4" width="6" height="16" rx="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
            <circle cx="0" cy="14" r="1.5" fill="#CA8A04" />
          </g>
        </svg>

        {/* Pencils Resting Visibly Inside the Open Zippered Case */}
        <div className="absolute inset-x-6 top-2 h-20 flex items-center justify-center gap-2 z-10 px-4">
          {children ? (
            children
          ) : count !== undefined ? (
            Array.from({ length: count }).map((_, idx) => (
              <div
                key={idx}
                className="transform transition-transform duration-300 animate-bounce"
                style={{ transform: `rotate(${(idx - (count - 1) / 2) * 8}deg)` }}
              >
                <PencilItem size={65} />
              </div>
            ))
          ) : null}
        </div>
      </div>

      {/* Case Label / Count Display */}
      {label && (
        <div className="mt-2 bg-white/95 px-5 py-1 rounded-full shadow-lg border-2 border-amber-300 font-black text-slate-800 text-lg font-['Tajawal']">
          {label}
        </div>
      )}
    </div>
  );
};

// 14. Toy Storage Box (صندوق الألعاب) - For Building Blocks
export const ToyBox: React.FC<AssetProps & { children?: React.ReactNode; label?: string; count?: number }> = ({
  className = '',
  size = 300,
  children,
  label,
  count,
}) => {
  const height = size * 0.65;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`} style={{ width: size }}>
      <div className="relative w-full" style={{ height }}>
        {/* Shadow */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/20 blur-md rounded-full" />

        {/* Toy Box SVG */}
        <svg
          width={size}
          height={height}
          viewBox="0 0 220 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full drop-shadow-xl"
        >
          <defs>
            <linearGradient id="toyBoxBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="toyBoxInner" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>

          {/* Back wall of container */}
          <rect x="20" y="20" width="180" height="100" rx="16" fill="url(#toyBoxBody)" />
          {/* Inner cavity */}
          <rect x="28" y="24" width="164" height="46" rx="8" fill="url(#toyBoxInner)" />

          {/* Front Wall */}
          <path
            d="M 20 54 L 20 114 C 20 124 28 130 38 130 L 182 130 C 192 130 200 124 200 114 L 200 54 Z"
            fill="url(#toyBoxBody)"
            stroke="#0369A1"
            strokeWidth="3"
          />

          {/* Front decorative toy emblem */}
          <circle cx="110" cy="92" r="22" fill="#FDE700" stroke="#F59E0B" strokeWidth="2.5" />
          {/* Star on emblem */}
          <polygon points="110,78 114,87 124,87 116,93 119,102 110,96 101,102 104,93 96,87 106,87" fill="#F59E0B" />

          {/* Handles */}
          <rect x="10" y="66" width="12" height="24" rx="6" fill="#FDE700" stroke="#F59E0B" strokeWidth="2" />
          <rect x="198" y="66" width="12" height="24" rx="6" fill="#FDE700" stroke="#F59E0B" strokeWidth="2" />
        </svg>

        {/* Blocks visibly contained inside */}
        <div className="absolute inset-x-8 top-1 h-20 flex items-center justify-center gap-2 z-10 px-2">
          {children ? (
            children
          ) : count !== undefined ? (
            Array.from({ length: count }).map((_, idx) => (
              <div key={idx} className="animate-bounce">
                <ToyBlock size={50} color={(['red', 'blue', 'yellow', 'green'] as const)[idx % 4]} />
              </div>
            ))
          ) : null}
        </div>
      </div>

      {label && (
        <div className="mt-2 bg-white/95 px-5 py-1 rounded-full shadow-lg border-2 border-amber-300 font-black text-slate-800 text-lg font-['Tajawal']">
          {label}
        </div>
      )}
    </div>
  );
};

// 15. Semantic Container Mapping & Resolver
export type SemanticContainerType =
  | 'fruit_basket'
  | 'pencil_case'
  | 'toy_box'
  | 'parking_bay'
  | 'bookshelf'
  | 'plate';

export const getSemanticContainer = (objectType: CountingObjectType): SemanticContainerType => {
  switch (objectType) {
    case 'orange':
    case 'apple':
      return 'fruit_basket';
    case 'date':
      return 'plate';
    case 'pencil':
      return 'pencil_case';
    case 'block':
      return 'toy_box';
    case 'car':
      return 'parking_bay';
    case 'book':
      return 'bookshelf';
    default:
      return 'fruit_basket';
  }
};

