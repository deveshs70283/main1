// API Configuration
export const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/4ss93qm29611l5w1iksyq1up5equ2fwf';

// Image Configuration
export const IMAGE_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxPromptLength: 1000,
} as const;