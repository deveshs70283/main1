import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(() => auth.currentUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      
      if (!firebaseUser) {
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/auth/')) {
          navigate('/auth/signin', { replace: true });
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return { user, loading };
}