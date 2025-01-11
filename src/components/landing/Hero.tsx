import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen bg-[#0A041C] overflow-hidden">
      {/* Grid background with enhanced effects */}
      <div className="absolute inset-0">
        {/* Primary grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Secondary smaller grid for depth */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A041C] via-transparent to-[#0A041C] opacity-80" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#0A041C] opacity-90" />
      </div>

      {/* Enhanced glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[100px]" />

      {/* Stars/sparkles effect */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-purple-300 rounded-full animate-pulse" />
      <div className="absolute top-40 right-40 w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-60 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-700" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Purple badge */}
        <div className="flex justify-center mb-8">
          <div className="px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
            <span className="text-purple-300 text-sm">Your AI Thumbnail Assistant</span>
          </div>
        </div>

        {/* Main content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Quick Thumbnail Viral Results
          </h1>
          <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
            Effortlessly create stunning thumbnails that grab attention and drive engagement with our intelligent AI assistant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/auth/signup"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Enhanced image showcase with bigger glow */}
          <div className="relative max-w-5xl mx-auto">
            {/* Large top glow */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[140%] h-[500px] bg-gradient-to-b from-purple-600/30 via-pink-500/20 to-transparent blur-[100px]" />
            
            {/* Image container with border glow */}
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30" />
              <div className="relative">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/beenu-3aaaf.firebasestorage.app/o/thumbnails%2Fwrwerishikasfshewrwerwarma00092%40gmail.com%2F1736352075288.jpg?alt=media&token=12d41fc4-8709-40bb-adca-bd71d5754382"
                  alt="Thumbnail example"
                  className="w-full rounded-xl shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}