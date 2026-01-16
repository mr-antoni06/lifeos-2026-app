import type { Metadata } from 'next';
import './globals.css';
import TopNav from '@/components/layout/TopNav';
import AuroraBackground from '@/components/ui/AuroraBackground';

export const metadata: Metadata = {
  title: 'LifeOS',
  description: 'Gamified habit tracker for high performers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cyber-void text-cyber-text-muted antialiased">
        {/* Ambient Aurora Background */}
        <AuroraBackground />
        
        <div className="min-h-screen relative" style={{ zIndex: 10 }}>
          {/* Top Navigation */}
          <TopNav />
          
          {/* Page Content */}
          <main className="container mx-auto px-6 py-6 max-w-[1400px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
