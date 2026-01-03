'use client';

import { LucideIcon } from 'lucide-react';

interface StatsOverviewProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function StatsOverview({ title, value, icon: Icon, color }: StatsOverviewProps) {
  return (
    <div className="bg-cyber-dark border-2 border-cyber-gray hover:border-cyber-neon/50 rounded-lg p-4 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-cyber-neon/50 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg bg-cyber-gray flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
