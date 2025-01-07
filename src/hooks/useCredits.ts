import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useCredits(userId: string | undefined) {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    if (!userId) return;

    // Set up real-time listener for credits
    const unsubscribe = onSnapshot(doc(db, 'users', userId), (doc) => {
      if (doc.exists()) {
        setCredits(doc.data()?.credits ?? 0);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return { credits };
}