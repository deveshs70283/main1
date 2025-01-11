import Cookies from 'js-cookie';

const AUTH_COOKIE_NAME = 'auth_token';
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: window.location.protocol === 'https:',
  sameSite: 'lax',
  path: '/'
} as const;

export function setAuthCookie(token: string) {
  Cookies.set(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);
}

export function getAuthCookie(): string | undefined {
  return Cookies.get(AUTH_COOKIE_NAME);
}

export function removeAuthCookie() {
  Cookies.remove(AUTH_COOKIE_NAME, { path: '/' });
}