import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { FaceSwap } from '../types/faceswap';

export function useFaceSwaps(userId: string | undefined) {
  const [faceSwaps, setFaceSwaps] = useState<FaceSwap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError('User ID is undefined');
      setLoading(false);
      return;
    }

    try {
      const faceSwapsQuery = query(
        collection(db, 'faceswaps'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      console.log('Executing query for userId:', userId);

      const unsubscribe = onSnapshot(
        faceSwapsQuery,
        (snapshot) => {
          setFaceSwaps(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            } as FaceSwap))
          );
          setLoading(false);
        },
        (err) => {
          console.error('Error fetching face swaps:', err.message);
          setError(`Failed to load face swaps: ${err.message}`);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.error('Unexpected error in useFaceSwaps:', e);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  }, [userId]);

  return { faceSwaps, loading, error };
}
