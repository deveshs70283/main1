import React, { useState } from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { useAuthState } from '../hooks/useAuthState';
import { useCredits } from '../hooks/useCredits';
import { SubscriptionModal } from './SubscriptionModal';

export function Header() {
  const { user } = useAuthState();
  const { credits } = useCredits(user?.uid);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (plan: string) => {
    // TODO: Implement payment integration
    console.log('Selected plan:', plan);
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">VenPix</h1>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 text-white text-sm">
              <CreditCard className="w-4 h-4" />
              <span>{credits} Credits</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500 text-white text-sm hover:bg-purple-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Upgrade</span>
            </button>
          </div>
        </div>
      </header>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectPlan={handleSelectPlan}
      />
    </>
  );
}