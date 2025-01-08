export type GenerationType = 'thumbnail' | 'youtube' | 'faceswap';
export type ThumbnailCategory = 'original' | 'face-swapped' | 'inpainted' | 'mask';

export interface ThumbnailFilters {
  category?: ThumbnailCategory;
  startDate?: Date;
  endDate?: Date;
  sortBy: 'date' | 'category';
  sortOrder: 'asc' | 'desc';
}

// ... rest of the existing types ...