import React from 'react';
import { Image, Youtube, UserRound } from 'lucide-react';
import type { GenerationType } from '../types';

const tabs = [
  { id: 'thumbnail' as const, label: 'Thumbnail', icon: Image },
  { id: 'youtube' as const, label: 'YouTube', icon: Youtube },
  { id: 'faceswap' as const, label: 'FaceSwap', icon: UserRound },
] as const;

interface GenerationTabsProps {
  activeTab: GenerationType;
  onTabChange: (tab: GenerationType) => void;
}

export function GenerationTabs({ activeTab, onTabChange }: GenerationTabsProps) {
  return (
    <div className="flex items-center gap-2">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === id
              ? 'bg-emerald-500 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}