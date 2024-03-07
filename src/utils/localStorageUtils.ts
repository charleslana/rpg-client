const speedKey = 'speed';
const languageKey = 'language';
const tokenKey = 'token';

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

export function saveToken(token: string): void {
  localStorage.setItem(tokenKey, token);
}

export function getToken(): string | null {
  return localStorage.getItem(tokenKey);
}

export function removeToken(): void {
  localStorage.removeItem(tokenKey);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
