'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Shield, BarChart3, Calendar } from 'lucide-react';

const navigation = [
  { name: 'DASHBOARD', href: '/', icon: LayoutDashboard },
  { name: 'CONVERTER', href: '/anti-scroll', icon: Shield },
  { name: 'ANALYTICS', href: '/analytics', icon: BarChart3 },
  { name: 'PLANNER', href: '/planner', icon: Calendar },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-cyber-gray bg-cyber-black/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-neon animate-pulse" />
            <span className="text-lg font-bold tracking-wider">
              <span className="text-white">LIFE</span>
              <span className="text-cyber-neon">OS</span>
            </span>
          </Link>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all
                    ${
                      isActive
                        ? 'bg-cyber-neon text-cyber-black'
                        : 'text-cyber-text-muted hover:text-cyber-neon hover:bg-cyber-gray'
                    }
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Version Info */}
          <div className="text-xs text-cyber-text-dim font-mono">
            V.2.0.77 // <span className="text-cyber-neon">ONLINE</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
