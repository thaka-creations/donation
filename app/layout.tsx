import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/ui/Navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'KenyanPad',
  description: 'Empowering communities with access, dignity, and support',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}