import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { getAuthErrorMessage } from '../utils/auth-errors';

export function useAuth() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleAuthError = (err: unknown) => {
    if (err instanceof FirebaseError) {
      setError(getAuthErrorMessage(err.code));
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unexpected error occurred');
    }
  };

  const clearError = () => setError('');

  return {
    error,
    loading,
    setLoading,
    handleAuthError,
    clearError,
  };
}