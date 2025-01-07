import React from 'react';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900/20 to-zinc-950/20" />
        <div className="absolute inset-0 bg-grid-white bg-[length:20px_20px] opacity-[0.02]" />
        <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-emerald-500/5 to-transparent" />
      </div>
    </div>
  );
}