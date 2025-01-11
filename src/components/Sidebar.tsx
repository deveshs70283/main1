import React from 'react';
import { Home, Image, UserRound, LogOut } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { auth } from '../lib/firebase';
import { useAuthState } from '../hooks/useAuthState';
import { useCredits } from '../hooks/useCredits';
import { signOutUser } from '../services/authService';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  to?: string;
}

function NavItem({ icon, label, active, onClick, to }: NavItemProps) {
  const content = (
    <>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </>
  );

  const className = `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
    active 
      ? 'bg-purple-500/10 text-purple-400' 
      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
  }`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthState();
  const { credits } = useCredits(user?.uid);

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate('/auth/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="w-72 bg-gradient-to-b from-zinc-900/90 to-zinc-900/50 backdrop-blur-sm border-r border-zinc-800 flex flex-col">
      <Logo />
      
      {user && (
        <div className="px-4 py-3 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <img 
              src={user.photoURL || ''} 
              alt={user.displayName || 'User'} 
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{user.displayName}</span>
                {credits >= 6 && (
                  <span className="text-xs px-1.5 py-0.5 bg-yellow-500/10 text-yellow-500 rounded-full font-medium">
                    PRO
                  </span>
                )}
              </div>
              <span className="text-sm text-zinc-400">{user.email}</span>
            </div>
          </div>
        </div>
      )}
      
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
          <NavItem 
            icon={<Home className="w-5 h-5" />} 
            label="Dashboard" 
            to="/dashboard"
            active={location.pathname === '/dashboard'}
          />
          <NavItem 
            icon={<Image className="w-5 h-5" />} 
            label="My Thumbnails" 
            to="/my-thumbnails"
            active={location.pathname === '/my-thumbnails'}
          />
          <NavItem 
            icon={<UserRound className="w-5 h-5" />} 
            label="My Face Swaps" 
            to="/my-face-swaps"
            active={location.pathname === '/my-face-swaps'}
          />
        </div>
      </nav>
      
      <div className="px-3 mb-4">
        <NavItem 
          icon={<LogOut className="w-5 h-5" />} 
          label="Logout" 
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}