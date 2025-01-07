import React from 'react';
import { Loader2 } from 'lucide-react';

interface GoogleButtonProps {
  onClick: () => void;
  loading?: boolean;
  label?: string;
}

export function GoogleButton({ onClick, loading, label = 'Continue with Google' }: GoogleButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">{label}</span>
        </>
      )}
    </button>
  );
}