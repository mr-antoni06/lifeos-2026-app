import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Cyberpunk LifeOS',
  description: 'Gamified habit tracker for high performers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cyber-black text-cyber-neon antialiased">
        <div className="flex h-screen overflow-hidden scanlines">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header />
            
            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-6 bg-cyber-darker">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
