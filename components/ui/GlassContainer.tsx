'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState, useRef } from 'react';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  enableSpotlight?: boolean;
  enableScanline?: boolean;
  glowColor?: 'neon' | 'cyan' | 'purple' | 'none';
}

export default function GlassContainer({
  children,
  className = '',
  enableSpotlight = true,
  enableScanline = true,
  glowColor = 'none',
}: GlassContainerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !enableSpotlight) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const getBorderGlow = () => {
    switch (glowColor) {
      case 'neon':
        return 'shadow-neon';
      case 'cyan':
        return 'shadow-cyan';
      case 'purple':
        return 'shadow-purple';
      default:
        return '';
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Glass background with backdrop blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-glass" />

      {/* Animated border gradient */}
      <div
        className={`absolute inset-0 rounded-lg border border-transparent bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] animate-[border-shine_3s_ease-in-out_infinite] ${getBorderGlow()}`}
        style={{
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

      {/* Spotlight effect following cursor */}
      {enableSpotlight && (
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.08), transparent)`,
          }}
        />
      )}

      {/* Scanline overlay */}
      {enableScanline && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scanline" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
