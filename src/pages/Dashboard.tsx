import React, { useState } from 'react';
import { Background } from '../components/Background';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Prompt } from '../components/Prompt';
import { GenerationTabs } from '../components/GenerationTabs';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { ThumbnailResult } from '../components/ThumbnailResult';
import { useThumbnailGenerator } from '../hooks/useThumbnailGenerator';
import { useAuthState } from '../hooks/useAuthState';
import { useCredits } from '../hooks/useCredits';

export function Dashboard() {
  const { user } = useAuthState();
  const { credits } = useCredits(user?.uid);
  const {
    activeTab,
    input,
    loading,
    result,
    handleTabChange,
    handleInputChange,
    handleGenerate,
    setResult
  } = useThumbnailGenerator();

  const onGenerate = () => {
    if (user?.email) {
      handleGenerate(user.email);
    }
  };

  const handleFaceSwapSuccess = (swappedImageUrl: string) => {
    setResult({
      status: 'success',
      imageUrl: swappedImageUrl
    });
  };

  return (
    <>
      <Background />
      <div className="min-h-screen flex">
        <Sidebar />
        
        <div className="flex-1">
          <Header />
          
          <main className="max-w-4xl mx-auto px-4 py-6">
            <div className="space-y-6">
              <GenerationTabs activeTab={activeTab} onTabChange={handleTabChange} />
              
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6">
                <Prompt 
                  type={activeTab}
                  value={input} 
                  onChange={handleInputChange}
                  onSubmit={onGenerate}
                  onFaceSwapSuccess={handleFaceSwapSuccess}
                  disabled={loading}
                  credits={credits}
                />
              </div>

              {loading && <LoadingOverlay />}
              
              {result && !loading && (
                <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6">
                  <ThumbnailResult result={result} />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}