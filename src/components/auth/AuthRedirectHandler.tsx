import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthRedirect } from '../../services/authService';

export function AuthRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    handleAuthRedirect()
      .then((success) => {
        if (success) {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        console.error('Auth redirect error:', error);
      });
  }, [navigate]);

  return null;
}