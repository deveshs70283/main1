import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
              <Image className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">VenPix</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#solutions">Solutions</NavLink>
            <NavLink href="#resources">Resources</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/auth/signin" 
              className="text-white/80 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth/signup"
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-white/80 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}