import * as Phaser from 'phaser';
import { AssetKeysEnum } from '@enum/AssetKeysEnum';
import { getLanguage, saveLanguage } from './localStorageUtils';

export class I18nUtils {
  private static currentLanguage: string = AssetKeysEnum.En;

  public static setLanguage(language: string): void {
    const validLanguages: string[] = [AssetKeysEnum.Pt, AssetKeysEnum.En, AssetKeysEnum.Es];
    if (validLanguages.includes(language)) {
      this.currentLanguage = language;
    } else {
      this.currentLanguage = AssetKeysEnum.En;
    }
    saveLanguage(this.currentLanguage);
  }

  public static get(): string | null {
    return getLanguage();
  }

  public static getTranslation(
    scene: Phaser.Scene,
    key: string,
    placeholders?: { [key: string]: string }
  ): string {
    const translations = scene.cache.json.get(this.currentLanguage);
    let translation = translations[key] || `Translation missing for key: ${key}`;
    if (placeholders) {
      for (const placeholderKey in placeholders) {
        if (Object.hasOwnProperty.call(placeholders, placeholderKey)) {
          const placeholderValue = placeholders[placeholderKey];
          translation = translation.replace(
            new RegExp(`{{${placeholderKey}}}`, 'g'),
            placeholderValue
          );
        }
      }
    }
    return translation;
  }
}
