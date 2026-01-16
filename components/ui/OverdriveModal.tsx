'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

interface OverdriveModalProps {
  isOpen: boolean;
  level: number;
  onClose: () => void;
}

export default function OverdriveModal({ isOpen, level, onClose }: OverdriveModalProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowContent(false);
      // Delay to show the badge after screen dims
      const timer = setTimeout(() => setShowContent(true), 300);
      
      // Auto-close after animation
      const closeTimer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dimmed overlay */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: '#000000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated rays */}
            {showContent && (
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-40 origin-center"
                    style={{
                      background: 'linear-gradient(180deg, transparent, #00ff41, transparent)',
                      transform: `rotate(${i * 30}deg)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 2],
                    }}
                    transition={{
                      duration: 1.5,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Badge container */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, rotateY: 180 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    mass: 1.5,
                  }}
                >
                  {/* Badge */}
                  <div className="relative">
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full blur-[60px]"
                      style={{
                        background: 'radial-gradient(circle, #00ff41 0%, transparent 70%)',
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 0.9, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Main badge */}
                    <div className="relative bg-gradient-to-br from-cyber-neon to-cyber-cyan rounded-full w-48 h-48 flex flex-col items-center justify-center border-4 border-white/30 shadow-neon-strong">
                      <Zap className="w-16 h-16 text-cyber-black fill-cyber-black mb-2" />
                      <div className="text-cyber-black font-bold text-4xl font-computation">
                        LVL {level}
                      </div>
                      <div className="text-cyber-black text-sm uppercase tracking-[0.3em] mt-1">
                        OVERDRIVE
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <motion.div
                    className="absolute top-2/3 mt-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="text-2xl font-bold text-neon-glow uppercase tracking-wider">
                      System Upgraded
                    </div>
                    <div className="text-cyber-text-muted text-sm uppercase tracking-widest mt-2">
                      Level {level} Achieved
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
