'use client';

import { useLifeOSStore } from '@/lib/store';
import { User, Trophy, Zap } from 'lucide-react';

export default function Header() {
  const { totalXP, playerLevel, habits } = useLifeOSStore();

  const totalStreaks = habits.reduce((sum, h) => sum + h.streak, 0);

  return (
    <header className="bg-cyber-dark border-b-2 border-cyber-neon/30 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Current Time */}
        <div className="text-cyber-neon/70 text-sm font-mono">
          <span className="text-cyber-neon">{'>'}</span> {new Date().toLocaleString()}
        </div>

        {/* Right: Player Stats */}
        <div className="flex items-center gap-6">
          {/* Total XP */}
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyber-blue" />
            <div>
              <p className="text-xs text-cyber-neon/50">Total XP</p>
              <p className="text-sm font-bold text-cyber-blue">{totalXP.toLocaleString()}</p>
            </div>
          </div>

          {/* Player Level */}
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-cyber-purple" />
            <div>
              <p className="text-xs text-cyber-neon/50">Level</p>
              <p className="text-sm font-bold text-cyber-purple">{playerLevel}</p>
            </div>
          </div>

          {/* Active Streaks */}
          <div className="flex items-center gap-2">
            <div className="text-2xl">🔥</div>
            <div>
              <p className="text-xs text-cyber-neon/50">Streaks</p>
              <p className="text-sm font-bold text-cyber-neon">{totalStreaks}</p>
            </div>
          </div>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-cyber-gray border-2 border-cyber-neon flex items-center justify-center">
            <User className="w-6 h-6 text-cyber-neon" />
          </div>
        </div>
      </div>
    </header>
  );
}
