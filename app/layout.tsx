import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { MusicPlayer } from './components/music-player/player';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alex Chen | Creative Developer',
  description: 'Cinematic personal portfolio showcasing modern web development and design.',
  keywords: ['developer', 'designer', 'portfolio', 'creative'],
  authors: [{ name: 'Alex Chen' }],
  creator: 'Alex Chen',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="noise-overlay" />
          {children}
          <MusicPlayer />
        </Providers>
      </body>
    </html>
  );
}