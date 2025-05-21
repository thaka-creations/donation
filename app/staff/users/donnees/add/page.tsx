'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Upload, Download, AlertCircle } from 'lucide-react';
import apiClient from '@/lib/api-client';
import Toast from '@/components/ui/Toast';

export default function AddDonneesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const institutionId = searchParams.get('institutionId');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const file = formData.get('document') as File;

    if (!file) {
      setError('Please select a CSV file');
      setIsLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('document', file);
      data.append('institution', institutionId || '');

      await apiClient.post('/account/institution/create-donnees', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setToast({
        message: 'Donnees uploaded successfully',
        type: 'success'
      });

      setTimeout(() => {
        router.push('/staff/donnees');
      }, 1500);
    } catch (err) {
      console.error("error", err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload donnees. Please try again.';
      setError(errorMessage);
      setToast({
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSingleDonneeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const data = {
        user: institutionId,
        name: formData.get('name'),
        username: formData.get('username'),
        completion_date: formData.get('completion_date')
      };

      await apiClient.post('/account/institution/create-donnees', data);
      
      setToast({
        message: 'Donnee created successfully',
        type: 'success'
      });

      setTimeout(() => {
        router.push('/staff/donnees');
      }, 1500);
    } catch (err) {
      console.error("error", err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create donnee. Please try again.';
      setError(errorMessage);
      setToast({
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = "user,name,username,completion_date\na6faf45f-46aa-48db-8a38-6574dc5e59e0,John Kaita,34138754,2026-03-01";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_donnees.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Add Donnees
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upload CSV File</h2>
                <button
                  onClick={downloadSampleCSV}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 dark:text-purple-400 dark:bg-purple-900/50 dark:hover:bg-purple-900/75 transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Template
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-lg bg-red-50 dark:bg-red-900/50 p-4 flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                    <p className="ml-3 text-sm text-red-700 dark:text-red-200">{error}</p>
                  </div>
                )}

                <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors">
                  <input
                    id="document"
                    name="document"
                    type="file"
                    accept=".csv"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <div className="space-y-3">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                        Drop your CSV file here, or <span className="text-purple-600 dark:text-purple-400">browse</span>
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        CSV files only, up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Uploading...' : 'Upload CSV'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Add Single Donnee</h2>
              <form onSubmit={handleSingleDonneeSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Admission Number
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label htmlFor="completion_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Completion Date
                  </label>
                  <input
                    type="date"
                    name="completion_date"
                    id="completion_date"
                    required
                    className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Creating...' : 'Create Donnee'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}