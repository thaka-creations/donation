'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import { Plus, MapPin, Phone, Mail, Building, Hash, Eye } from 'lucide-react';
import apiClient from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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

export default function InstitutionUsersPage() {
  const router = useRouter();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchInstitutions = async () => {
    try {
      const response = await apiClient.get('/account/institution');
      setInstitutions(response.data.results);
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

  const fetchInstitutionDetails = async (id: string) => {
    try {
      const response = await apiClient.get(`/account/institution/${id}`);
      setSelectedInstitution(response.data.details);
      setIsModalOpen(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push('/login');
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (value: string, row: Institution) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              {value.charAt(0)}
            </span>
          </div>
          <span className="text-gray-900 dark:text-gray-100">{value}</span>
        </div>
      ),
    },
    {
      header: 'Email',
      accessor: 'username',
    },
    {
      header: 'Code',
      accessor: 'profile_info',
      render: (profile: InstitutionProfile | undefined) => (
        <span className="text-gray-600 dark:text-gray-400">
          {profile?.code || 'N/A'}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: () => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
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
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
      ),
    },
  ];

  const handleAdd = () => {
    router.push('/staff/users/institution/add');
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Search:', query);
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 dark:text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={institutions}
        title="Institutions"
        isLoading={isLoading}
        onAdd={handleAdd}
        addButtonText="Add Institution"
        onSearch={handleSearch}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedInstitution?.name || 'Institution Details'}
      >
        {selectedInstitution && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Institution Name</p>
                    <p className="text-gray-900 dark:text-gray-100">{selectedInstitution.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-gray-100">{selectedInstitution.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Institution Code</p>
                    <p className="text-gray-900 dark:text-gray-100">{selectedInstitution.profile_info.code}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                    <p className="text-gray-900 dark:text-gray-100">{selectedInstitution.profile_info.phone_number}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Physical Address</p>
                    <p className="text-gray-900 dark:text-gray-100">{selectedInstitution.profile_info.physical_address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Postal Address</p>
                    <p className="text-gray-900 dark:text-gray-100">{selectedInstitution.profile_info.postal_address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Implement edit functionality
                  console.log('Edit institution');
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg"
              >
                Edit Institution
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
} 