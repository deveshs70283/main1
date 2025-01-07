import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Thumbnail } from '../types/thumbnail';

export function useThumbnails(userId: string | undefined) {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    console.log(userId)
    const thumbnailsQuery = query(
      collection(db, 'thumbnails'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(thumbnailsQuery, 
      (snapshot) => {
        setThumbnails(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Thumbnail))
        );
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching thumbnails:', err.message);
        
        setError('Failed to load thumbnails');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { thumbnails, loading, error };
}