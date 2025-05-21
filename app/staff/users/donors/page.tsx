'use client';
import { useState, useEffect } from 'react';
import DataTable from "@/components/ui/DataTable";
import apiClient from "@/lib/api-client";
import axios from "axios";
import { Eye, Search, Plus, Download, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

interface Donor {
  id: string;
  username: string;
  name: string;
}

export default function DonorsUsersPage() {
  const router = useRouter();
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDonors = async () => {
    try {
      const response = await apiClient.get('/account/staff/donor');
      setDonors(response.data.results);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push('/login');
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (value: string, row: Donor) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {value.charAt(0)}
            </span>
          </div>
          <div>
            <span className="text-gray-900 dark:text-gray-100 font-medium block">{value}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{row.username}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: () => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
          Active
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (id: string) => (
        <button
          onClick={() => router.push(`/staff/users/institution/${id}`)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg">
        {error}
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Donors</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Manage and view all donor accounts</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
              <Plus className="w-4 h-4" />
              Add Donor
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search donors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              
              <button className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            <DataTable
              columns={columns}
              data={donors}
              isLoading={isLoading}
              onSearch={(query) => console.log('Search:', query)}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 