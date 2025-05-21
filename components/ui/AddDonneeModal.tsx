'use client';

import { useState } from 'react';
import apiClient from '@/lib/api-client';
import Toast from '@/components/ui/Toast';

interface AddDonneeModalProps {
  institutionId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddDonneeModal({ institutionId, onClose, onSuccess }: AddDonneeModalProps) {
  const [form, setForm] = useState({ name: '', username: '', completion_date: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setToast(null);

    try {
      await apiClient.post('/account/institution/create-donnees', {
        user: institutionId,
        ...form,
      });
      setToast({ message: 'Donnee added successfully', type: 'success' });
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1200);
    } catch {
      setToast({ message: 'Failed to add donnee', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">✕</button>
        <h2 className="text-lg font-bold mb-4">Add Donnee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input name="name" required value={form.name} onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input name="username" required value={form.username} onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium">Completion Date</label>
            <input name="completion_date" type="date" required value={form.completion_date} onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700" />
          </div>
          <button type="submit" disabled={isLoading}
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50">
            {isLoading ? 'Adding...' : 'Add Donnee'}
          </button>
        </form>
      </div>
    </div>
  );
} 