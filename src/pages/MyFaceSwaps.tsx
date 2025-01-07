import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useAuthState } from '../hooks/useAuthState';
import { useFaceSwaps } from '../hooks/useFaceSwaps';
import { ThumbnailPreview } from '../components/ThumbnailPreview';
import type { FaceSwap } from '../types/faceswap';

export function MyFaceSwaps() {
  const { user, loading: authLoading } = useAuthState();
  const { faceSwaps, loading, error } = useFaceSwaps(user?.uid);
  const [selectedSwap, setSelectedSwap] = useState<FaceSwap | null>(null);

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-zinc-500">Loading face swaps...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">My Face Swaps</h1>

        {error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : faceSwaps.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            No face swaps created yet. Try the face swap feature in the dashboard!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {faceSwaps.map((swap) => (
              <button
                key={swap.id}
                onClick={() => setSelectedSwap(swap)}
                className="aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-emerald-500 transition-all"
              >
                <img
                  src={swap.resultUrl}
                  alt="Face swap result"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedSwap && (
        <ThumbnailPreview
          thumbnail={{
            id: selectedSwap.id,
            imageUrl: selectedSwap.resultUrl,
            swappedImageUrl: null,
            hasSwappedVersion: false,
            prompt: '',
            createdAt: selectedSwap.createdAt,
            userId: selectedSwap.userId
          }}
          onClose={() => setSelectedSwap(null)}
        />
      )}
    </Layout>
  );
}