import React from 'react';
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
    <div className="relative min-h-screen bg-[#0A041C]">
      {/* Background effects */}
      <div className="fixed inset-0">
        {/* Primary grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Secondary smaller grid for depth */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A041C] via-transparent to-[#0A041C] opacity-80" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#0A041C] opacity-90" />

        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[100px]" />

        {/* Stars/sparkles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-300 rounded-full animate-pulse" />
        <div className="absolute top-40 right-40 w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-60 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-700" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex">
        <Sidebar />
        
        <div className="flex-1">
          <Header />
          
          <main className="max-w-4xl mx-auto px-4 py-6">
            <div className="space-y-6">
              <GenerationTabs activeTab={activeTab} onTabChange={handleTabChange} />
              
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
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
                <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
                  <ThumbnailResult result={result} />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}