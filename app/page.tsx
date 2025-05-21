'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Users, ShieldCheck, Heart, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8e8e8] to-[#fff] dark:from-[#1a1a1a] dark:to-[#2d2d2d] flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-4 py-16 text-center">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/assets/logo.jpg"
            alt="KenyanPad Logo"
            width={100}
            height={100}
            className="rounded-full shadow-lg mb-4"
            priority
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            KenyanPad
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
            Empowering communities with access, dignity, and support. <br />
            Join us in making a difference, one pad at a time.
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow transition"
            >
              Staff Login
            </Link>
            <a
              href="#features"
              className="px-6 py-3 rounded-lg border border-purple-600 text-purple-700 dark:text-purple-300 font-semibold bg-white dark:bg-gray-900 hover:bg-purple-50 dark:hover:bg-purple-800 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Why KenyanPad?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 shadow-sm">
              <Users className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Community Driven</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built for and by the community, ensuring every voice is heard and every need is met.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 shadow-sm">
              <ShieldCheck className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is protected with industry-leading security and privacy standards.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 shadow-sm">
              <Heart className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Compassionate Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our team is dedicated to providing support and resources with empathy and care.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 shadow-sm">
              <TrendingUp className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Impactful Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track progress and see the real-world impact of your contributions and efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} KenyanPad. All rights reserved.
      </footer>
    </main>
  );
}