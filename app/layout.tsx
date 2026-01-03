import type { Metadata } from 'next';
import './globals.css';
import TopNav from '@/components/layout/TopNav';

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
      <body className="bg-cyber-black text-cyber-text-muted antialiased">
        <div className="min-h-screen bg-cyber-black bg-grid-pattern bg-grid">
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
