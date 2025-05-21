'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, UserCog, Building2, HeartHandshake } from 'lucide-react';

const userCategories = [
  {
    name: 'Staff',
    path: '/staff/users/staff',
    icon: UserCog,
    description: 'Manage staff members and their permissions'
  },
  {
    name: 'Institution',
    path: '/staff/users/institution',
    icon: Building2,
    description: 'Manage institution accounts and settings'
  },
  {
    name: 'Donnees',
    path: '/staff/users/donnees',
    icon: Users,
    description: 'Manage donnee accounts and preferences'
  },
  {
    name: 'Donors',
    path: '/staff/users/donors',
    icon: HeartHandshake,
    description: 'Manage donor accounts and contributions'
  }
];

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage different types of users in the system</p>
        </div>
        <div className="w-full sm:w-64">
          <input
            type="search"
            placeholder="Search users..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {userCategories.map((category) => {
          const Icon = category.icon;
          const isActive = pathname === category.path;
          
          return (
            <Link
              key={category.name}
              href={category.path}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                isActive
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isActive
                    ? 'bg-purple-100 dark:bg-purple-800'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    isActive
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-medium ${
                    isActive
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8">
        {children}
      </div>
    </div>
  );
} 