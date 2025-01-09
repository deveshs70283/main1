import { useState } from 'react';
import { useAuthState } from './useAuthState';
import type { GenerationType, ThumbnailResponse } from '../types';
import { generateThumbnail } from '../services/thumbnailService';
import { deductCredits } from '../services/creditService';

export function useThumbnailGenerator() {
  const { user } = useAuthState();
  const [activeTab, setActiveTab] = useState<GenerationType>('youtube');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ThumbnailResponse | null>(null);

  const handleTabChange = (tab: GenerationType) => {
    setActiveTab(tab);
    setInput('');
    setResult(null);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleGenerate = async (userEmail: string) => {
    if (!input || activeTab === 'faceswap' || !user) return;
    
    setLoading(true);
    try {
      const deductionSuccessful = await deductCredits(user.uid);
      if (!deductionSuccessful) {
        throw new Error('Insufficient credits');
      }

      const data = await generateThumbnail(activeTab, input, user.uid, userEmail);
      setResult(data);
    } catch (error) {
      setResult({
        status: 'error',
        imageUrl: '',
        message: error instanceof Error ? error.message : 'Failed to generate thumbnail',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    activeTab,
    input,
    loading,
    result,
    setResult,
    handleTabChange,
    handleInputChange,
    handleGenerate,
  };
}