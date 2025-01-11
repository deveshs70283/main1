import React from 'react';
import { Image, Youtube, UserRound } from 'lucide-react';
import type { GenerationType } from '../types';

const tabs = [
  { id: 'youtube' as const, label: 'YouTube Link', icon: Youtube },
  { id: 'faceswap' as const, label: 'FaceSwap', icon: UserRound },
  { id: 'thumbnail' as const, label: 'Thumbnail (Coming Soon)', icon: Image, disabled: true },
] as const;

interface GenerationTabsProps {
  activeTab: GenerationType;
  onTabChange: (tab: GenerationType) => void;
}

export function GenerationTabs({ activeTab, onTabChange }: GenerationTabsProps) {
  return (
    <div className="flex items-center gap-2">
      {tabs.map(({ id, label, icon: Icon, disabled }) => (
        <button
          key={id}
          onClick={() => !disabled && onTabChange(id)}
          disabled={disabled}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === id
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              : disabled
              ? 'text-zinc-600 cursor-not-allowed'
              : 'text-zinc-400 hover:text-white hover:bg-purple-500/10'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}