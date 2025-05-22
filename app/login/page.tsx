'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/auth';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const logoPath = process.env.NODE_ENV === 'production' ? '/donation/assets/logo.jpg' : '/assets/logo.jpg';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await login(form.username, form.password);
      router.push('/staff');
     
    } catch (err) {
      setError('Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8e8e8] to-[#fff] dark:from-[#1a1a1a] dark:to-[#2d2d2d]">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <Link href="/">
          <Image
            src={logoPath}
            alt="KenyanPad Logo"
            width={90}
            height={90}
            className="rounded-full shadow-md"
            priority
          /></Link>
          
          <h1 className="mt-3 text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            KenyanPad
          </h1>
        </div>
        {error && (
          <div className="w-full mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm text-center dark:bg-red-900 dark:border-red-700 dark:text-red-200">
            {error}
          </div>
        )}
        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              name="username"
              type="text"
              autoComplete="username"
              required
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition disabled:opacity-60 flex items-center justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            ) : null}
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} KenyanPad. All rights reserved.
        </div>
      </div>
    </div>
  );
}