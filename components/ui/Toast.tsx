'use client';

import { useEffect } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`rounded-lg shadow-lg p-4 flex items-center gap-3 ${
          type === 'success'
            ? 'bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-200'
            : 'bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
        )}
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 