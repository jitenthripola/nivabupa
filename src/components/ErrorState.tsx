'use client';

import React from 'react';
import { AlertCircle, RefreshCw, X } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export default function ErrorState({
  message = 'Something went wrong while opening the sharing app. Please try again.',
  onRetry,
  onDismiss,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="p-4 rounded-2xl bg-red-50/90 border border-red-200 text-red-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-red-700">Notice</h4>
          <p className="text-xs sm:text-sm text-red-800 font-medium mt-0.5">{message}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-700 hover:bg-red-100 transition-colors cursor-pointer border border-red-200"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss error"
            className="p-1.5 rounded-lg text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
