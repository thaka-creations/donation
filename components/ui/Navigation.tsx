'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  // Only show navigation on stories pages
  if (pathname.startsWith('/staff')) {
    return null;
  }

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.jpg"
            alt="KenyanPad Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-bold text-xl text-gray-900 dark:text-white">KenyanPad</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link 
            href="/stories" 
            className={`text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition ${
              pathname === '/stories' ? 'text-purple-600 dark:text-purple-400' : ''
            }`}
          >
            Success Stories
          </Link>
          <Link 
            href="/about" 
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
          >
            About Us
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
          >
            Staff Login
          </Link>
        </div>
      </div>
    </nav>
  );
}