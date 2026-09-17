import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface LessonCanvasProps {
  children: React.ReactNode;
}

export const CANVAS_WIDTH = 1920;
export const CANVAS_HEIGHT = 1080;

export const LessonCanvas: React.FC<LessonCanvasProps> = ({ children }) => {
  const { dir } = useLanguage();
  const [scale, setScale] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Scale to fit 1920x1080 proportionally
      const scaleX = windowWidth / CANVAS_WIDTH;
      const scaleY = windowHeight / CANVAS_HEIGHT;
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#0F172A] select-none"
      dir={dir}
    >
      {/* Scaled 16:9 viewport */}
      <div
        id="teaching-canvas-16-9"
        style={{
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
        className="relative overflow-hidden bg-gradient-to-b from-[#F0F9FF] via-[#FEFCE8] to-[#FFFBEB] shadow-2xl flex flex-col justify-between"
      >
        {children}
      </div>
    </div>
  );
};
