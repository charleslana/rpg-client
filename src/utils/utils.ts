import GlobalError from '@shared/GlobalError';
import IError from '@interface/IError';
import { AxiosError } from 'axios';

export function isValidEmail(email: string): boolean {
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return regex.test(email);
}

export function isValidName(name: string): boolean {
  const regex = /^[a-zA-Z0-9]*$/;
  return regex.test(name);
}

export function getErrorMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    if (err.response) {
      if (err.response.data.validation) {
        return err.response.data.validation.body.message;
      }
      const iError = err as AxiosError<IError>;
      return iError.response!.data.message;
    }
    return 'Ocorreu um erro na requisição';
  }
  if (err instanceof GlobalError) {
    return err.message;
  }
  return 'Ocorreu um erro, tente novamente';
}
