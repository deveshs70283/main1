import { IMAGE_CONFIG } from '../config/constants';

export function validatePrompt(prompt: string): void {
  if (!prompt || !prompt.trim()) {
    throw new Error('Prompt is required');
  }

  if (prompt.length > IMAGE_CONFIG.maxPromptLength) {
    throw new Error(`Prompt must be less than ${IMAGE_CONFIG.maxPromptLength} characters`);
  }
}

export function validateUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw new Error('Please enter a valid URL');
  }
}

export function validateSignupData(email: string, password: string, displayName: string) {
  const errors: string[] = [];

  if (!email || !email.includes('@')) {
    errors.push('Please enter a valid email address');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!displayName || displayName.trim().length < 2) {
    errors.push('Please enter your full name');
  }

  return errors;
}

export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  return null;
}