import React from 'react';

interface AuthErrorProps {
  message: string;
}

export function AuthError({ message }: AuthErrorProps) {
  return (
    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
      {message}
    </div>
  );
}