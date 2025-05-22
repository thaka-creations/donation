'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function AboutPage() {
  const logoPath = process.env.NODE_ENV === 'production' ? '/donation/assets/logo.jpg' : '/assets/logo.jpg';
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-purple-600/90 z-10" />
        <Image
          src={logoPath}
          alt="About Us"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About KenyanPad
            </h1>
            <p className="text-xl text-white/90">
              Empowering communities through menstrual health support and education.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              At KenyanPad, we believe that every person deserves access to proper menstrual health care and education. Our mission is to break down barriers, eliminate stigma, and ensure that no one misses out on opportunities due to lack of menstrual products.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Through partnerships with local institutions and the support of our generous donors, we're creating lasting change in communities across Kenya.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src={logoPath}
              alt="Our Mission"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-purple-50 dark:bg-purple-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '10,000+', label: 'Students Supported' },
              { number: '50+', label: 'Partner Institutions' },
              { number: '100,000+', label: 'Products Distributed' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Join Our Mission
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Your support can help us reach more communities and create lasting change. Every donation makes a difference.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Heart className="w-5 h-5" />
          Support Our Cause
        </button>
      </div>
    </div>
  );
}
