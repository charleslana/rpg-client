const speedKey = 'speed';
const languageKey = 'language';
const accessTokenKey = 'accessToken';
const refreshTokenKey = 'refreshToken';

export function saveSpeed(speed: string): void {
  localStorage.setItem(speedKey, speed);
}

export function getSpeed(): string | null {
  return localStorage.getItem(speedKey);
}

export function removeSpeed(): void {
  localStorage.removeItem(speedKey);
}

export function saveLanguage(language: string): void {
  localStorage.setItem(languageKey, language);
}

export function getLanguage(): string | null {
  return localStorage.getItem(languageKey);
}

export function removeLanguage(): void {
  localStorage.removeItem(languageKey);
}

export function saveAccessToken(token: string): void {
  localStorage.setItem(accessTokenKey, token);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(accessTokenKey);
}

export function removeAccessToken(): void {
  localStorage.removeItem(accessTokenKey);
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function saveRefreshToken(token: string): void {
  localStorage.setItem(refreshTokenKey, token);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(refreshTokenKey);
}

export function removeRefreshToken(): void {
  localStorage.removeItem(refreshTokenKey);
}
