'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Building, Mail, Phone, MapPin, Hash, Users, UserPlus } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';
import apiClient from '@/lib/api-client';

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

export default function InstitutionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [donees, setDonees] = useState<Donee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstitutionDetails = async () => {
      try {
        const response = await apiClient.get(`/account/institution/${params.id}`);
        setInstitution(response.data.details);
      } catch (err) {
        setError('Failed to fetch institution details');
      }
    };

    const fetchInstitutionDonees = async () => {
      try {
        const response = await apiClient.get(`/account/institution/list-institution-donnees?user_id=${params.id}`);
        setDonees(response.data.results);
      } catch (err) {
        setError('Failed to fetch institution donees');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitutionDetails();
    fetchInstitutionDonees();
  }, [params.id]);

  const EmptyDoneesState = () => (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 mb-4">
        <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No Donees Found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        This institution doesn't have any donees yet.
      </p>
      <button
        onClick={() => {
          // Implement add donee functionality
          console.log('Add donee');
        }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        <UserPlus className="w-5 h-5" />
        Add Donee
      </button>
    </div>
  );

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 dark:text-red-400">
        Error: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button and header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Institution Details
        </h1>
      </div>

      {/* Institution Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Institution Name</p>
                  <p className="text-gray-900 dark:text-gray-100">{institution?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-gray-900 dark:text-gray-100">{institution?.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Hash className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Institution Code</p>
                  <p className="text-gray-900 dark:text-gray-100">{institution?.profile_info.code}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                  <p className="text-gray-900 dark:text-gray-100">{institution?.profile_info.phone_number}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Physical Address</p>
                  <p className="text-gray-900 dark:text-gray-100">{institution?.profile_info.physical_address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Postal Address</p>
                  <p className="text-gray-900 dark:text-gray-100">{institution?.profile_info.postal_address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Institution Donees */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          Institution Donees
        </h2>
        <div className="mt-4">
          {donees.length === 0 ? (
            <EmptyDoneesState />
          ) : (
            <DataTable
              columns={[
                {
                  header: 'Name',
                  accessor: 'name',
                  render: (value: string, row: Donee) => (
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
                  header: 'Username',
                  accessor: 'username',
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
              ]}
              data={donees}
              title=""
              isLoading={isLoading}
              searchable={false}
              filterable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}