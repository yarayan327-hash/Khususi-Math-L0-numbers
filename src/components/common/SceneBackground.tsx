import React from 'react';

interface SceneBackgroundProps {
  theme?:
    | 'courtyard'
    | 'fruit_shop'
    | 'playground'
    | 'garden_path'
    | 'playroom'
    | 'parking_road'
    | 'study_desk'
    | 'snack_table'
    | 'celebration';
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ theme = 'courtyard' }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Base Atmospheric Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#BAE6FD] via-[#FEF9C3] to-[#FEF3C7]" />

      {/* 2. Soft Ambient Sunbeams */}
      <div className="absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#FDE700]/50 via-[#F59E0B]/20 to-transparent blur-3xl animate-sunbeam" />
      <div className="absolute top-0 right-36 w-36 h-[600px] bg-gradient-to-b from-white/25 via-white/5 to-transparent transform -rotate-25 blur-xl pointer-events-none" />

      {/* 3. High Floating Ambient Clouds (Kept strictly at top edge, out of teaching zones) */}
      <div className="absolute top-6 left-16 w-48 h-12 bg-white/70 rounded-full blur-xs animate-float-slow" />
      <div
        className="absolute top-8 right-64 w-56 h-14 bg-white/60 rounded-full blur-xs animate-float-slow"
        style={{ animationDelay: '-2.5s' }}
      />

      {/* 4. Themed Contextual Environments */}
      {theme === 'fruit_shop' ? (
        <>
          {/* Top Fruit Shop Awning */}
          <div className="absolute top-0 inset-x-0 h-24 flex shadow-xl z-10">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-full rounded-b-xl border-b-4 border-amber-300 ${
                  i % 2 === 0
                    ? 'bg-gradient-to-b from-[#0284C7] to-[#26B7FF]'
                    : 'bg-gradient-to-b from-[#F59E0B] to-[#FDE700]'
                }`}
              />
            ))}
          </div>

          {/* Hanging Brass Shop Lantern */}
          <div className="absolute top-24 left-24 flex flex-col items-center animate-sway-gentle">
            <div className="w-1 h-16 bg-amber-900" />
            <div className="w-10 h-14 bg-gradient-to-b from-amber-700 via-yellow-400 to-amber-900 rounded-2xl shadow-lg border-2 border-amber-300" />
          </div>

          {/* Solid Wooden Shop Counter Plane at Bottom */}
          <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#78350F] via-[#92400E] to-[#B45309] border-t-8 border-[#F59E0B] shadow-2xl">
            <div className="w-full h-full flex flex-col justify-around px-12 opacity-30">
              <div className="border-b-4 border-amber-950" />
              <div className="border-b-4 border-amber-950" />
            </div>
          </div>
        </>
      ) : theme === 'playground' ? (
        <>
          {/* OUTDOOR PLAYGROUND / SOCCER AREA */}
          {/* Distant palm tree silhouette and low perimeter fence */}
          <div className="absolute bottom-60 inset-x-0 h-16 flex items-end justify-between px-20 opacity-40">
            <div className="w-48 h-8 border-b-4 border-dashed border-emerald-700" />
            <div className="w-64 h-8 border-b-4 border-dashed border-emerald-700" />
          </div>

          {/* Soccer Goal frame on left */}
          <div className="absolute bottom-52 left-16 w-56 h-48 border-8 border-white rounded-t-3xl shadow-md flex items-end">
            <div className="w-full h-full border-r-4 border-b-4 border-dashed border-white/60" />
          </div>

          {/* Wooden park bench on right */}
          <div className="absolute bottom-56 right-20 flex flex-col items-center opacity-85">
            <div className="w-44 h-6 bg-[#92400E] rounded-md shadow-md border-b-2 border-[#78350F]" />
            <div className="w-40 h-5 bg-[#B45309] rounded-md mt-1" />
            <div className="flex justify-between w-36 mt-1">
              <div className="w-4 h-12 bg-slate-700 rounded-xs" />
              <div className="w-4 h-12 bg-slate-700 rounded-xs" />
            </div>
          </div>

          {/* Lush Green Playground Turf Plane */}
          <div className="absolute bottom-0 inset-x-0 h-60 bg-gradient-to-t from-[#047857] via-[#059669] to-[#10B981] border-t-8 border-[#34D399] shadow-2xl">
            {/* White Field lines */}
            <div className="absolute top-10 inset-x-32 h-1 bg-white/40" />
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-48 h-24 border-4 border-white/40 rounded-t-full" />
          </div>
        </>
      ) : theme === 'garden_path' ? (
        <>
          {/* SUNNY GARDEN NUMBER PATH */}
          {/* Distant rolling hills */}
          <div className="absolute bottom-48 inset-x-0 h-40 bg-emerald-200/40 rounded-t-[500px]" />
          <div className="absolute bottom-40 inset-x-32 h-44 bg-emerald-300/40 rounded-t-[400px]" />

          {/* Stepping Path Lawn */}
          <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#15803D] via-[#16A34A] to-[#22C55E] border-t-8 border-[#4ADE80] shadow-2xl">
            {/* Soft garden path curve */}
            <div className="absolute inset-x-12 bottom-12 h-36 rounded-full bg-amber-100/40 border-4 border-dashed border-amber-200/60 shadow-inner" />
          </div>
        </>
      ) : theme === 'parking_road' ? (
        <>
          {/* TOY CAR PLAY MAT / PARKING ROAD */}
          {/* Play city background buildings */}
          <div className="absolute bottom-60 inset-x-28 h-40 flex justify-around items-end opacity-40">
            <div className="w-24 h-32 bg-sky-300 rounded-t-2xl" />
            <div className="w-28 h-44 bg-amber-300 rounded-t-2xl" />
            <div className="w-24 h-28 bg-emerald-300 rounded-t-2xl" />
            <div className="w-32 h-36 bg-indigo-300 rounded-t-2xl" />
          </div>

          {/* Road Surface Plane with Parking bays */}
          <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#1E293B] via-[#334155] to-[#475569] border-t-8 border-yellow-400 shadow-2xl">
            {/* Road markings */}
            <div className="w-full h-8 border-b-4 border-dashed border-yellow-300/80 mt-3" />
          </div>
        </>
      ) : theme === 'study_desk' ? (
        <>
          {/* CHILDREN'S STUDY DESK */}
          {/* Pastel Room Wall with soft calendar/art hanging high */}
          <div className="absolute top-16 right-36 w-36 h-48 bg-white/80 rounded-2xl border-4 border-sky-200 shadow-sm p-3 flex flex-col items-center">
            <div className="w-full h-6 bg-sky-400 rounded-md" />
            <div className="grid grid-cols-4 gap-1.5 mt-3 w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-5 h-4 bg-slate-200 rounded-xs" />
              ))}
            </div>
          </div>

          {/* Polished Pine Wooden Desk Plane */}
          <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#B45309] via-[#D97706] to-[#F59E0B] border-t-8 border-[#FDE68A] shadow-2xl">
            {/* Open learning notebook on left of desk */}
            <div className="absolute bottom-8 left-20 w-56 h-44 bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-4 transform -rotate-3 opacity-90">
              <div className="w-full h-3 border-b border-sky-300" />
              <div className="w-full h-3 border-b border-sky-300 mt-2" />
              <div className="w-full h-3 border-b border-sky-300 mt-2" />
              <div className="w-full h-3 border-b border-sky-300 mt-2" />
            </div>
          </div>
        </>
      ) : theme === 'playroom' ? (
        <>
          {/* CHILDREN'S PLAYROOM (Clean, no decorative shape boards) */}
          {/* Large Arched Window in High Background */}
          <div className="absolute top-12 left-28 w-64 h-60 rounded-t-full border-6 border-white bg-gradient-to-b from-sky-200 to-sky-100 shadow-inner overflow-hidden flex items-end justify-center">
            <div className="w-full h-16 bg-emerald-200/50 rounded-t-full" />
          </div>

          {/* Playroom Bunting Banner */}
          <svg className="absolute top-6 inset-x-0 w-full h-20" viewBox="0 0 1920 80" fill="none">
            <path d="M 0 15 Q 480 55 960 20 Q 1440 55 1920 15" stroke="#FBBF24" strokeWidth="3" />
            {[240, 440, 640, 840, 1040, 1240, 1440, 1640].map((x, i) => {
              const colors = ['#26B7FF', '#FDE700', '#10B981', '#F43F5E', '#A855F7'];
              return (
                <polygon
                  key={i}
                  points={`${x - 16},25 ${x + 16},25 ${x},55`}
                  fill={colors[i % colors.length]}
                  opacity="0.8"
                />
              );
            })}
          </svg>

          {/* Warm Parquet Wood Floor & Circular Play Rug */}
          <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#FED7AA] to-[#FFEDD5] border-t-4 border-amber-300">
            <div className="absolute inset-x-32 bottom-8 h-48 rounded-[120px] bg-gradient-to-r from-sky-100/90 via-amber-100/90 to-emerald-100/90 border-4 border-white shadow-xl flex items-center justify-center">
              <div className="w-[85%] h-[75%] rounded-[90px] border-2 border-dashed border-sky-300 opacity-60" />
            </div>
          </div>
        </>
      ) : theme === 'snack_table' ? (
        <>
          {/* FAMILY SNACK TABLE */}
          {/* Pendant Dining Lamp */}
          <div className="absolute top-0 inset-x-0 flex justify-center">
            <div className="w-1.5 h-28 bg-amber-900" />
            <div className="absolute top-28 w-24 h-14 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-full shadow-xl border-2 border-amber-400" />
          </div>

          {/* Grand Family Wooden Table spanning bottom */}
          <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#B45309] via-[#D97706] to-[#F59E0B] border-t-8 border-[#FDE68A] shadow-2xl">
            <div className="absolute inset-x-28 top-0 h-full bg-amber-100/80 shadow-md border-x-4 border-amber-300 flex flex-col justify-evenly opacity-90">
              <div className="border-b-2 border-dashed border-amber-400" />
              <div className="border-b-2 border-dashed border-amber-400" />
            </div>
          </div>
        </>
      ) : theme === 'celebration' ? (
        <>
          {/* CELEBRATION PLAZA */}
          <svg className="absolute top-6 inset-x-0 w-full h-32" viewBox="0 0 1920 120" fill="none">
            <path d="M 0 30 Q 480 100 960 40 Q 1440 100 1920 30" stroke="#FDE700" strokeWidth="4" />
            {[140, 280, 420, 560, 700, 840, 980, 1120, 1260, 1400, 1540, 1680, 1820].map((x, idx) => (
              <circle key={idx} cx={x} cy={50 + (idx % 3) * 10} r="8" fill="#FEF08A" className="animate-pulse" />
            ))}
          </svg>

          <div className="absolute top-20 inset-x-0 flex justify-around">
            {['#26B7FF', '#FDE700', '#10B981', '#F43F5E', '#A855F7', '#FB923C', '#26B7FF'].map((c, i) => (
              <div
                key={i}
                className="w-12 h-16 rounded-b-full shadow-md animate-sway-gentle"
                style={{ backgroundColor: c, animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>

          <div className="absolute bottom-0 inset-x-0 h-60 bg-gradient-to-t from-[#0284C7] via-[#38BDF8] to-[#BAE6FD] border-t-8 border-amber-300 shadow-2xl">
            <div className="w-full h-full flex items-center justify-center opacity-40">
              <div className="w-96 h-40 rounded-full bg-white/40 blur-xl" />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* MORNING SAUDI COURTYARD (Completely clean, zero foliage overlap with numerals) */}
          <div className="absolute top-20 inset-x-0 h-64 flex justify-around items-end opacity-45 px-12">
            {[1, 2, 3, 4, 5].map((arch) => (
              <div
                key={arch}
                className="w-56 h-60 rounded-t-[110px] border-8 border-white/90 bg-amber-50/50 shadow-inner flex items-end justify-center"
              >
                <div className="w-32 h-24 bg-gradient-to-t from-sky-200/60 to-transparent rounded-t-full" />
              </div>
            ))}
          </div>

          {/* Courtyard Patio Ground - Flat, clean, non-distracting floor with NO slots or tiles */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#E2E8F0] via-[#F1F5F9] to-[#F8FAFC] border-t-4 border-amber-200/60 shadow-xs" />
        </>
      )}
    </div>
  );
};
