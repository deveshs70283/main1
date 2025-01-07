import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { Dashboard } from './pages/Dashboard';
import { MyThumbnails } from './pages/MyThumbnails';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthRedirectHandler } from './components/auth/AuthRedirectHandler';

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

export function App() {
  return (
    <Router>
      <AuthRedirectHandler />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-thumbnails" 
          element={
            <ProtectedRoute>
              <MyThumbnails />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}