'use client';

import { useState } from 'react';
import apiClient from '@/lib/api-client';
import Toast from '@/components/ui/Toast';

export default function BulkDonneeUpload({ institutionId, onSuccess }: { institutionId: string; onSuccess: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setIsLoading(true);
    setToast(null);

    const formData = new FormData();
    formData.append('institution', institutionId);
    formData.append('document', file);

    try {
      await apiClient.post('/account/institution/create-donnees', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setToast({ message: 'CSV uploaded successfully', type: 'success' });
      setTimeout(() => {
        onSuccess();
      }, 1200);
    } catch {
      setToast({ message: 'Failed to upload CSV', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-2">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <label className="block text-sm font-medium">Bulk Add Donees (CSV)</label>
      <input type="file" accept=".csv" onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
      <button type="submit" disabled={isLoading || !file}
        className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50">
        {isLoading ? 'Uploading...' : 'Upload CSV'}
      </button>
    </form>
  );
} 