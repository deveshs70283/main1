import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Image } from 'lucide-react';
import { signInWithGoogle, signInWithEmail } from '../../services/authService';
import { AuthError } from '../../components/auth/AuthError';
import { useAuthState } from '../../hooks/useAuthState';

export function SignIn() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuthState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user && !authLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading || user) return null;

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmail(email, password);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    setError('');
    
    try {
      await signInWithGoogle();
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Google sign in error:', error);
      setError('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Section - Image */}
      <div className="hidden lg:block flex-1 bg-[#111827] p-12">
        <div className="h-full flex flex-col items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg">
              <Image className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">VenPix</span>
          </div>

          <div className="w-full max-w-lg">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/beenu-3aaaf.firebasestorage.app/o/thumbnails%2Fwrwerishikasfshewrwerwarma00092%40gmail.com%2F1736352075288.jpg?alt=media&token=12d41fc4-8709-40bb-adca-bd71d5754382"
              alt="Preview"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Future of thumbnail generation</h2>
            <p className="text-gray-400 max-w-lg">
              Create stunning, eye-catching thumbnails in seconds with our AI-powered platform.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-[480px] p-8 flex flex-col justify-between bg-white">
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {error && <AuthError message={error} />}

          <div className="space-y-6">
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}