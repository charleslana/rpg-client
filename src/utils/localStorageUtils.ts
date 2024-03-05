const speedKey = 'speed';
const languageKey = 'language';

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
