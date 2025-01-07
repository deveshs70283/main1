import React from 'react';
import { Background } from './Background';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Background />
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          {children}
        </main>
      </div>
    </>
  );
}