import * as Phaser from 'phaser';
import api from '@config/api';
import GlobalError from '@shared/GlobalError';
import IResponse from '@interface/IResponse';
import { getRefreshToken } from '@utils/localStorageUtils';
import { I18nUtils } from '@utils/I18nUtils';
import { ICreateUser, ILogin, IToken, UserMe } from '@interface/IUser';
import { isValidEmail, isValidName } from '@utils/utils';

export default class UserService {
  private static baseUrl = '/v1/user';

  static async register(scene: Phaser.Scene, createUser: ICreateUser): Promise<IResponse> {
    if (!isValidEmail(createUser.email)) {
      throw new GlobalError(I18nUtils.getTranslation(scene, 'INVALID_EMAIL'));
    }
    if (!createUser.password || createUser.password.length < 6) {
      throw new GlobalError(I18nUtils.getTranslation(scene, 'INVALID_PASSWORD'));
    }
    if (!createUser.name || !isValidName(createUser.name)) {
      throw new GlobalError(I18nUtils.getTranslation(scene, 'INVALID_NAME'));
    }
    const response = await api.post<IResponse>(this.baseUrl, createUser);
    return response.data;
  }

  static async login(scene: Phaser.Scene, login: ILogin): Promise<IToken> {
    if (!login.email || !login.password) {
      throw new GlobalError(I18nUtils.getTranslation(scene, 'EMPTY_LOGIN'));
    }
    const response = await api.post<IToken>(`${this.baseUrl}/auth`, login);
    return response.data;
  }

  static async me(): Promise<UserMe> {
    const response = await api.get<UserMe>(`${this.baseUrl}/me`);
    return response.data;
  }

  static async refreshAccessToken(): Promise<IToken> {
    const response = await api.post<IToken>(`${this.baseUrl}/refresh-token`, {
      refreshToken: getRefreshToken(),
    });
    return response.data;
  }
}
