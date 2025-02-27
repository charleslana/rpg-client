export const getTitle = (name: string): string => {
  return `${name} - Solo Leveling RPG`;
};

export const createRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export function decodeBase64(encoded: string): string {
  try {
    return atob(encoded);
  } catch (error) {
    console.error('Erro ao decodificar Base64:', error);
    return '';
  }
}

export function encodeBase64(value: string): string {
  return btoa(value);
}
