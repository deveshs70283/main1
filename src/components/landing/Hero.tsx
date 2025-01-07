import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background with grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-900 to-rose-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAwIE0gMCAwIEwgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Creativity, Unleashed.
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0">
              Leverage generative AI with a unique suite of tools to convey your ideas to the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/auth/signup"
                className="px-8 py-3 bg-white text-purple-900 rounded-lg font-medium hover:bg-white/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/docs"
                className="px-8 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors inline-flex items-center gap-2"
              >
                Developer API
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right column - Feature images */}
          <div className="relative">
            <div className="absolute top-1/2 -translate-y-1/2 -left-24 w-48 h-48 bg-purple-500/30 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 -right-12 w-72 h-72 bg-rose-500/30 rounded-full filter blur-3xl"></div>
            
            {/* Sample images */}
            <div className="relative grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000"
                alt="Creative sample"
                className="w-full h-48 object-cover rounded-lg transform rotate-3 shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1000"
                alt="AI generated art"
                className="w-full h-48 object-cover rounded-lg transform -rotate-3 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}