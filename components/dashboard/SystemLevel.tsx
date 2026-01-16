'use client';

import { Habit, HabitLog } from '@/lib/types';
import { Zap } from 'lucide-react';
import GlassContainer from '@/components/ui/GlassContainer';
import TextDecoder from '@/components/ui/TextDecoder';
import { motion } from 'framer-motion';

interface SystemLevelProps {
  habits: Habit[];
  logs: HabitLog[];
}

export default function SystemLevel({ habits, logs }: SystemLevelProps) {
  const totalLevel = habits.reduce((sum, h) => sum + h.level, 0);
  const avgLevel = habits.length > 0 ? Math.floor(totalLevel / habits.length) : 0;
  
  return (
    <GlassContainer enableSpotlight={true} enableScanline={true} glowColor="neon" className="p-6">
      <div className="flex items-center gap-4">
        <motion.div 
          className="w-16 h-16 rounded bg-cyber-neon/10 border border-cyber-neon flex items-center justify-center relative"
          animate={{
            boxShadow: [
              '0 0 10px rgba(0, 255, 65, 0.5)',
              '0 0 20px rgba(0, 255, 65, 0.8)',
              '0 0 10px rgba(0, 255, 65, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Zap className="w-8 h-8 text-cyber-neon fill-cyber-neon animate-pulse-slow" />
        </motion.div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide mb-1">
            <TextDecoder text="SYSTEM LEVEL" className="text-neon-glow" />
          </h2>
          <p className="text-xs text-cyber-text-dim uppercase tracking-wider">
            COMBINED METRICS
          </p>
        </div>
      </div>
    </GlassContainer>
  );
}
