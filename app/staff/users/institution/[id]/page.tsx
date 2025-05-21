'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Building, Mail, Phone, MapPin, Hash, Users, UserPlus, Link, Share2, Edit, Download } from 'lucide-react';
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
    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-50 dark:bg-purple-900/20 mb-6">
        <Users className="w-10 h-10 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
        No Donees Found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
        This institution hasn't added any donees yet. Get started by adding your first donee.
      </p>
      <button
        onClick={() => router.push(`/staff/donnees/add?institutionId=${params.id}`)}
        className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors"
      >
        <UserPlus className="w-5 h-5 mr-2" />
        Add First Donee
      </button>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/40 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-medium text-red-900 dark:text-red-100 mb-2">Error</h3>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-900 border-t-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {institution?.name}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Edit className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Institution Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Building className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Institution Code</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{institution?.profile_info.code}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{institution?.username}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{institution?.profile_info.phone_number}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Physical Address</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{institution?.profile_info.physical_address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Postal Address</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{institution?.profile_info.postal_address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donees Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Institution Donees
              </h2>
              <span className="px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20 rounded-full">
                {donees.length}
              </span>
            </div>
            
            <Link 
              href={`/staff/donnees/add?institutionId=${params.id}`}
              className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add Donees
            </Link>
          </div>

          {donees.length === 0 ? (
            <EmptyDoneesState />
          ) : (
            <DataTable
              columns={[
                {
                  header: 'Name',
                  accessor: 'name',
                  render: (value: string) => (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                          {value.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{value}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Donee</p>
                      </div>
                    </div>
                  ),
                },
                {
                  header: 'Admission Number',
                  accessor: 'username',
                  render: (value: string) => (
                    <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                  ),
                },
                {
                  header: 'Status',
                  accessor: 'status',
                  render: () => (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                      Active
                    </span>
                  ),
                },
              ]}
              data={donees}
              title=""
              isLoading={isLoading}
              searchable={true}
              filterable={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}