import * as Phaser from 'phaser';
import GlobalError from '@shared/GlobalError';
import IError from '@interface/IError';
import { AxiosError } from 'axios';
import { I18nUtils } from './I18nUtils';

export function isValidEmail(email: string): boolean {
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return regex.test(email);
}

export function isValidName(name: string): boolean {
  const regex = /^[a-zA-Z0-9]*$/;
  return regex.test(name);
}

export function getErrorMessage(scene: Phaser.Scene, err: unknown): string {
  if (err instanceof AxiosError) {
    if (err.response) {
      if (err.response.data.validation) {
        return err.response.data.validation.body.message;
      }
      const iError = err as AxiosError<IError>;
      const response = iError.response!.data;
      if (response.value != null) {
        return I18nUtils.getTranslation(scene, response.key, {
          value: formatString(response.value as string, I18nUtils.get()),
        });
      }
      return I18nUtils.getTranslation(scene, response.key);
    }
    return I18nUtils.getTranslation(scene, 'ERROR_REQUEST');
  }
  if (err instanceof GlobalError) {
    return err.message;
  }
  return I18nUtils.getTranslation(scene, 'ERROR');
}

export function formatString(text: string, language: string | null): string {
  const date = new Date(text);
  if (!isNaN(date.getTime())) {
    return formatDate(date, language);
  } else {
    return text;
  }
}

function formatDate(date: Date, language: string | null): string {
  let locale: string;
  switch (language) {
    case 'pt':
      locale = 'pt-BR';
      break;
    case 'en':
      locale = 'en-US';
      break;
    case 'es':
      locale = 'es-ES';
      break;
    default:
      locale = 'en-US';
  }
  return date.toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
