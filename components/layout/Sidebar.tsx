'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart3, 
  Shield, 
  Calendar, 
  Settings,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Anti-Scroll', href: '/anti-scroll', icon: Shield },
  { name: 'Planner', href: '/planner', icon: Calendar },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-cyber-dark border-r-2 border-cyber-neon/30 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b-2 border-cyber-neon/30">
        <div className="flex items-center gap-3">
          <Cpu className="w-8 h-8 text-cyber-neon animate-pulse-neon" />
          <div>
            <h1 className="text-xl font-bold text-cyber-neon">LifeOS</h1>
            <p className="text-xs text-cyber-neon/50">v2.0.77</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'hover:bg-cyber-gray hover:shadow-neon-sm',
                isActive
                  ? 'bg-cyber-gray border-2 border-cyber-neon text-cyber-neon shadow-neon-sm'
                  : 'text-cyber-neon/70 border-2 border-transparent'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-2 border-cyber-neon/30">
        <div className="text-xs text-cyber-neon/30 text-center">
          <p>SYSTEM STATUS: OPTIMAL</p>
          <p className="mt-1">UPTIME: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
