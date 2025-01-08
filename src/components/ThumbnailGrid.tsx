import React, { useState } from 'react';
import { Grid, Filter, Download, Trash2 } from 'lucide-react';
import type { Thumbnail, ThumbnailFilters } from '../types';
import { ThumbnailPreview } from './ThumbnailPreview';
import { deleteThumbnail } from '../services/thumbnailService';

interface ThumbnailGridProps {
  thumbnails: Thumbnail[];
  onUpdate: (id: string, newImageUrl: string) => void;
}

export function ThumbnailGrid({ thumbnails, onUpdate }: ThumbnailGridProps) {
  const [selectedThumbnail, setSelectedThumbnail] = useState<Thumbnail | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<ThumbnailFilters>({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const handleBulkDelete = async () => {
    if (!confirm('Are you sure you want to delete the selected thumbnails?')) return;
    
    try {
      await Promise.all(
        Array.from(selectedItems).map(id => deleteThumbnail(id))
      );
      setSelectedItems(new Set());
    } catch (error) {
      console.error('Error deleting thumbnails:', error);
    }
  };

  const handleBulkDownload = async () => {
    const selectedThumbnails = thumbnails.filter(t => selectedItems.has(t.id));
    
    for (const thumbnail of selectedThumbnails) {
      const response = await fetch(thumbnail.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `thumbnail-${thumbnail.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const filteredThumbnails = thumbnails
    .filter(thumbnail => {
      if (filters.category && thumbnail.category !== filters.category) return false;
      if (filters.startDate && thumbnail.createdAt < filters.startDate.getTime()) return false;
      if (filters.endDate && thumbnail.createdAt > filters.endDate.getTime()) return false;
      return true;
    })
    .sort((a, b) => {
      const order = filters.sortOrder === 'desc' ? -1 : 1;
      if (filters.sortBy === 'date') {
        return (a.createdAt - b.createdAt) * order;
      }
      return a.category.localeCompare(b.category) * order;
    });

  return (
    <div className="space-y-4">
      {/* Filters and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={filters.category || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as any }))}
            className="px-3 py-1.5 bg-zinc-800 text-white rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="original">Original</option>
            <option value="face-swapped">Face Swapped</option>
            <option value="inpainted">Inpainted</option>
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as 'date' | 'category' }))}
            className="px-3 py-1.5 bg-zinc-800 text-white rounded-lg"
          >
            <option value="date">Sort by Date</option>
            <option value="category">Sort by Category</option>
          </select>

          <button
            onClick={() => setFilters(prev => ({ ...prev, sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' }))}
            className="p-1.5 bg-zinc-800 text-white rounded-lg"
          >
            {filters.sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>

        {selectedItems.size > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkDownload}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              <Download className="w-4 h-4" />
              Download ({selectedItems.size})
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedItems.size})
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredThumbnails.map((thumbnail) => (
          <div key={thumbnail.id} className="relative group">
            <input
              type="checkbox"
              checked={selectedItems.has(thumbnail.id)}
              onChange={(e) => {
                const newSelected = new Set(selectedItems);
                if (e.target.checked) {
                  newSelected.add(thumbnail.id);
                } else {
                  newSelected.delete(thumbnail.id);
                }
                setSelectedItems(newSelected);
              }}
              className="absolute top-2 left-2 z-10"
            />
            <button
              onClick={() => setSelectedThumbnail(thumbnail)}
              className="aspect-video w-full rounded-lg overflow-hidden hover:ring-2 hover:ring-emerald-500 transition-all"
            >
              <img
                src={thumbnail.imageUrl}
                alt="Generated thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        ))}
      </div>

      {selectedThumbnail && (
        <ThumbnailPreview
          thumbnail={selectedThumbnail}
          onClose={() => setSelectedThumbnail(null)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}