'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Shield, BarChart3, Calendar, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'DASHBOARD', href: '/', icon: LayoutDashboard },
  { name: 'CONVERTER', href: '/anti-scroll', icon: Shield },
  { name: 'ANALYTICS', href: '/analytics', icon: BarChart3 },
  { name: 'PLANNER', href: '/planner', icon: Calendar },
  { name: 'GOALS', href: '/goals', icon: Target },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-cyber-gray/50 bg-cyber-black/60 backdrop-blur-glass sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              className="w-2 h-2 rounded-full bg-cyber-neon shadow-neon"
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 5px rgba(0, 255, 65, 0.8)',
                  '0 0 15px rgba(0, 255, 65, 1)',
                  '0 0 5px rgba(0, 255, 65, 0.8)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <span className="text-lg font-bold tracking-wider">
              <span className="text-white group-hover:text-neon-glow transition-all">LIFE</span>
              <span className="text-cyber-neon text-neon-glow">OS</span>
            </span>
          </Link>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all relative overflow-hidden
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-cyber-neon to-cyber-neon-cyan text-cyber-black shadow-neon'
                          : 'text-cyber-text-muted hover:text-cyber-neon hover:bg-cyber-gray/50 backdrop-blur-sm'
                      }
                    `}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'drop-shadow-lg' : ''}`} />
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Version Info */}
          <div className="text-xs text-cyber-text-dim font-computation">
            V.2.0.77 // <span className="text-cyber-neon text-neon-glow animate-pulse-slow">ONLINE</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
