'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Users, ShieldCheck, Heart, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const logoPath = '/assets/logo.jpg';
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8e8e8] to-[#fff] dark:from-[#1a1a1a] dark:to-[#2d2d2d] flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Empowering Girls Through <span className="text-purple-600">Dignity</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Join our mission to provide menstrual supplies and education to girls across Kenya. Every donation makes a difference in a young girl's life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/donate"
                className="px-8 py-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
              >
                Make a Donation <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/stories"
                className="px-8 py-4 rounded-lg border-2 border-purple-600 text-purple-700 dark:text-purple-300 font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition flex items-center justify-center gap-2"
              >
                Read Stories <BookOpen className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <Image
              src={logoPath}
              alt="Impact Image"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-purple-50 dark:bg-purple-900/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-gray-600 dark:text-gray-300">Girls Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Partner Schools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100,000+</div>
              <div className="text-gray-600 dark:text-gray-300">Supplies Distributed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Our Commitment to Change
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-8 rounded-xl bg-purple-50 dark:bg-purple-900/20 shadow-lg hover:shadow-xl transition">
              <Users className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Community Driven</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built for and by the community, ensuring every voice is heard and every need is met.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-xl bg-purple-50 dark:bg-purple-900/20 shadow-lg hover:shadow-xl transition">
              <ShieldCheck className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is protected with industry-leading security and privacy standards.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-xl bg-purple-50 dark:bg-purple-900/20 shadow-lg hover:shadow-xl transition">
              <Heart className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Compassionate Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our team is dedicated to providing support and resources with empathy and care.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-xl bg-purple-50 dark:bg-purple-900/20 shadow-lg hover:shadow-xl transition">
              <TrendingUp className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Impactful Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track progress and see the real-world impact of your contributions and efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Our Mission</Link></li>
                <li><Link href="/team" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Team</Link></li>
                <li><Link href="/stories" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">FAQ</Link></li>
                <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Contact Us</Link></li>
                <li><Link href="/donate" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">How to Donate</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} KenyanPad. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}