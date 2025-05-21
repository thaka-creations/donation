'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Share2, ArrowRight } from 'lucide-react';
import apiClient from '@/lib/api-client';

interface Story {
  id: string;
  username: string;
  name: string;
  status: string;
  profile_info: {
    code: string;
    story?: string;
    zip_code: string;
    phone_number: string;
    postal_address: string;
    physical_address: string;
  };
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await apiClient.get('/account/user/user-stories?user_type=INSTITUTION');
        setStories(response.data.results.slice(0, 3));
      } catch (err) {
        setError('Failed to fetch stories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-900 border-t-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-purple-600/90 z-10" />
        <Image
          src="/assets/logo.jpg"
          alt="Impact Stories"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stories of Impact
            </h1>
            <p className="text-xl text-white/90">
              Discover how your donations are changing lives and creating lasting impact in our community.
            </p>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div 
              key={story.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={`/assets/story${index + 1}.jpg`}
                  alt={story.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {story.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {story.profile_info.story || `Located in ${story.profile_info.physical_address}, we are committed to empowering young girls through education and proper menstrual health support.`}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-gray-500">{story.profile_info.code}</span>
                  </div>
                  <button className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-purple-50 dark:bg-purple-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Make Your Impact Today
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of donors and help create more success stories. Your contribution can change lives.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Heart className="w-5 h-5" />
            Donate Now
          </button>
        </div>
      </div>

      {/* Share Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Share These Stories
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Help us spread the word about the impact of donations
        </p>
        <div className="flex justify-center gap-4">
          <button className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
