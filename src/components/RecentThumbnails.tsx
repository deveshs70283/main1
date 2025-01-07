import React from 'react';

export function RecentThumbnails() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg text-zinc-400">Your Recent Thumbnails</h2>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-video bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800"
          />
        ))}
      </div>
    </div>
  );
}