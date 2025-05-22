'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building, Mail, Phone, MapPin, Users, Eye, UserPlus } from 'lucide-react';

interface InstitutionProfile {
  code: string;
  zip_code: string;
  phone_number: string;
  postal_address: string;
  physical_address: string;
}

interface Institution {
  id: string;
  username: string;
  name: string;
  institution_id: string;
  profile_info: InstitutionProfile;
}

interface Donee {
  id: string;
  username: string;
  name: string;
}

interface InstitutionClientProps {
  institution: Institution;
  initialDonees: Donee[];
}

export default function InstitutionClient({ institution, initialDonees }: InstitutionClientProps) {
  const router = useRouter();
  const [donees] = useState<Donee[]>(initialDonees);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{key: keyof Donee; direction: 'asc' | 'desc'}>({
    key: 'username',
    direction: 'asc'
  });

  const handleSort = (key: keyof Donee) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const filteredAndSortedDonees = donees
    .filter(donee => 
      donee.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donee.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">{institution.name}</h1>
          </div>
          
          <button
            onClick={() => router.push(`/staff/users/donnees/add?institutionId=${institution.id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            Add Donee
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <InfoCard icon={<Building />} label="Institution Code" value={institution.profile_info.code} />
          <InfoCard icon={<Mail />} label="Email" value={institution.username} />
          <InfoCard icon={<Phone />} label="Phone" value={institution.profile_info.phone_number} />
          <InfoCard icon={<MapPin />} label="Physical Address" value={institution.profile_info.physical_address} />
          <InfoCard icon={<MapPin />} label="Postal Address" value={institution.profile_info.postal_address} />
        </div>

        {/* Donees List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold">Donees</h2>
                <span className="px-2.5 py-0.5 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-full">
                  {donees.length}
                </span>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search donees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <TableHeader label="Name" sortKey="name" sortConfig={sortConfig} onSort={handleSort} />
                  <TableHeader label="Admission Number" sortKey="username" sortConfig={sortConfig} onSort={handleSort} />
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAndSortedDonees.map((donee) => (
                  <tr key={donee.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                          <span className="text-lg font-medium text-purple-600">{donee.name[0]}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{donee.name}</div>
                          <div className="text-sm text-gray-500">Donee</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{donee.username}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => router.push(`/staff/users/donnees/${donee.id}`)}
                        className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 inline-flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Keep the InfoCard and TableHeader components in the client file
interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
          {React.isValidElement(icon) ? (
            React.cloneElement(icon as React.ReactElement<any>, {
              className: "w-6 h-6 text-purple-600"
            })
          ) : (
            icon
          )}
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}

interface TableHeaderProps {
  label: string;
  sortKey: keyof Donee;
  sortConfig: { key: keyof Donee; direction: 'asc' | 'desc' };
  onSort: (key: keyof Donee) => void;
}

function TableHeader({ label, sortKey, sortConfig, onSort }: TableHeaderProps) {
  return (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {sortConfig.key === sortKey && (
          <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
        )}
      </div>
    </th>
  );
} 