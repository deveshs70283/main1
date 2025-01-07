import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useAuthState } from '../hooks/useAuthState';
import { useThumbnails } from '../hooks/useThumbnails';
import { ThumbnailPreview } from '../components/ThumbnailPreview';
import { updateThumbnailImage } from '../services/thumbnailService';
import type { Thumbnail } from '../types/thumbnail';

export function MyThumbnails() {
  const { user, loading: authLoading } = useAuthState();
  const { thumbnails, loading, error } = useThumbnails(user?.uid);
  const [selectedThumbnail, setSelectedThumbnail] = useState<Thumbnail | null>(null);

  const handleThumbnailUpdate = async (id: string, newImageUrl: string) => {
    if (user?.uid) {
      await updateThumbnailImage(id, newImageUrl);
    }
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-zinc-500">Loading thumbnails...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">My Thumbnails</h1>

        {error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : thumbnails.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            No thumbnails generated yet. Start creating!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {thumbnails.map((thumbnail) => (
              <button
                key={thumbnail.id}
                onClick={() => setSelectedThumbnail(thumbnail)}
                className="aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-emerald-500 transition-all"
              >
                <img
                  src={thumbnail.imageUrl}
                  alt="Generated thumbnail"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedThumbnail && (
        <ThumbnailPreview
          thumbnail={selectedThumbnail}
          onClose={() => setSelectedThumbnail(null)}
          onUpdate={handleThumbnailUpdate}
        />
      )}
    </Layout>
  );
}